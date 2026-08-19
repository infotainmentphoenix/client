import { api } from '@/lib/api/client';
import { Consultation } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const consultationApi = {
  getConsultations: async (): Promise<Consultation[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/users');
      const users = response.data?.data;
      if (Array.isArray(users) && users.length > 0) {
        return [];
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },
};
