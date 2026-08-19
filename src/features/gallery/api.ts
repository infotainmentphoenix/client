import { api } from '@/lib/api/client';
import { GalleryMediaItem } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const galleryApi = {
  getItems: async (ignoreFallback: boolean = false): Promise<GalleryMediaItem[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/carousels');
      const carousels = response.data?.data?.items || response.data?.data;
      if (Array.isArray(carousels) && carousels.length > 0) {
        
        const mapped: GalleryMediaItem[] = carousels.map((c: any, index: number) => ({
          id: c.id || index + 10,
          title: c.title || 'Phoenix Event Showcase',
          category: 'Concerts',
          type: 'IMAGE',
          imageUrl: c.imageUrl,
          description: c.subtitle || 'Unforgettable live event experience created by Phoenix Infotainment.',
          aspectRatio: index % 3 === 0 ? 'landscape' : index % 3 === 1 ? 'portrait' : 'square',
        }));
        return mapped;
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },

  getItem: async (id: string | number, ignoreFallback: boolean = false): Promise<GalleryMediaItem | null> => {
    const items = await galleryApi.getItems(ignoreFallback);
    return items.find(i => i.id.toString() === id.toString()) || null;
  },

  createItem: async (data: FormData | Partial<GalleryMediaItem>): Promise<GalleryMediaItem> => {
    const response = await api.post<ApiResponse<any>>('/api/carousels', data);
    return response.data?.data || (data as GalleryMediaItem);
  },

  updateItem: async (id: string | number, data: FormData | Partial<GalleryMediaItem>): Promise<GalleryMediaItem | null> => {
    const response = await api.patch<ApiResponse<any>>(`/api/carousels/${id}`, data);
    return response.data?.data || null;
  },

  deleteItem: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/carousels/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting gallery item ${id}:`, error);
      return false;
    }
  },
};
