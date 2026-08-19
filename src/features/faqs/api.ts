import { api } from '@/lib/api/client';
import { Faq, FaqCategory } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const faqApi = {
  getFaqs: async (params?: { categoryId?: number; serviceId?: number; search?: string }, ignoreFallback: boolean = false): Promise<Faq[]> => {
    try {
      const queryParts: string[] = [];
      if (params?.categoryId) queryParts.push(`categoryId=${params.categoryId}`);
      if (params?.serviceId) queryParts.push(`serviceId=${params.serviceId}`);
      if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      
      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      const response = await api.get<ApiResponse<Faq[]>>(`/api/faqs${queryString}`);
      
      if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },

  getCategories: async (ignoreFallback: boolean = false): Promise<FaqCategory[]> => {
    try {
      const response = await api.get<ApiResponse<FaqCategory[]>>('/api/faqs/categories');
      if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },

  getCategory: async (id: string | number, ignoreFallback: boolean = false): Promise<FaqCategory | null> => {
    const categories = await faqApi.getCategories(ignoreFallback);
    return categories.find(c => c.id.toString() === id.toString()) || null;
  },

  createCategory: async (data: Partial<FaqCategory>): Promise<FaqCategory> => {
    try {
      const response = await api.post<ApiResponse<FaqCategory>>('/api/faqs/categories', data);
      return response.data?.data || (data as FaqCategory);
    } catch (error) {
      console.error('Error creating FAQ category:', error);
      throw error;
    }
  },

  updateCategory: async (id: string | number, data: Partial<FaqCategory>): Promise<FaqCategory | null> => {
    try {
      const response = await api.patch<ApiResponse<FaqCategory>>(`/api/faqs/categories/${id}`, data);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating FAQ category ${id}:`, error);
      return null;
    }
  },

  deleteCategory: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/faqs/categories/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting FAQ category ${id}:`, error);
      return false;
    }
  },

  getFaq: async (id: string | number): Promise<Faq | null> => {
    try {
      const response = await api.get<ApiResponse<Faq>>(`/api/faqs/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error fetching FAQ ${id}:`, error);
      return null;
    }
  },

  createFaq: async (data: Partial<Faq>): Promise<Faq> => {
    try {
      const response = await api.post<ApiResponse<Faq>>('/api/faqs', data);
      return response.data?.data || (data as Faq);
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }
  },

  updateFaq: async (id: string | number, data: Partial<Faq>): Promise<Faq | null> => {
    try {
      const response = await api.patch<ApiResponse<Faq>>(`/api/faqs/${id}`, data);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating FAQ ${id}:`, error);
      return null;
    }
  },

  deleteFaq: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/faqs/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting FAQ ${id}:`, error);
      return false;
    }
  },
};
