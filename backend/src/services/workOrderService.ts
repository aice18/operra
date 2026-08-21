import { prisma } from '../config/prisma';
import { AppError } from '../middleware/errorHandler';

export class WorkOrderService {
  static async createWorkOrder(data: {
    locationId: string;
    itemId: string;
    requiredQuantity: number;
    assignedUserId?: string;
  }) {
    if (data.requiredQuantity <= 0) {
      throw new AppError('Required quantity must be greater than zero', 400);
    }

    const location = await prisma.location.findUnique({ where: { id: data.locationId } });
    if (!location) throw new AppError('Location not found', 404);

    const item = await prisma.item.findUnique({ where: { id: data.itemId } });
    if (!item) throw new AppError('Item not found', 404);

    return await prisma.workOrder.create({
      data: {
        locationId: data.locationId,
        itemId: data.itemId,
        requiredQuantity: data.requiredQuantity,
        assignedUserId: data.assignedUserId || null,
        status: 'ASSIGNED',
      },
      include: {
        location: true,
        item: true,
        assignedUser: { select: { id: true, name: true, email: true } },
      },
    });
  }

  static async getAllWorkOrders() {
    const workOrders = await prisma.workOrder.findMany({
      include: {
        location: true,
        item: true,
        assignedUser: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Compute shortage automatically for each work order
    const result = await Promise.all(
      workOrders.map(async (wo) => {
        const inventories = await prisma.inventory.findMany({
          where: { locationId: wo.locationId, itemId: wo.itemId },
        });

        const totalAvailableStock = inventories.reduce(
          (sum, inv) => sum + Math.max(0, inv.physicalQuantity - inv.reservedQuantity),
          0
        );

        const shortage = Math.max(0, wo.requiredQuantity - totalAvailableStock);

        return {
          ...wo,
          availableAtLocation: totalAvailableStock,
          shortageQuantity: shortage,
        };
      })
    );

    return result;
  }

  static async updateStatus(workOrderId: string, status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED') {
    const workOrder = await prisma.workOrder.findUnique({ where: { id: workOrderId } });
    if (!workOrder) throw new AppError('Work order not found', 404);

    return await prisma.workOrder.update({
      where: { id: workOrderId },
      data: { status },
      include: {
        location: true,
        item: true,
        assignedUser: { select: { id: true, name: true, email: true } },
      },
    });
  }
}
