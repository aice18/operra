// Central API base URL configuration
// Prioritizes VITE_API_URL environment variable, falls back to local backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
