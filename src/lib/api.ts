// API base URL configuration
// In production: uses relative path /api/v1 (served from same host)
// In development: can be configured via VITE_API_URL env var or defaults to /api/v1
export const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const createApiClient = (endpoint: string) => {
  return `${API_URL}${endpoint}`;
};
