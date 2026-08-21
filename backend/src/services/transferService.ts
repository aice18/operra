import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export class TransferService {
  static async createTransfer(data: {
    sourceLocationId: string;
    destinationLocationId: string;
    itemId: string;
    quantity: number;
  }) {
    if (data.quantity <= 0) {
      throw new AppError('Transfer quantity must be greater than 0', 400);
    }

    if (data.sourceLocationId === data.destinationLocationId) {
      throw new AppError('Source and destination locations must be different', 400);
    }

    // Check available stock at source location
    const sourceInventories = await prisma.inventory.findMany({
      where: { locationId: data.sourceLocationId, itemId: data.itemId },
    });

    const totalAvailable = sourceInventories.reduce(
      (sum, inv) => sum + Math.max(0, inv.physicalQuantity - inv.reservedQuantity),
      0
    );

    if (totalAvailable < data.quantity) {
      throw new AppError(
        `Cannot transfer more than available inventory (Available: ${totalAvailable}, Requested: ${data.quantity})`,
        400
      );
    }

    return await prisma.internalTransfer.create({
      data: {
        sourceLocationId: data.sourceLocationId,
        destinationLocationId: data.destinationLocationId,
        itemId: data.itemId,
        quantity: data.quantity,
        status: 'REQUESTED',
      },
      include: {
        sourceLocation: true,
        destinationLocation: true,
        item: true,
      },
    });
  }

  static async dispatchTransfer(transferId: string) {
    return await prisma.$transaction(async (tx) => {
      const transfer = await tx.internalTransfer.findUnique({
        where: { id: transferId },
      });

      if (!transfer) throw new AppError('Transfer request not found', 404);
      if (transfer.status !== 'REQUESTED') {
        throw new AppError(`Transfer cannot be dispatched when in state '${transfer.status}'`, 400);
      }

      // Lock & check source inventory
      const sourceInventories = await tx.inventory.findMany({
        where: { locationId: transfer.sourceLocationId, itemId: transfer.itemId },
        orderBy: { physicalQuantity: 'desc' },
      });

      const totalAvailable = sourceInventories.reduce(
        (sum, inv) => sum + Math.max(0, inv.physicalQuantity - inv.reservedQuantity),
        0
      );

      if (totalAvailable < transfer.quantity) {
        throw new AppError(
          `Insufficient stock to dispatch transfer (Available: ${totalAvailable}, Required: ${transfer.quantity})`,
          400
        );
      }

      // Deduct physical quantity from source inventory batch(es)
      let remainingToDeduct = transfer.quantity;
      for (const inv of sourceInventories) {
        if (remainingToDeduct <= 0) break;
        const availableInBatch = Math.max(0, inv.physicalQuantity - inv.reservedQuantity);
        if (availableInBatch > 0) {
          const deductAmount = Math.min(availableInBatch, remainingToDeduct);
          await tx.inventory.update({
            where: { id: inv.id },
            data: { physicalQuantity: inv.physicalQuantity - deductAmount },
          });
          remainingToDeduct -= deductAmount;
        }
      }

      // Mark transfer status as DISPATCHED (Destination stock is NOT increased here!)
      const updated = await tx.internalTransfer.update({
        where: { id: transferId },
        data: { status: 'DISPATCHED' },
        include: { sourceLocation: true, destinationLocation: true, item: true },
      });

      return updated;
    });
  }

  static async receiveTransfer(transferId: string) {
    return await prisma.$transaction(async (tx) => {
      const transfer = await tx.internalTransfer.findUnique({
        where: { id: transferId },
      });

      if (!transfer) throw new AppError('Transfer request not found', 404);

      if (transfer.status === 'RECEIVED') {
        throw new AppError('Same transfer cannot be received twice', 400);
      }

      if (transfer.status !== 'DISPATCHED') {
        throw new AppError(`Transfer must be in DISPATCHED status to receive (current: ${transfer.status})`, 400);
      }

      // Increase stock at destination location
      // Find or create default batch at destination location
      const destInventory = await tx.inventory.findFirst({
        where: { locationId: transfer.destinationLocationId, itemId: transfer.itemId },
      });

      if (destInventory) {
        await tx.inventory.update({
          where: { id: destInventory.id },
          data: { physicalQuantity: destInventory.physicalQuantity + transfer.quantity },
        });
      } else {
        await tx.inventory.create({
          data: {
            locationId: transfer.destinationLocationId,
            itemId: transfer.itemId,
            batchNumber: `TRANS-RCV-${Date.now().toString().slice(-6)}`,
            physicalQuantity: transfer.quantity,
            reservedQuantity: 0,
          },
        });
      }

      const updated = await tx.internalTransfer.update({
        where: { id: transferId },
        data: { status: 'RECEIVED' },
        include: { sourceLocation: true, destinationLocation: true, item: true },
      });

      return updated;
    });
  }

  static async getAllTransfers() {
    return await prisma.internalTransfer.findMany({
      include: {
        sourceLocation: true,
        destinationLocation: true,
        item: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
