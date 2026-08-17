export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Endpoints that must never trigger a refresh-and-retry cycle (avoids infinite
// loops and pointless refresh attempts on auth endpoints that legitimately 401).
const REFRESH_EXCLUDED_PATHS = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/refresh',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
];

const getHeaders = (customHeaders?: Record<string, string>): Record<string, string> => {
  const headers: Record<string, string> = {
    ...customHeaders,
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const clearSessionAndRedirect = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/login') {
    window.location.href = '/login?session=expired';
  }
};

// The 15-minute access token is short-lived by design. Instead of forcing a
// full logout the moment it expires, exchange the httpOnly refresh-token
// cookie (7d TTL, set by POST /api/auth/login) for a new access token.
// Concurrent 401s share one in-flight refresh call instead of each firing
// their own request against /api/auth/refresh.
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!response.ok) return null;
        const json = await response.json().catch(() => null);
        const newToken = json?.data?.accessToken || json?.accessToken || null;
        if (newToken && typeof window !== 'undefined') {
          localStorage.setItem('accessToken', newToken);
          localStorage.setItem('token', newToken);
        }
        return newToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
};

const handleResponse = async <T>(
  response: Response,
  retry: () => Promise<Response>,
  url: string,
): Promise<{ data: T }> => {
  let json: any = null;
  try {
    const text = await response.text();
    json = text ? JSON.parse(text) : null;
  } catch (e) {

  }

  if (!response.ok) {
    const canRefresh =
      (response.status === 401 || response.status === 403) &&
      typeof window !== 'undefined' &&
      !REFRESH_EXCLUDED_PATHS.some((path) => url.startsWith(path));

    if (canRefresh) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        const retried = await retry();
        return handleResponse<T>(retried, retry, url);
      }
      clearSessionAndRedirect();
    }

    const errorMessage = json?.message || json?.error || `HTTP error! status: ${response.status}`;
    const error = new Error(errorMessage) as any;
    error.errors = json?.errors;
    error.statusCode = response.status;
    throw error;
  }

  return { data: json };
};

export const api = {
  get: async <T>(url: string): Promise<{ data: T }> => {
    const doFetch = () =>
      fetch(`${BASE_URL}${url}`, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
      });
    return handleResponse<T>(await doFetch(), doFetch, url);
  },
  post: async <T>(url: string, body: any): Promise<{ data: T }> => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const doFetch = () =>
      fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: isFormData ? getHeaders() : getHeaders({ 'Content-Type': 'application/json' }),
        body: isFormData ? body : JSON.stringify(body),
        credentials: 'include',
      });
    return handleResponse<T>(await doFetch(), doFetch, url);
  },
  patch: async <T>(url: string, body: any): Promise<{ data: T }> => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const doFetch = () =>
      fetch(`${BASE_URL}${url}`, {
        method: 'PATCH',
        headers: isFormData ? getHeaders() : getHeaders({ 'Content-Type': 'application/json' }),
        body: isFormData ? body : JSON.stringify(body),
        credentials: 'include',
      });
    return handleResponse<T>(await doFetch(), doFetch, url);
  },
  put: async <T>(url: string, body: any): Promise<{ data: T }> => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const doFetch = () =>
      fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: isFormData ? getHeaders() : getHeaders({ 'Content-Type': 'application/json' }),
        body: isFormData ? body : JSON.stringify(body),
        credentials: 'include',
      });
    return handleResponse<T>(await doFetch(), doFetch, url);
  },
  delete: async <T>(url: string): Promise<{ data: T }> => {
    const doFetch = () =>
      fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: getHeaders(),
        credentials: 'include',
      });
    return handleResponse<T>(await doFetch(), doFetch, url);
  },
};
