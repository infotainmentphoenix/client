import { api } from '@/lib/api/client';
import { Event } from './types';

export const eventApi = {
  // Backend route is GET /api/event/getAllEvent
  // Returns apiResponse.paginated → { data: { items: [...], pagination: {...} } }
  getEvents: async (params?: { eventType?: string; limit?: number }): Promise<Event[]> => {
    try {
      let url = '/api/event/getAllEvent?limit=100';
      if (params?.eventType) url += `&eventType=${params.eventType}`;
      if (params?.limit) url = url.replace('limit=100', `limit=${params.limit}`);
      
      const response = await api.get<any>(url);
      return response.data?.data?.items || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Backend route is GET /api/event/getEvent/:id
  // Returns apiResponse.success → { data: eventObject (with images included) }
  getEvent: async (id: string | number): Promise<Event | null> => {
    try {
      const response = await api.get<any>(`/api/event/getEvent/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      return null;
    }
  },

  createEvent: async (data: FormData | Partial<Event>): Promise<Event> => {
    const response = await api.post<any>('/api/event/create', data);
    return response.data?.data;
  },

  updateEvent: async (id: string | number, data: FormData | Partial<Event>): Promise<Event> => {
    const response = await api.put<any>(`/api/event/update/${id}`, data);
    return response.data?.data;
  },

  deleteEvent: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/event/delete/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      return false;
    }
  }
};
