# Operra — Modern Operations & ERP Platform

A production-oriented, full-stack Operations ERP built with **Node.js, TypeScript, Express, Prisma ORM, PostgreSQL/SQLite**, and a **React (TypeScript + Vite)** frontend.

---

## 🌐 Live Deployments & API Documentation

- **Frontend App (Vercel)**: [https://frontend-two-alpha-19.vercel.app/](https://frontend-two-alpha-19.vercel.app/)
- **Backend API (Render)**: [https://operra-menw.onrender.com](https://operra-menw.onrender.com)
- **API Health Check**: [https://operra-menw.onrender.com/health](https://operra-menw.onrender.com/health)
- **Swagger API Docs**: [https://operra-menw.onrender.com/api-docs](https://operra-menw.onrender.com/api-docs)

---

## 🌟 1. Tech Stack

- **Frontend**: React 18 (Vite, TypeScript), Lucide Icons, Custom Responsive CSS Dark Theme System
- **Backend**: Node.js, Express, TypeScript, Swagger (OpenAPI 3.0 via `swagger-ui-express` & `swagger-jsdoc`)
- **Database & ORM**: Prisma ORM with PostgreSQL (Supabase) & SQLite support
- **Authentication & Authorization**: JWT (JSON Web Tokens) & Role-Based Access Control (`ADMIN`, `OPERATIONS`, `SALES`)
- **Testing**: Jest + Supertest (Automated tests for business logic rules and edge cases)

---

## 🔐 2. Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_URL="https://operra-menw.onrender.com"
```
*For local development, set `VITE_API_URL="http://localhost:5000"`.*

### Backend (`backend/.env`)
```env
PORT=5000
DATABASE_URL="postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="super-secret-jwt-key-for-operations-erp-2026"
NODE_ENV="production"
```

---

## 🛠️ 3. Project Setup & Database Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

1. **Clone Repository**:
   ```bash
   git clone https://github.com/aice18/operra.git
   cd operra
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```

3. **Database Setup**:
   Configure `DATABASE_URL` in `backend/.env` (supports PostgreSQL or SQLite), then run:
   ```bash
   # Push schema to database
   npx prisma db push

   # Seed database with initial data & demo accounts
   npx ts-node prisma/seed.ts
   ```

4. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🚀 4. How to Run

### Option A: Run Backend & Frontend Concurrently (From Root)
```bash
# In backend directory
cd backend
npm run dev

# In a separate terminal (in frontend directory)
cd frontend
npm run dev
```

- **Frontend URL**: `http://localhost:5173`
- **Backend API URL**: `http://localhost:5000`
- **Swagger Docs**: `http://localhost:5000/api-docs`

---

## 🔑 Quick Login Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@erp.com` | `password123` |
| **Operations User** | `ops@erp.com` | `password123` |
| **Sales User** | `sales@erp.com` | `password123` |

---

## 🧪 5. How to Test

Run the backend Jest integration test suite covering mandatory business logic rules & edge cases:

```bash
cd backend
npm test
```

### Verified Business Rule Test Cases:
1. **Inventory Reservation**: Cannot reserve more than available inventory (`physicalQuantity - reservedQuantity`).
2. **Stock Transfers**: Cannot transfer more than available inventory.
3. **Transfer Receipt**: Destination stock increases ONLY after transfer receipt confirmation.
4. **Idempotency**: Same transfer cannot be received twice.
5. **RBAC Security**: Unauthorized users cannot perform restricted operations based on their role.

---

## 📐 6. Database Schema / ER Diagram

Below is the Entity-Relationship Diagram for the Operra ERP database system:

![Operra Database ER Diagram](frontend/public/database%20er.png)

### Core Entities:
- **User**: Authentication, JWT session context, role assignment (`ADMIN`, `OPERATIONS`, `SALES`), location mapping.
- **Location**: Warehouses, retail outlets, hubs.
- **Category & Item**: Product inventory catalog metadata.
- **Inventory**: Location-based physical and reserved stock tracking with batch numbers.
- **WorkOrder**: Assembly/production tasks mapped to locations and assigned users.
- **InternalTransfer**: Stock movements between source and destination locations with status workflow (`REQUESTED`, `DISPATCHED`, `RECEIVED`).
- **CustomerOrder & OrderItem**: Sales orders reserving and fulfilling inventory items.

---

## 📄 7. API Documentation (Swagger / OpenAPI)

Interactive Swagger API documentation is integrated directly into the backend application.

- **Live Swagger Interactive UI**: [https://operra-menw.onrender.com/api-docs](https://operra-menw.onrender.com/api-docs)
- **Local Swagger UI**: `http://localhost:5000/api-docs` (when running backend locally)

### API Endpoints Overview:
- `POST /api/auth/login` — User authentication & JWT generation.
- `GET /api/auth/me` — Current user profile & role information.
- `GET/POST /api/inventory` — Query and manage inventory records across locations.
- `POST /api/transfers` — Create, dispatch, and receive internal stock transfers.
- `GET/POST /api/work-orders` — Work order processing and fulfillment.
- `GET/POST /api/orders` — Customer order creation and reservation.

