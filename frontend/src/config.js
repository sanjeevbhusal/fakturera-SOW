// Get the API base URL based on the current environment
export const getApiBaseUrl = () => {
  // In development, use localhost:3000
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // In production, use the same host but port 3000
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:3000`;
};

export const API_BASE_URL = getApiBaseUrl();
