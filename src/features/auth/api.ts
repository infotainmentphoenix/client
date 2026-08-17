import { api, BASE_URL } from '@/lib/api/client';
import { LoginInput, RegisterInput, AuthResponse } from './types';

export const authApi = {
  
  
  login: async (data: LoginInput, requireAdmin = true): Promise<AuthResponse> => {
    
    
    const res = await api.post<any>('/api/auth/login', data);
    const authData: AuthResponse = res.data?.data || res.data;

    const user = authData.user;
    const token = authData.accessToken;

    if (requireAdmin && user && user.role !== 'ADMIN') {
      throw new Error('Access restricted: Only administrators can log in to this portal.');
    }

    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    return authData;
  },

  getMe: async (): Promise<AuthResponse['user'] | null> => {
    try {
      const res = await api.get<any>('/api/auth/me');
      const user = res.data?.data?.user || res.data?.user || null;
      if (typeof window !== 'undefined' && user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    } catch (error) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      return null;
    }
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const res = await api.post<any>('/api/auth/signup', data);
    return res.data?.data || res.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post<any>('/api/auth/logout', {});
    } catch (error) {
      
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },

  
  
  forgotPassword: async (email: string): Promise<void> => {
    await api.post<any>('/api/auth/forgot-password', { email });
  },

  resetPassword: async (password: string, token: string): Promise<void> => {
    await api.post<any>('/api/auth/reset-password', { token, password });
  },

  verifyEmail: async (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token) reject(new Error("Invalid token"));
        else resolve(true);
      }, 2000); 
    });
  },

  

  
  
  getGoogleLoginUrl: (): string => `${BASE_URL}/api/auth/google`,

  
  
  
  completeGoogleLogin: async (accessToken: string): Promise<AuthResponse['user'] | null> => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('token', accessToken);
    }
    return authApi.getMe();
  },
};
