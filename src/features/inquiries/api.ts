import { api } from '@/lib/api/client';
import { Inquiry, InquiryStatus } from './types';

export const inquiryApi = {
  getInquiries: async (): Promise<Inquiry[]> => {
    try {
      const response = await api.get<any>('/api/inquiries');
      const items = response.data?.data?.items || response.data?.data;
      if (Array.isArray(items)) {
        return items;
      }
      return [];
    } catch (error: any) {
      if (error?.message?.includes('unauthorized') || error?.message?.includes('Access token')) {
        return [];
      }
      console.error('Error fetching inquiries:', error);
      return [];
    }
  },

  getInquiry: async (id: string | number): Promise<Inquiry | null> => {
    try {
      const response = await api.get<any>(`/api/inquiries/${id}`);
      return response.data?.data || null;
    } catch (error: any) {
      if (error?.message?.includes('unauthorized') || error?.message?.includes('Access token')) {
        return null;
      }
      console.error(`Error fetching inquiry ${id}:`, error);
      return null;
    }
  },

  createInquiry: async (data: Partial<Inquiry>): Promise<Inquiry | null> => {
    try {
      const response = await api.post<any>('/api/inquiries', data);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error creating inquiry:', error);
      return null;
    }
  },

  updateStatus: async (id: string | number, status: InquiryStatus): Promise<boolean> => {
    try {
      await api.patch(`/api/inquiries/${id}`, { status });
      return true;
    } catch (error) {
      console.error(`Error updating inquiry status ${id}:`, error);
      return false;
    }
  },

  deleteInquiry: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/inquiries/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting inquiry ${id}:`, error);
      return false;
    }
  },

  updateInquiry: async (id: string | number, updates: Partial<Inquiry>): Promise<boolean> => {
    try {
      await api.patch(`/api/inquiries/${id}`, updates);
      return true;
    } catch (error) {
      console.error(`Error updating inquiry ${id}:`, error);
      return false;
    }
  },

  addLeadActivity: async (inquiryId: string | number, activityData: any): Promise<boolean> => {
    try {
      await api.post(`/api/inquiries/${inquiryId}/activities`, activityData);
      return true;
    } catch (error) {
      console.error(`Error adding lead activity for inquiry ${inquiryId}:`, error);
      return false;
    }
  }
};
