import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

describe('Mandatory Operations ERP Tests (Tests 1 to 5)', () => {
  let adminToken: string;
  let opsToken: string;
  let salesToken: string;

  let locMainId: string;
  let locNorthId: string;
  let itemId: string;

  beforeAll(async () => {
    // Reset database state before running test suite
    await prisma.orderItem.deleteMany();
    await prisma.customerOrder.deleteMany();
    await prisma.internalTransfer.deleteMany();
    await prisma.workOrder.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.user.deleteMany();
    await prisma.item.deleteMany();
    await prisma.category.deleteMany();
    await prisma.location.deleteMany();

    const passwordHash = await bcrypt.hash('password123', 10);

    // Create Locations
    const locMain = await prisma.location.create({
      data: { name: 'Main Warehouse', code: 'TEST-MAIN' },
    });
    locMainId = locMain.id;

    const locNorth = await prisma.location.create({
      data: { name: 'North Branch', code: 'TEST-NORTH' },
    });
    locNorthId = locNorth.id;

    // Create Users
    await prisma.user.create({
      data: {
        email: 'admin@test.com',
        passwordHash,
        name: 'Admin Test',
        role: 'ADMIN',
      },
    });

    await prisma.user.create({
      data: {
        email: 'ops@test.com',
        passwordHash,
        name: 'Ops Test',
        role: 'OPERATIONS',
      },
    });

    await prisma.user.create({
      data: {
        email: 'sales@test.com',
        passwordHash,
        name: 'Sales Test',
        role: 'SALES',
      },
    });

    // Create Category & Item
    const cat = await prisma.category.create({ data: { name: 'Electronics' } });
    const item = await prisma.item.create({
      data: { sku: 'TEST-SKU-001', name: 'Test Microchip', categoryId: cat.id },
    });
    itemId = item.id;

    // Create Initial Stock: Physical = 100, Reserved = 0, Available = 100 at Main Warehouse
    await prisma.inventory.create({
      data: {
        locationId: locMainId,
        itemId: itemId,
        batchNumber: 'TEST-BATCH-01',
        physicalQuantity: 100,
        reservedQuantity: 0,
      },
    });

    // Obtain JWT tokens for each role
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });
    adminToken = adminRes.body.token;

    const opsRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ops@test.com', password: 'password123' });
    opsToken = opsRes.body.token;

    const salesRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'sales@test.com', password: 'password123' });
    salesToken = salesRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // TEST 1: Cannot reserve more than available inventory.
  test('Test 1: Cannot reserve more than available inventory', async () => {
    // Attempt to reserve 150 items when only 100 available
    const response = await request(app)
      .post('/api/customer-orders')
      .set('Authorization', `Bearer ${salesToken}`)
      .send({
        items: [
          {
            itemId,
            locationId: locMainId,
            quantity: 150,
          },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Cannot reserve more than available inventory/i);

    // Valid reservation of 40 items should succeed
    const validRes = await request(app)
      .post('/api/customer-orders')
      .set('Authorization', `Bearer ${salesToken}`)
      .send({
        items: [
          {
            itemId,
            locationId: locMainId,
            quantity: 40,
          },
        ],
      });

    expect(validRes.status).toBe(201);
    expect(validRes.body.status).toBe('RESERVED');

    // Remaining Available Inventory should now be 60
    const invRes = await request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${salesToken}`);
    
    const targetInv = invRes.body.find((inv: any) => inv.locationId === locMainId && inv.itemId === itemId);
    expect(targetInv.reservedQuantity).toBe(40);
    expect(targetInv.availableQuantity).toBe(60);
  });

  // TEST 2: Cannot transfer more than available inventory.
  test('Test 2: Cannot transfer more than available inventory', async () => {
    // Current available at locMainId is 60 (100 physical - 40 reserved)
    const response = await request(app)
      .post('/api/transfers')
      .set('Authorization', `Bearer ${opsToken}`)
      .send({
        sourceLocationId: locMainId,
        destinationLocationId: locNorthId,
        itemId,
        quantity: 80, // Requested 80 > 60 Available
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Cannot transfer more than available inventory/i);
  });

  // TEST 3: Destination stock increases ONLY after transfer receipt.
  test('Test 3: Destination stock increases only after transfer receipt', async () => {
    // 1. Create valid transfer of 30 units (Available at Main is 60)
    const transferRes = await request(app)
      .post('/api/transfers')
      .set('Authorization', `Bearer ${opsToken}`)
      .send({
        sourceLocationId: locMainId,
        destinationLocationId: locNorthId,
        itemId,
        quantity: 30,
      });

    expect(transferRes.status).toBe(201);
    const transferId = transferRes.body.id;

    // 2. Dispatch Transfer
    const dispatchRes = await request(app)
      .post(`/api/transfers/${transferId}/dispatch`)
      .set('Authorization', `Bearer ${opsToken}`);

    expect(dispatchRes.status).toBe(200);
    expect(dispatchRes.body.status).toBe('DISPATCHED');

    // Verify Destination stock (locNorthId) is STILL 0 before receipt!
    const invBefore = await request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${opsToken}`);

    const destInvBefore = invBefore.body.find((inv: any) => inv.locationId === locNorthId && inv.itemId === itemId);
    expect(destInvBefore).toBeUndefined(); // Or 0 stock

    // 3. Receive Transfer
    const receiveRes = await request(app)
      .post(`/api/transfers/${transferId}/receive`)
      .set('Authorization', `Bearer ${opsToken}`);

    expect(receiveRes.status).toBe(200);
    expect(receiveRes.body.status).toBe('RECEIVED');

    // Verify Destination stock (locNorthId) has NOW increased to 30!
    const invAfter = await request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${opsToken}`);

    const destInvAfter = invAfter.body.find((inv: any) => inv.locationId === locNorthId && inv.itemId === itemId);
    expect(destInvAfter).toBeDefined();
    expect(destInvAfter.physicalQuantity).toBe(30);
  });

  // TEST 4: Same transfer cannot be received twice.
  test('Test 4: Same transfer cannot be received twice', async () => {
    // Get an existing received transfer or create new one
    const transferRes = await request(app)
      .post('/api/transfers')
      .set('Authorization', `Bearer ${opsToken}`)
      .send({
        sourceLocationId: locMainId,
        destinationLocationId: locNorthId,
        itemId,
        quantity: 10,
      });

    const transferId = transferRes.body.id;

    // Dispatch and Receive first time
    await request(app).post(`/api/transfers/${transferId}/dispatch`).set('Authorization', `Bearer ${opsToken}`);
    await request(app).post(`/api/transfers/${transferId}/receive`).set('Authorization', `Bearer ${opsToken}`);

    // Attempt second receipt call
    const secondReceive = await request(app)
      .post(`/api/transfers/${transferId}/receive`)
      .set('Authorization', `Bearer ${opsToken}`);

    expect(secondReceive.status).toBe(400);
    expect(secondReceive.body.message).toMatch(/Same transfer cannot be received twice/i);
  });

  // TEST 5: Unauthorized user cannot perform restricted operation.
  test('Test 5: Unauthorized user cannot perform restricted operation', async () => {
    // Sales User attempting to create a Work Order (Admin-only restriction)
    const workOrderRes = await request(app)
      .post('/api/work-orders')
      .set('Authorization', `Bearer ${salesToken}`)
      .send({
        locationId: locMainId,
        itemId,
        requiredQuantity: 20,
      });

    expect(workOrderRes.status).toBe(403);
    expect(workOrderRes.body.message).toMatch(/Forbidden: User with role 'SALES' cannot perform this action/i);

    // Operations User attempting to create a Work Order (Admin-only restriction)
    const opsWorkOrderRes = await request(app)
      .post('/api/work-orders')
      .set('Authorization', `Bearer ${opsToken}`)
      .send({
        locationId: locMainId,
        itemId,
        requiredQuantity: 20,
      });

    expect(opsWorkOrderRes.status).toBe(403);

    // Admin User attempting to create a Work Order (Authorized)
    const adminWorkOrderRes = await request(app)
      .post('/api/work-orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        locationId: locMainId,
        itemId,
        requiredQuantity: 20,
      });

    expect(adminWorkOrderRes.status).toBe(201);
  });
});
