import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding comprehensive historical ERP data...');

  // Clean existing tables
  await prisma.orderItem.deleteMany();
  await prisma.customerOrder.deleteMany();
  await prisma.internalTransfer.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.user.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.location.deleteMany();

  // Create Locations
  const locMain = await prisma.location.create({
    data: { name: 'Main Warehouse (Central)', code: 'LOC-MAIN' },
  });

  const locNorth = await prisma.location.create({
    data: { name: 'North Hub Location', code: 'LOC-NORTH' },
  });

  const locSouth = await prisma.location.create({
    data: { name: 'South Branch Location', code: 'LOC-SOUTH' },
  });

  // Create Users with Hashed Passwords (password: "password123")
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@erp.com',
      passwordHash,
      name: 'System Admin',
      role: 'ADMIN',
      locationId: locMain.id,
    },
  });

  const opsUser = await prisma.user.create({
    data: {
      email: 'ops@erp.com',
      passwordHash,
      name: 'Operations Manager',
      role: 'OPERATIONS',
      locationId: locMain.id,
    },
  });

  const salesUser = await prisma.user.create({
    data: {
      email: 'sales@erp.com',
      passwordHash,
      name: 'Sales Executive',
      role: 'SALES',
      locationId: locNorth.id,
    },
  });

  // Create Categories
  const catElectronics = await prisma.category.create({
    data: { name: 'Electronics & Components' },
  });

  const catHardware = await prisma.category.create({
    data: { name: 'Raw Hardware & Steel' },
  });

  const catPackaging = await prisma.category.create({
    data: { name: 'Packaging & Enclosures' },
  });

  const catSensors = await prisma.category.create({
    data: { name: 'Sensors & Automation' },
  });

  // Create Items
  const itemCpu = await prisma.item.create({
    data: {
      sku: 'SKU-CPU-001',
      name: 'High-Performance Microprocessor',
      categoryId: catElectronics.id,
    },
  });

  const itemSteel = await prisma.item.create({
    data: {
      sku: 'SKU-STL-002',
      name: 'Industrial Steel Rod 10mm',
      categoryId: catHardware.id,
    },
  });

  const itemDisplay = await prisma.item.create({
    data: {
      sku: 'SKU-DSP-003',
      name: 'OLED Display Module 7inch',
      categoryId: catElectronics.id,
    },
  });

  const itemCasing = await prisma.item.create({
    data: {
      sku: 'SKU-PKG-004',
      name: 'Aluminum CNC Enclosure',
      categoryId: catPackaging.id,
    },
  });

  const itemSensor = await prisma.item.create({
    data: {
      sku: 'SKU-SNR-005',
      name: 'LiDAR Distance Sensor Array',
      categoryId: catSensors.id,
    },
  });

  // Create Inventories
  await prisma.inventory.create({
    data: {
      locationId: locMain.id,
      itemId: itemCpu.id,
      batchNumber: 'BATCH-2026-A1',
      physicalQuantity: 150,
      reservedQuantity: 30, // Available = 120
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locMain.id,
      itemId: itemSteel.id,
      batchNumber: 'BATCH-2026-S1',
      physicalQuantity: 500,
      reservedQuantity: 50, // Available = 450
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locMain.id,
      itemId: itemCasing.id,
      batchNumber: 'BATCH-2026-C1',
      physicalQuantity: 200,
      reservedQuantity: 40, // Available = 160
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locNorth.id,
      itemId: itemCpu.id,
      batchNumber: 'BATCH-2026-N1',
      physicalQuantity: 80,
      reservedQuantity: 10, // Available = 70
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locNorth.id,
      itemId: itemDisplay.id,
      batchNumber: 'BATCH-2026-N2',
      physicalQuantity: 150,
      reservedQuantity: 20, // Available = 130
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locNorth.id,
      itemId: itemSensor.id,
      batchNumber: 'BATCH-2026-N3',
      physicalQuantity: 90,
      reservedQuantity: 15, // Available = 75
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locSouth.id,
      itemId: itemCasing.id,
      batchNumber: 'BATCH-2026-S2',
      physicalQuantity: 75,
      reservedQuantity: 0, // Available = 75
    },
  });

  await prisma.inventory.create({
    data: {
      locationId: locSouth.id,
      itemId: itemSensor.id,
      batchNumber: 'BATCH-2026-S3',
      physicalQuantity: 110,
      reservedQuantity: 10, // Available = 100
    },
  });

  // Create Work Orders (Historical + Active)
  await prisma.workOrder.create({
    data: {
      locationId: locMain.id,
      itemId: itemCpu.id,
      requiredQuantity: 180,
      assignedUserId: opsUser.id,
      status: 'IN_PROGRESS',
    },
  });

  await prisma.workOrder.create({
    data: {
      locationId: locNorth.id,
      itemId: itemSensor.id,
      requiredQuantity: 50,
      assignedUserId: opsUser.id,
      status: 'ASSIGNED',
    },
  });

  await prisma.workOrder.create({
    data: {
      locationId: locSouth.id,
      itemId: itemCasing.id,
      requiredQuantity: 100,
      assignedUserId: admin.id,
      status: 'ASSIGNED',
    },
  });

  await prisma.workOrder.create({
    data: {
      locationId: locMain.id,
      itemId: itemSteel.id,
      requiredQuantity: 250,
      assignedUserId: admin.id,
      status: 'COMPLETED',
    },
  });

  // Create Internal Transfers (Historical + Active)
  await prisma.internalTransfer.create({
    data: {
      sourceLocationId: locNorth.id,
      destinationLocationId: locMain.id,
      itemId: itemCpu.id,
      quantity: 40,
      status: 'DISPATCHED',
    },
  });

  await prisma.internalTransfer.create({
    data: {
      sourceLocationId: locMain.id,
      destinationLocationId: locSouth.id,
      itemId: itemCasing.id,
      quantity: 25,
      status: 'REQUESTED',
    },
  });

  await prisma.internalTransfer.create({
    data: {
      sourceLocationId: locSouth.id,
      destinationLocationId: locNorth.id,
      itemId: itemSensor.id,
      quantity: 15,
      status: 'RECEIVED',
    },
  });

  // Create Customer Orders (Historical + Active)
  const order1 = await prisma.customerOrder.create({
    data: {
      orderNumber: 'ORD-2026-1001',
      createdById: salesUser.id,
      status: 'RESERVED',
    },
  });

  await prisma.orderItem.create({
    data: {
      customerOrderId: order1.id,
      itemId: itemCpu.id,
      locationId: locMain.id,
      quantity: 30,
    },
  });

  const order2 = await prisma.customerOrder.create({
    data: {
      orderNumber: 'ORD-2026-1002',
      createdById: salesUser.id,
      status: 'RESERVED',
    },
  });

  await prisma.orderItem.create({
    data: {
      customerOrderId: order2.id,
      itemId: itemDisplay.id,
      locationId: locNorth.id,
      quantity: 20,
    },
  });

  const order3 = await prisma.customerOrder.create({
    data: {
      orderNumber: 'ORD-2026-1003',
      createdById: admin.id,
      status: 'RESERVED',
    },
  });

  await prisma.orderItem.create({
    data: {
      customerOrderId: order3.id,
      itemId: itemSteel.id,
      locationId: locMain.id,
      quantity: 50,
    },
  });

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
