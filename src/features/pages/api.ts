import { api } from '@/lib/api/client';
import { SiteSetting } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const pageApi = {
  getSettings: async (): Promise<SiteSetting[]> => {
    try {
      const response = await api.get<ApiResponse<{ items: SiteSetting[] }>>('/api/site-settings?format=list');
      return response.data.data.items || [];
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return [];
    }
  },

  getSetting: async (id: string | number): Promise<SiteSetting | null> => {
    try {
      const response = await api.get<ApiResponse<{ setting: SiteSetting }>>(`/api/site-settings/${id}`);
      return response.data.data.setting;
    } catch (error) {
      console.error(`Error fetching setting ${id}:`, error);
      return null;
    }
  },

  createSetting: async (data: Partial<SiteSetting>): Promise<SiteSetting | null> => {
    try {
      const response = await api.post<ApiResponse<{ setting: SiteSetting }>>('/api/site-settings', data);
      return response.data.data.setting;
    } catch (error) {
      console.error('Error creating setting:', error);
      return null;
    }
  },

  updateSetting: async (id: string | number, data: Partial<SiteSetting>): Promise<SiteSetting | null> => {
    try {
      const response = await api.patch<ApiResponse<{ setting: SiteSetting }>>(`/api/site-settings/${id}`, data);
      return response.data.data.setting;
    } catch (error) {
      console.error(`Error updating setting ${id}:`, error);
      return null;
    }
  },

  deleteSetting: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/site-settings/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting setting ${id}:`, error);
      return false;
    }
  }
};
