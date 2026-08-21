# Mini Operations ERP

A production-oriented, full-stack **Mini Operations ERP** built with **Node.js, TypeScript, Express, Prisma ORM, SQLite/PostgreSQL**, and a **React (TypeScript + Vite)** frontend.

---

## 🌟 Tech Stack
- **Frontend**: React (Vite + TypeScript), Lucide Icons, Custom CSS Dark Theme System
- **Backend**: Node.js, Express, TypeScript
- **Database & ORM**: Prisma ORM with SQLite (supports PostgreSQL with zero schema changes)
- **Authentication**: JWT Auth & Role-Based Access Control (`ADMIN`, `OPERATIONS`, `SALES`)
- **Testing**: Jest + Supertest (Automated tests for mandatory business scenarios 1 to 5)

---

## 🛠️ Project Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone Repository
```bash
git clone https://github.com/aice18/operra.git
cd operra
```

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma db push
npx ts-node prisma/seed.ts
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## 🚀 How to Run

### Start Backend Server (Port 5000)
```bash
cd backend
npm run dev
```

### Start Frontend Application (Port 5173)
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔑 Quick Login Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@erp.com` | `password123` |
| **Operations User** | `ops@erp.com` | `password123` |
| **Sales User** | `sales@erp.com` | `password123` |

---

## 🧪 How to Test (Mandatory Test Suite)

Run the Jest integration test suite covering all 5 mandatory edge cases & business logic rules:

```bash
cd backend
npm test
```

### Verified Test Cases:
1. **Test 1**: Cannot reserve more than available inventory.
2. **Test 2**: Cannot transfer more than available inventory.
3. **Test 3**: Destination stock increases ONLY after transfer receipt.
4. **Test 4**: Same transfer cannot be received twice (Idempotent receipt).
5. **Test 5**: Unauthorized user cannot perform restricted operations (RBAC).

---

## 📐 ER Diagram / Schema Overview

```
User (id, email, passwordHash, role: ADMIN|OPERATIONS|SALES, locationId)
Location (id, name, code)
Category (id, name)
Item (id, sku, name, categoryId)
Inventory (id, locationId, itemId, batchNumber, physicalQuantity, reservedQuantity)
  * Available Quantity = physicalQuantity - reservedQuantity
WorkOrder (id, locationId, itemId, requiredQuantity, assignedUserId, status)
InternalTransfer (id, sourceLocationId, destinationLocationId, itemId, quantity, status: REQUESTED|DISPATCHED|RECEIVED)
CustomerOrder (id, orderNumber, createdById, status)
OrderItem (id, customerOrderId, itemId, locationId, quantity)
```
