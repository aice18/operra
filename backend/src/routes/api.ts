import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { InventoryService } from '../services/inventoryService';
import { WorkOrderService } from '../services/workOrderService';
import { TransferService } from '../services/transferService';
import { CustomerOrderService } from '../services/customerOrderService';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

// --- Auth Routes ---
router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/auth/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.getCurrentUser(req.user!.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// --- Inventory Routes ---
router.get('/inventory', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventories = await InventoryService.getAllInventories();
    res.json(inventories);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/inventory/adjust',
  authenticate,
  authorize(['ADMIN', 'OPERATIONS']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locationId, itemId, batchNumber, physicalQuantity } = req.body;
      const updated = await InventoryService.adjustInventory(
        locationId,
        itemId,
        batchNumber,
        Number(physicalQuantity)
      );
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/locations', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await InventoryService.getAllLocations();
    res.json(locations);
  } catch (err) {
    next(err);
  }
});

router.get('/items', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await InventoryService.getAllItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// --- Work Order Routes ---
router.get('/work-orders', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workOrders = await WorkOrderService.getAllWorkOrders();
    res.json(workOrders);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/work-orders',
  authenticate,
  authorize(['ADMIN']), // Only Admin can create Work Orders
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locationId, itemId, requiredQuantity, assignedUserId } = req.body;
      const workOrder = await WorkOrderService.createWorkOrder({
        locationId,
        itemId,
        requiredQuantity: Number(requiredQuantity),
        assignedUserId,
      });
      res.status(201).json(workOrder);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/work-orders/:id/status',
  authenticate,
  authorize(['ADMIN', 'OPERATIONS']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      const updated = await WorkOrderService.updateStatus(req.params.id, status);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// --- Internal Stock Transfer Routes ---
router.get('/transfers', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transfers = await TransferService.getAllTransfers();
    res.json(transfers);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/transfers',
  authenticate,
  authorize(['ADMIN', 'OPERATIONS']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sourceLocationId, destinationLocationId, itemId, quantity } = req.body;
      const transfer = await TransferService.createTransfer({
        sourceLocationId,
        destinationLocationId,
        itemId,
        quantity: Number(quantity),
      });
      res.status(201).json(transfer);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/transfers/:id/dispatch',
  authenticate,
  authorize(['ADMIN', 'OPERATIONS']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await TransferService.dispatchTransfer(req.params.id);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/transfers/:id/receive',
  authenticate,
  authorize(['ADMIN', 'OPERATIONS']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await TransferService.receiveTransfer(req.params.id);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// --- Customer Order & Stock Reservation Routes ---
router.get('/customer-orders', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await CustomerOrderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/customer-orders',
  authenticate,
  authorize(['ADMIN', 'SALES']), // Admin or Sales user
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { items } = req.body;
      const order = await CustomerOrderService.createOrderAndReserveStock(
        req.user!.id,
        items
      );
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
