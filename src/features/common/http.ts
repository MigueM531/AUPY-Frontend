import { API_BASE_URL } from './config';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export class HttpError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

interface ApiErrorBody {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function httpClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('aupy_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      ...options,
      headers,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido de red';
    throw new HttpError(`No se pudo conectar con el servidor en ${API_BASE_URL}: ${errorMsg}`, 0);
  }

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aupy_token');
      localStorage.removeItem('aupy_user');
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign('/login');
    }
    throw new HttpError('Sesión expirada o no autorizada.', 401);
  }

  let data: unknown = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const errorBody = data as ApiErrorBody | null;
    const errorMsg =
      errorBody?.message ||
      errorBody?.error ||
      `Error en la petición al servidor (HTTP ${response.status})`;
    throw new HttpError(errorMsg, response.status, data);
  }

  return data as T;
}
