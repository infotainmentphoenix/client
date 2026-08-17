import { api } from '@/lib/api/client';
import { Artist, ArtistCategory } from './types';

export const artistApi = {
  
  getArtists: async (params?: { categoryId?: number; featured?: boolean; search?: string; limit?: number }): Promise<Artist[]> => {
    try {
      let url = '/api/artist?limit=100';
      if (params?.categoryId) url += `&categoryId=${params.categoryId}`;
      if (params?.featured) url += `&featured=true`;
      if (params?.search) url += `&search=${encodeURIComponent(params.search)}`;
      if (params?.limit) url = url.replace('limit=100', `limit=${params.limit}`);
      
      const response = await api.get<any>(url);
      return response.data?.data?.items || [];
    } catch (error) {
      console.error('Error fetching artists:', error);
      return [];
    }
  },

  
  getArtist: async (id: string | number): Promise<Artist | null> => {
    try {
      const response = await api.get<any>(`/api/artist/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error fetching artist ${id}:`, error);
      return null;
    }
  },

  
  deleteArtist: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/artist/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting artist ${id}:`, error);
      return false;
    }
  },
  
  
  toggleStatus: async (id: string | number, isActive: boolean): Promise<boolean> => {
    try {
      await api.patch(`/api/artist/${id}`, { isActive });
      return true;
    } catch (error) {
      console.error(`Error toggling artist status ${id}:`, error);
      return false;
    }
  },

  
  createArtist: async (data: Partial<Artist> | FormData): Promise<Artist | null> => {
    try {
      const response = await api.post<any>('/api/artist', data);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error creating artist:', error);
      return null;
    }
  },

  
  updateArtist: async (id: string | number, data: Partial<Artist> | FormData): Promise<Artist | null> => {
    try {
      const response = await api.patch<any>(`/api/artist/${id}`, data);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating artist ${id}:`, error);
      return null;
    }
  },

  
  getCategories: async (): Promise<ArtistCategory[]> => {
    try {
      const response = await api.get<any>('/api/artist/category');
      return response.data?.data?.items || [];
    } catch (error) {
      console.error('Error fetching artist categories:', error);
      return [];
    }
  },
  
  getCategory: async (id: string | number): Promise<ArtistCategory | null> => {
    try {
      const response = await api.get<any>(`/api/artist/category/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      return null;
    }
  },

  createCategory: async (data: Partial<ArtistCategory>): Promise<ArtistCategory | null> => {
    try {
      const response = await api.post<any>('/api/artist/category', data);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  },

  updateCategory: async (id: string | number, data: Partial<ArtistCategory>): Promise<ArtistCategory | null> => {
    try {
      const response = await api.patch<any>(`/api/artist/category/${id}`, data);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      return null;
    }
  },

  deleteCategory: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/artist/category/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      return false;
    }
  }
};
