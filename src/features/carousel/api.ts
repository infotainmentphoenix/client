import { api } from '@/lib/api/client';
import { Carousel } from './types';

export const carouselApi = {
  getCarousels: async (params?: { search?: string; isActive?: boolean; page?: number; limit?: number }): Promise<Carousel[]> => {
    try {
      let url = '/api/carousels?limit=100';
      if (params?.search) url += `&search=${encodeURIComponent(params.search)}`;
      if (params?.isActive !== undefined) url += `&isActive=${params.isActive}`;
      if (params?.page) url += `&page=${params.page}`;
      if (params?.limit) url = url.replace('limit=100', `limit=${params.limit}`);

      const response = await api.get<any>(url);
      const items = response.data?.data?.items || response.data?.data || [];
      return Array.isArray(items) ? items : [];
    } catch (error) {
      console.error('Error fetching carousels:', error);
      return [];
    }
  },

  getCarouselById: async (id: number | string): Promise<Carousel | null> => {
    try {
      const response = await api.get<any>(`/api/carousels/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error fetching carousel ${id}:`, error);
      return null;
    }
  },

  createCarousel: async (formData: FormData): Promise<Carousel | null> => {
    try {
      const response = await api.post<any>('/api/carousels', formData);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error creating carousel:', error);
      throw error;
    }
  },

  updateCarousel: async (id: number | string, formData: FormData): Promise<Carousel | null> => {
    try {
      const response = await api.patch<any>(`/api/carousels/${id}`, formData);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating carousel ${id}:`, error);
      throw error;
    }
  },

  deleteCarousel: async (id: number | string): Promise<boolean> => {
    try {
      await api.delete(`/api/carousels/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting carousel ${id}:`, error);
      return false;
    }
  },
};
