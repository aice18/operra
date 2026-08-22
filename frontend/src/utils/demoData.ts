// Pre-seeded fallback dataset for standalone presentation & offline DB resiliency
export const DEMO_LOCATIONS = [
  { id: 'loc-main-demo', name: 'Main Warehouse (Central)', code: 'LOC-MAIN' },
  { id: 'loc-north-demo', name: 'North Hub Location', code: 'LOC-NORTH' },
  { id: 'loc-south-demo', name: 'South Branch Location', code: 'LOC-SOUTH' },
];

export const DEMO_ITEMS = [
  { id: 'item-cpu-1', sku: 'SKU-CPU-001', name: 'High-Performance Microprocessor', category: { name: 'Electronics & Components' } },
  { id: 'item-steel-2', sku: 'SKU-STL-002', name: 'High-Grade Industrial Steel', category: { name: 'Raw Hardware & Steel' } },
  { id: 'item-dsp-3', sku: 'SKU-DSP-003', name: 'OLED Display Module 7inch', category: { name: 'Electronics & Components' } },
  { id: 'item-pkg-4', sku: 'SKU-PKG-004', name: 'Aluminum CNC Enclosure', category: { name: 'Packaging & Enclosures' } },
  { id: 'item-snr-5', sku: 'SKU-SNR-005', name: 'LiDAR Distance Sensor Array', category: { name: 'Sensors & Automation' } },
];

export const DEMO_INVENTORIES = [
  {
    id: 'inv-1',
    locationId: 'loc-main-demo',
    location: DEMO_LOCATIONS[0],
    itemId: 'item-cpu-1',
    item: DEMO_ITEMS[0],
    batchNumber: 'BATCH-2026-A1',
    physicalQuantity: 150,
    reservedQuantity: 30,
    availableQuantity: 120,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'inv-2',
    locationId: 'loc-main-demo',
    location: DEMO_LOCATIONS[0],
    itemId: 'item-steel-2',
    item: DEMO_ITEMS[1],
    batchNumber: 'BATCH-2026-S1',
    physicalQuantity: 500,
    reservedQuantity: 50,
    availableQuantity: 450,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'inv-3',
    locationId: 'loc-north-demo',
    location: DEMO_LOCATIONS[1],
    itemId: 'item-dsp-3',
    item: DEMO_ITEMS[2],
    batchNumber: 'BATCH-2026-N2',
    physicalQuantity: 150,
    reservedQuantity: 20,
    availableQuantity: 130,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'inv-4',
    locationId: 'loc-north-demo',
    location: DEMO_LOCATIONS[1],
    itemId: 'item-snr-5',
    item: DEMO_ITEMS[4],
    batchNumber: 'BATCH-2026-N3',
    physicalQuantity: 90,
    reservedQuantity: 15,
    availableQuantity: 75,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'inv-5',
    locationId: 'loc-south-demo',
    location: DEMO_LOCATIONS[2],
    itemId: 'item-pkg-4',
    item: DEMO_ITEMS[3],
    batchNumber: 'BATCH-2026-S2',
    physicalQuantity: 75,
    reservedQuantity: 0,
    availableQuantity: 75,
    updatedAt: new Date().toISOString()
  }
];

export const DEMO_WORK_ORDERS = [
  {
    id: 'wo-101',
    locationId: 'loc-main-demo',
    location: DEMO_LOCATIONS[0],
    itemId: 'item-cpu-1',
    item: DEMO_ITEMS[0],
    requiredQuantity: 180,
    availableQuantity: 120,
    shortage: 60,
    status: 'IN_PROGRESS',
    assignedUser: { name: 'Operations Manager' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'wo-102',
    locationId: 'loc-north-demo',
    location: DEMO_LOCATIONS[1],
    itemId: 'item-snr-5',
    item: DEMO_ITEMS[4],
    requiredQuantity: 50,
    availableQuantity: 75,
    shortage: 0,
    status: 'ASSIGNED',
    assignedUser: { name: 'Operations Manager' },
    createdAt: new Date().toISOString()
  },
  {
    id: 'wo-103',
    locationId: 'loc-south-demo',
    location: DEMO_LOCATIONS[2],
    itemId: 'item-pkg-4',
    item: DEMO_ITEMS[3],
    requiredQuantity: 100,
    availableQuantity: 75,
    shortage: 25,
    status: 'ASSIGNED',
    assignedUser: { name: 'System Admin' },
    createdAt: new Date().toISOString()
  }
];

export const DEMO_TRANSFERS = [
  {
    id: 'tr-301',
    sourceLocation: DEMO_LOCATIONS[1],
    destinationLocation: DEMO_LOCATIONS[0],
    item: DEMO_ITEMS[0],
    quantity: 40,
    status: 'DISPATCHED',
    createdAt: new Date().toISOString()
  },
  {
    id: 'tr-302',
    sourceLocation: DEMO_LOCATIONS[0],
    destinationLocation: DEMO_LOCATIONS[2],
    item: DEMO_ITEMS[3],
    quantity: 25,
    status: 'REQUESTED',
    createdAt: new Date().toISOString()
  },
  {
    id: 'tr-303',
    sourceLocation: DEMO_LOCATIONS[2],
    destinationLocation: DEMO_LOCATIONS[1],
    item: DEMO_ITEMS[4],
    quantity: 15,
    status: 'RECEIVED',
    createdAt: new Date().toISOString()
  }
];

export const DEMO_CUSTOMER_ORDERS = [
  {
    id: 'ord-401',
    orderNumber: 'ORD-2026-1001',
    createdBy: { name: 'Sales Executive' },
    status: 'RESERVED',
    orderItems: [
      { id: 'oi-1', item: DEMO_ITEMS[0], location: DEMO_LOCATIONS[0], quantity: 30 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'ord-402',
    orderNumber: 'ORD-2026-1002',
    createdBy: { name: 'Sales Executive' },
    status: 'RESERVED',
    orderItems: [
      { id: 'oi-2', item: DEMO_ITEMS[2], location: DEMO_LOCATIONS[1], quantity: 20 }
    ],
    createdAt: new Date().toISOString()
  }
];
