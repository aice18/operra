import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

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

  // Create Initial Inventories
  // Location MAIN
  await prisma.inventory.create({
    data: {
      locationId: locMain.id,
      itemId: itemCpu.id,
      batchNumber: 'BATCH-2026-A1',
      physicalQuantity: 100,
      reservedQuantity: 30, // Available = 70
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

  // Location NORTH
  await prisma.inventory.create({
    data: {
      locationId: locNorth.id,
      itemId: itemCpu.id,
      batchNumber: 'BATCH-2026-N1',
      physicalQuantity: 60,
      reservedQuantity: 0, // Available = 60
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

  // Create Sample Work Order
  await prisma.workOrder.create({
    data: {
      locationId: locMain.id,
      itemId: itemCpu.id,
      requiredQuantity: 100, // Stock at MAIN is 70 available -> Shortage 30
      assignedUserId: opsUser.id,
      status: 'ASSIGNED',
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
