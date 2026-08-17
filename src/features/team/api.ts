import { api } from '@/lib/api/client';
import { TeamMember } from './types';

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Diya Makhija',
    email: 'diya@phoenixinfotainment.com',
    role: 'ADMIN',
    designation: 'Founder & Owner',
    department: 'Leadership',
    bio: 'Pioneering entrepreneur and creative force behind Phoenix Infotainment. Under her leadership, the company has grown into a premiere global events and entertainment management brand, specializing in weddings, luxury galas, and celebrity artist curation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    experience: '12+ Years',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Vikramaditya Shinde',
    email: 'vikram@phoenixinfotainment.com',
    role: 'ADMIN',
    designation: 'Co-Founder & Managing Director',
    department: 'Leadership',
    bio: '15+ years pioneering mega live concert productions, celebrity artist contracts, and high-impact corporate galas across India and the Middle East.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    experience: '15+ Years',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Ananya Deshmukh',
    email: 'ananya@phoenixinfotainment.com',
    role: 'TEAM_MEMBER',
    designation: 'Head of Artist & Celebrity Curation',
    department: 'Artist Curation',
    bio: 'Specialist in Bollywood A-lister endorsements, playback singer tours, and international artist rider compliance.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    experience: '10+ Years',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Rajesh Kulkarni',
    email: 'rajesh@phoenixinfotainment.com',
    role: 'TEAM_MEMBER',
    designation: 'Chief Technical & Sound Engineer',
    department: 'Production & Sound',
    bio: 'Mastermind behind Line Array acoustic engineering, 3D laser mapping, and stadium stage architectural execution.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    experience: '12+ Years',
    linkedinUrl: 'https://linkedin.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Meera Kapoor',
    email: 'meera@phoenixinfotainment.com',
    role: 'TEAM_MEMBER',
    designation: 'Director of Luxury Destination Weddings',
    department: 'Event Operations',
    bio: 'Curating royal palace weddings in Rajasthan, beach galas in Goa, and bespoke theme decor for VIP families.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    experience: '8+ Years',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Siddharth Mehta',
    email: 'siddharth@phoenixinfotainment.com',
    role: 'TEAM_MEMBER',
    designation: 'Vice President - Corporate Galas & Summits',
    department: 'Leadership',
    bio: 'Overseeing Fortune 500 leadership summits, product launch spectacles, and brand activation campaigns nationwide.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    experience: '11+ Years',
    linkedinUrl: 'https://linkedin.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Priya Joshi',
    email: 'priya@phoenixinfotainment.com',
    role: 'TEAM_MEMBER',
    designation: 'Head of Media Communications & PR',
    department: 'PR & Marketing',
    bio: 'Managing media partnerships, press releases, broadcast coverage, and brand positioning across major publications.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    experience: '7+ Years',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const teamApi = {
  getMembers: async (): Promise<TeamMember[]> => {
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
          image: u.image || fallbackTeamMembers[idx % fallbackTeamMembers.length].image,
          isActive: u.isActive !== false,
          createdAt: u.createdAt || new Date().toISOString(),
        }));
        return [...mapped, ...fallbackTeamMembers.slice(mapped.length)];
      }
      return fallbackTeamMembers;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback team dataset:', error);
      return fallbackTeamMembers;
    }
  },

  getMember: async (id: string | number): Promise<TeamMember | null> => {
    const members = await teamApi.getMembers();
    return members.find(m => m.id.toString() === id.toString()) || null;
  },

  createMember: async (data: Partial<TeamMember>): Promise<TeamMember> => {
    try {
      const payload = {
        name: data.name,
        email: data.email || `team-${Date.now()}@phoenixinfotainment.com`,
        phone: data.phone,
        role: data.role || 'TEAM_MEMBER',
        isActive: data.isActive ?? true,
      };
      const response = await api.post<ApiResponse<any>>('/api/users', payload);
      return response.data?.data || (data as TeamMember);
    } catch (error) {
      console.error('Error creating team member user:', error);
      throw error;
    }
  },

  updateMember: async (id: string | number, data: Partial<TeamMember>): Promise<TeamMember | null> => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        isActive: data.isActive,
      };
      const response = await api.put<ApiResponse<any>>(`/api/users/${id}`, payload);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating team member user ${id}:`, error);
      return null;
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
