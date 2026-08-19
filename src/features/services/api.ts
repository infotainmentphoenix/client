import { api } from '@/lib/api/client';
import { Service } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const serviceApi = {
  getServices: async (ignoreFallback: boolean = false): Promise<Service[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/services');
      const items = response.data?.data?.items || response.data?.data || response.data;
      if (Array.isArray(items)) {
        if (items.length > 0) return items;
        return [];
      }
      return [];
    } catch (error) {
      console.warn('Backend API unavailable, using database fallback services:', error);
      return [];
    }
  },

  getServiceBySlug: async (slug: string, ignoreFallback: boolean = false): Promise<Service | null> => {
    try {
      const response = await api.get<ApiResponse<any>>(`/api/services/${slug}`);
      const item = response.data?.data?.item || response.data?.data?.service || response.data?.data;
      if (item && (item.slug || item.id)) {
        return item;
      }
      if (ignoreFallback) return null;
      const found = ([] as any[]).find(s => s.slug === slug || s.id.toString() === slug);
      return found || [][0];
    } catch (error) {
      console.warn(`Backend API unavailable for service slug ${slug}, using database fallback:`, error);
      if (ignoreFallback) return null;
      const found = ([] as any[]).find(s => s.slug === slug || s.id.toString() === slug);
      return found || [][0];
    }
  },

  getService: async (id: string | number, ignoreFallback: boolean = false): Promise<Service | null> => {
    const services = await serviceApi.getServices(ignoreFallback);
    return services.find(s => s.id.toString() === id.toString() || s.slug === id) || null;
  },

  createService: async (data: FormData | Partial<Service>): Promise<Service> => {
    const response = await api.post<ApiResponse<Service>>('/api/services', data);
    return response.data?.data || (data as Service);
  },

  updateService: async (id: string | number, data: FormData | Partial<Service>): Promise<Service | null> => {
    const response = await api.patch<ApiResponse<Service>>(`/api/services/${id}`, data);
    return response.data?.data || null;
  },

  deleteService: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/services/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      return false;
    }
  },
};
