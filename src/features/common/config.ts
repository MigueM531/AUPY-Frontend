const rawHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:4000/api';

export const API_BASE_URL = rawHost.replace(/\/+$/, '');
