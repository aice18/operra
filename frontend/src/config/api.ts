// Central API base URL configuration
// Prioritizes VITE_API_URL environment variable, falls back to new Render backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://operra-menw.onrender.com';
