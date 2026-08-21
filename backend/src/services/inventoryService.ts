import { prisma } from '../config/prisma';
import { AppError } from '../middleware/errorHandler';

export class InventoryService {
  static async getAllInventories() {
    const inventories = await prisma.inventory.findMany({
      include: {
        location: true,
        item: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return inventories.map((inv) => ({
      ...inv,
      availableQuantity: Math.max(0, inv.physicalQuantity - inv.reservedQuantity),
    }));
  }

  static async getInventoriesByLocation(locationId: string) {
    const inventories = await prisma.inventory.findMany({
      where: { locationId },
      include: {
        location: true,
        item: {
          include: { category: true },
        },
      },
    });

    return inventories.map((inv) => ({
      ...inv,
      availableQuantity: Math.max(0, inv.physicalQuantity - inv.reservedQuantity),
    }));
  }

  static async adjustInventory(
    locationId: string,
    itemId: string,
    batchNumber: string,
    physicalQuantity: number
  ) {
    if (physicalQuantity < 0) {
      throw new AppError('Physical quantity cannot be negative', 400);
    }

    return await prisma.$transaction(async (tx) => {
      const existing = await tx.inventory.findUnique({
        where: {
          locationId_itemId_batchNumber: {
            locationId,
            itemId,
            batchNumber,
          },
        },
      });

      if (existing) {
        if (physicalQuantity < existing.reservedQuantity) {
          throw new AppError(
            `Physical quantity cannot be less than reserved quantity (${existing.reservedQuantity})`,
            400
          );
        }

        const updated = await tx.inventory.update({
          where: { id: existing.id },
          data: { physicalQuantity },
          include: { location: true, item: true },
        });

        return {
          ...updated,
          availableQuantity: updated.physicalQuantity - updated.reservedQuantity,
        };
      } else {
        const created = await tx.inventory.create({
          data: {
            locationId,
            itemId,
            batchNumber,
            physicalQuantity,
            reservedQuantity: 0,
          },
          include: { location: true, item: true },
        });

        return {
          ...created,
          availableQuantity: created.physicalQuantity - created.reservedQuantity,
        };
      }
    });
  }

  static async getAllLocations() {
    return await prisma.location.findMany({ orderBy: { name: 'asc' } });
  }

  static async getAllItems() {
    return await prisma.item.findMany({
      include: { category: true },
      orderBy: { name: 'asc' },
    });
  }
}
