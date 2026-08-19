import { api } from '@/lib/api/client';
import { ClientProject } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const projectApi = {
  getProjects: async (): Promise<ClientProject[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/event/getAllEvent');
      const events = response.data?.data?.items || response.data?.data;
      if (Array.isArray(events) && events.length > 0) {
        const mapped: ClientProject[] = events.map((e: any, idx: number) => ({
          id: e.id,
          slug: e.slug || `project-${e.id}`,
          title: e.title,
          eventType: e.eventType || 'Live Event Project',
          eventDate: e.eventDate || '2026-11-20',
          venue: e.venue || 'Grand Ballroom',
          city: e.city || 'Mumbai',
          budget: 2000000,
          progress: idx % 2 === 0 ? 80 : 50,
          status: 'IN_PROGRESS',
          coverImage: e.coverImage || '',
          leadProducer: 'Phoenix Producer Team',
          leadProducerPhone: '+91 98765 43210',
          milestones: [],
          documents: [],
          createdAt: e.createdAt || new Date().toISOString(),
        }));
        return mapped;
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },

  getProjectById: async (identifier: string | number): Promise<ClientProject | null> => {
    const all = await projectApi.getProjects();
    const found = all.find(p => p.id.toString() === identifier.toString() || p.slug === identifier);
    return found || null;
  },
};
