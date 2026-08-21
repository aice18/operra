import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export class CustomerOrderService {
  static async createOrderAndReserveStock(
    createdById: string,
    items: Array<{ itemId: string; locationId: string; quantity: number }>
  ) {
    if (!items || items.length === 0) {
      throw new AppError('Order must contain at least one item', 400);
    }

    for (const item of items) {
      if (item.quantity <= 0) {
        throw new AppError('Item quantity must be greater than zero', 400);
      }
    }

    // Execute within Database Transaction for Concurrency Safety (Test 1 & Race condition prevention)
    return await prisma.$transaction(async (tx) => {
      // 1. Verify available inventory for all requested items
      for (const item of items) {
        const inventories = await tx.inventory.findMany({
          where: { locationId: item.locationId, itemId: item.itemId },
        });

        const totalAvailable = inventories.reduce(
          (sum, inv) => sum + Math.max(0, inv.physicalQuantity - inv.reservedQuantity),
          0
        );

        if (totalAvailable < item.quantity) {
          throw new AppError(
            `Cannot reserve more than available inventory for item (Available: ${totalAvailable}, Requested: ${item.quantity})`,
            400
          );
        }
      }

      // 2. Reserve stock on inventory batches
      for (const item of items) {
        const inventories = await tx.inventory.findMany({
          where: { locationId: item.locationId, itemId: item.itemId },
          orderBy: { physicalQuantity: 'desc' },
        });

        let remainingToReserve = item.quantity;
        for (const inv of inventories) {
          if (remainingToReserve <= 0) break;
          const availableInBatch = Math.max(0, inv.physicalQuantity - inv.reservedQuantity);
          if (availableInBatch > 0) {
            const reserveAmount = Math.min(availableInBatch, remainingToReserve);
            await tx.inventory.update({
              where: { id: inv.id },
              data: { reservedQuantity: inv.reservedQuantity + reserveAmount },
            });
            remainingToReserve -= reserveAmount;
          }
        }
      }

      // 3. Create Customer Order record
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const order = await tx.customerOrder.create({
        data: {
          orderNumber,
          createdById,
          status: 'RESERVED',
          orderItems: {
            create: items.map((i) => ({
              itemId: i.itemId,
              locationId: i.locationId,
              quantity: i.quantity,
            })),
          },
        },
        include: {
          createdBy: { select: { id: true, name: true, email: true } },
          orderItems: {
            include: {
              item: true,
            },
          },
        },
      });

      return order;
    });
  }

  static async getAllOrders() {
    return await prisma.customerOrder.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        orderItems: {
          include: {
            item: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
