export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

const handleResponse = async <T>(response: Response): Promise<{ data: T }> => {
  let json: any = null;
  try {
    const text = await response.text();
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    
  }

  if (!response.ok) {
    if ((response.status === 401 || response.status === 403) && typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/login') {
        window.location.href = '/login?session=expired';
      }
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
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<T>(response);
  },
  post: async <T>(url: string, body: any): Promise<{ data: T }> => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: isFormData ? getHeaders() : getHeaders({ 'Content-Type': 'application/json' }),
      body: isFormData ? body : JSON.stringify(body),
      credentials: 'include',
    });
    return handleResponse<T>(response);
  },
  patch: async <T>(url: string, body: any): Promise<{ data: T }> => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: isFormData ? getHeaders() : getHeaders({ 'Content-Type': 'application/json' }),
      body: isFormData ? body : JSON.stringify(body),
      credentials: 'include',
    });
    return handleResponse<T>(response);
  },
  put: async <T>(url: string, body: any): Promise<{ data: T }> => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: isFormData ? getHeaders() : getHeaders({ 'Content-Type': 'application/json' }),
      body: isFormData ? body : JSON.stringify(body),
      credentials: 'include',
    });
    return handleResponse<T>(response);
  },
  delete: async <T>(url: string): Promise<{ data: T }> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<T>(response);
  },
};
