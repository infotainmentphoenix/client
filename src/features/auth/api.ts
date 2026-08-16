import { api, BASE_URL } from '@/lib/api/client';
import { LoginInput, RegisterInput, AuthResponse } from './types';

// Standard delays for our mock API responses
const MOCK_DELAY = 1500;

export const authApi = {
  // --- REAL BACKEND ENDPOINTS ---
  
  login: async (data: LoginInput, requireAdmin = true): Promise<AuthResponse> => {
    // Call backend login endpoint: POST /api/auth/login
    // Backend returns: { success: true, data: { user, accessToken }, message: ... }
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
      // Ignore network errors on logout
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },

  // --- MOCK ENDPOINTS (Simulating non-existent backend features) ---

  forgotPassword: async (email: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email.includes('@')) {
          reject(new Error("Invalid email format"));
        } else {
          // Resolve perfectly as if a reset link was sent
          resolve(true); 
        }
      }, MOCK_DELAY);
    });
  },

  resetPassword: async (password: string, token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token) reject(new Error("Invalid or expired token"));
        else resolve(true);
      }, MOCK_DELAY);
    });
  },

  verifyEmail: async (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token) reject(new Error("Invalid token"));
        else resolve(true);
      }, 2000); // slightly longer delay for visual effect
    });
  },

  // --- GOOGLE OAUTH (Passport.js, real backend) ---

  // Backend redirects the browser through Google's consent screen and back
  // to GOOGLE_CALLBACK_URL; navigate the whole page here, don't fetch it.
  getGoogleLoginUrl: (): string => `${BASE_URL}/api/auth/google`,

  // Called by the /google/callback page once the backend redirects back with
  // our own access token in the URL fragment. Persists the session the same
  // way a normal email/password login does, then fetches the profile.
  completeGoogleLogin: async (accessToken: string): Promise<AuthResponse['user'] | null> => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('token', accessToken);
    }
    return authApi.getMe();
  },
};
