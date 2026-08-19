import { api } from '@/lib/api/client';
import { Testimonial } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const testimonialApi = {
  getTestimonials: async (ignoreFallback: boolean = false): Promise<Testimonial[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/event/getAllEvent');
      const events = response.data?.data?.items || response.data?.data;
      if (Array.isArray(events) && events.length > 0) {
        const mapped: Testimonial[] = events
          .filter((e: any) => e.clientQuote && e.clientName)
          .map((e: any) => ({
            id: e.id,
            eventId: e.id,
            eventTitle: e.title,
            clientName: e.clientName,
            clientQuote: e.clientQuote,
            designation: 'Client / Event Sponsor',
            category: 'Corporate',
            rating: 5,
            coverImage: e.coverImage,
            createdAt: e.createdAt,
          }));
        if (mapped.length > 0) return ignoreFallback ? mapped : [...mapped, ...[]];
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },

  getTestimonial: async (eventId: string | number): Promise<Testimonial | null> => {
    const list = await testimonialApi.getTestimonials(true);
    return list.find(t => (t.eventId || t.id).toString() === eventId.toString()) || null;
  },

  getAvailableEvents: async (): Promise<{ id: number; title: string; clientName: string }[]> => {
    const list = await testimonialApi.getTestimonials(true);
    return list.map(t => ({ id: t.eventId || t.id, title: t.eventTitle, clientName: t.clientName }));
  },

  saveTestimonial: async (eventId: string | number, data: Partial<Testimonial>): Promise<Testimonial> => {
    const newT: Testimonial = {
      id: Number(eventId) || Date.now(),
      eventId: Number(eventId) || Date.now(),
      eventTitle: data.eventTitle || 'Event',
      clientName: data.clientName || 'Client',
      clientQuote: data.clientQuote || '',
      designation: data.designation || 'Client',
      company: data.company || '',
      rating: data.rating || 5,
      category: data.category || 'Corporate',
      avatarUrl: data.avatarUrl || '',
      coverImage: data.coverImage || '',
    };
    return Promise.resolve(newT);
  },

  deleteTestimonial: async (eventId: string | number): Promise<boolean> => {
    return Promise.resolve(true);
  },
};
