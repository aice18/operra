import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Operra — Operations ERP API Documentation',
    version: '1.0.0',
    description: 'API documentation for Operra full-stack Operations ERP system.',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Local Backend Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/auth/login': {
      post: {
        summary: 'Authenticate User & Get Token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'admin@erp.com' },
                  password: { type: 'string', example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'JWT Token & User Profile' },
          401: { description: 'Invalid Credentials' },
        },
      },
    },
    '/inventory': {
      get: {
        summary: 'Get All Inventory with Available Quantity',
        responses: { 200: { description: 'List of Inventory items' } },
      },
    },
    '/inventory/adjust': {
      post: {
        summary: 'Adjust Physical Stock (Admin/Operations)',
        responses: { 200: { description: 'Updated Inventory' } },
      },
    },
    '/work-orders': {
      get: { summary: 'Get Work Orders with calculated shortage' },
      post: { summary: 'Create Work Order (Admin Only)' },
    },
    '/transfers': {
      get: { summary: 'Get Internal Stock Transfers' },
      post: { summary: 'Request Stock Transfer' },
    },
    '/transfers/{id}/dispatch': {
      post: { summary: 'Dispatch Transfer (Deducts Source Stock)' },
    },
    '/transfers/{id}/receive': {
      post: { summary: 'Receive Transfer (Adds Destination Stock)' },
    },
    '/customer-orders': {
      get: { summary: 'Get Customer Orders' },
      post: { summary: 'Create Customer Order & Reserve Stock (Admin/Sales)' },
    },
  },
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
