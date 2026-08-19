import { api } from '@/lib/api/client';
import { TeamMember } from './types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const teamApi = {
  getMembers: async (ignoreFallback: boolean = false): Promise<TeamMember[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/users');
      const users = response.data?.data;
      if (Array.isArray(users) && users.length > 0) {
        const mapped: TeamMember[] = users.map((u: any, idx: number) => ({
          id: u.id || idx + 1,
          name: u.name || 'Team Member',
          email: u.email,
          role: u.role || 'TEAM_MEMBER',
          designation: u.role === 'ADMIN' ? 'Executive Director' : 'Event Specialist',
          department: idx % 2 === 0 ? 'Event Operations' : 'Artist Curation',
          bio: 'Dedicated event professional delivering excellence for Phoenix Infotainment.',
          image: u.image || '',
          isActive: u.isActive !== false,
          createdAt: u.createdAt || new Date().toISOString(),
        }));
        return mapped;
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },

  getMember: async (id: string | number, ignoreFallback: boolean = false): Promise<TeamMember | null> => {
    const members = await teamApi.getMembers(ignoreFallback);
    return members.find(m => m.id.toString() === id.toString()) || null;
  },

  createMember: async (data: Partial<TeamMember> | FormData): Promise<TeamMember> => {
    try {
      const response = await api.post<ApiResponse<any>>('/api/users', data);
      return response.data?.data || (data as TeamMember);
    } catch (error) {
      console.error('Error creating team member user:', error);
      throw error;
    }
  },

  updateMember: async (id: string | number, data: Partial<TeamMember> | FormData): Promise<TeamMember | null> => {
    try {
      const response = await api.put<ApiResponse<any>>(`/api/users/${id}`, data);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating team member user ${id}:`, error);
      throw error;
    }
  },

  deleteMember: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting team member user ${id}:`, error);
      return false;
    }
  },
};
