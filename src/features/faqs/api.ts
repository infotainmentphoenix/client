import { api } from '@/lib/api/client';
import { Faq, FaqCategory } from './types';

export const fallbackCategories: FaqCategory[] = [
  { id: 1, name: 'General & Services', slug: 'general', sortOrder: 1, isActive: true },
  { id: 2, name: 'Booking & Process', slug: 'booking', sortOrder: 2, isActive: true },
  { id: 3, name: 'Artist & Celebrity Booking', slug: 'artist-booking', sortOrder: 3, isActive: true },
  { id: 4, name: 'Logistics & Production', slug: 'logistics', sortOrder: 4, isActive: true },
  { id: 5, name: 'Pricing & Contracts', slug: 'pricing', sortOrder: 5, isActive: true },
];

export const fallbackFaqs: Faq[] = [
  {
    id: 101,
    question: 'What types of events does Phoenix Infotainment handle?',
    answer: 'We specialize in a broad range of events including Corporate Galas & Conferences, Luxury Weddings, Live Musical Concerts, Product Launches, Awards Ceremonies, Brand Activations, and Private VIP Celebrations.',
    categoryId: 1,
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 102,
    question: 'How far in advance should we book an event or artist?',
    answer: 'We recommend booking 2 to 6 months in advance for large-scale corporate events or celebrity artist bookings. However, we also cater to urgent requests depending on artist and production availability.',
    categoryId: 2,
    sortOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 103,
    question: 'Can you arrange A-list Bollywood celebrities and international artists?',
    answer: 'Yes! Phoenix Infotainment has direct access to leading Bollywood actors, playback singers, top DJs, stand-up comedians, and international performers for live shows, corporate appearances, and weddings.',
    categoryId: 3,
    sortOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 104,
    question: 'Do you manage complete technical setup like sound, light, and stage design?',
    answer: 'Absolutely. We provide end-to-end event infrastructure including state-of-the-art Line Array sound systems, intelligent LED lighting, custom stage architecture, LED video walls, pyrotechnics, and live broadcast setup.',
    categoryId: 4,
    sortOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 105,
    question: 'What is your pricing model and payment structure?',
    answer: 'Our pricing is customized based on event scale, venue, guest count, and artist lineup. We offer transparent itemized proposals with standard milestone payment terms (advance deposit, mid-project, and final pre-event settlement).',
    categoryId: 5,
    sortOrder: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 106,
    question: 'Do you handle destination weddings and outstation corporate events?',
    answer: 'Yes, we manage turn-key destination events across India (Goa, Rajasthan, Mumbai, Delhi, Pune, Bengaluru) and select international destinations, managing travel, hospitality, permissions, and logistics.',
    categoryId: 1,
    sortOrder: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 107,
    question: 'What happens in case of unforeseen weather or emergency cancellations?',
    answer: 'All our contracts include clear force majeure policies and contingency plans. We provide waterproof staging options for outdoor events and reschedule or secure alternative arrangements whenever possible.',
    categoryId: 4,
    sortOrder: 7,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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
      return ignoreFallback ? [] : fallbackFaqs;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback FAQs:', error);
      return ignoreFallback ? [] : fallbackFaqs;
    }
  },

  getCategories: async (ignoreFallback: boolean = false): Promise<FaqCategory[]> => {
    try {
      const response = await api.get<ApiResponse<FaqCategory[]>>('/api/faqs/categories');
      if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return ignoreFallback ? [] : fallbackCategories;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback FAQ categories:', error);
      return ignoreFallback ? [] : fallbackCategories;
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
