import { api } from '@/lib/api/client';
import { Consultation } from './types';

export const fallbackConsultations: Consultation[] = [
  {
    id: 501,
    title: 'Royal Udaipur Wedding Decor & Artist Finalization',
    eventType: 'Luxury Destination Wedding',
    date: '2026-11-14',
    timeSlot: '03:00 PM - 04:00 PM IST',
    mode: 'VIRTUAL_MEET',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    consultantName: 'Vikramaditya Shinde',
    consultantRole: 'Managing Director & Lead Producer',
    consultantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'SCHEDULED',
    agenda: '1. Review floral stage design 3D renders. 2. Confirm playback singer timing & rider compliance. 3. Finalize guest hospitality airport transfers.',
    notes: '3D CAD renders will be shared via screen share during the call.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 502,
    title: 'Annual Corporate Gala Production & Sound Tech Specs',
    eventType: 'Corporate Gala & Leadership Summit',
    date: '2026-11-18',
    timeSlot: '11:30 AM - 12:30 PM IST',
    mode: 'IN_PERSON',
    location: 'Phoenix BKC Corporate Suite, BKC, Mumbai',
    consultantName: 'Siddharth Mehta',
    consultantRole: 'VP Corporate Operations',
    consultantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    status: 'SCHEDULED',
    agenda: '1. Review LED wall curved truss architecture. 2. Confirm keynote speaker AV & live stream broadcast setup.',
    notes: 'Please bring corporate branding guideline documents.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 503,
    title: 'Stadium Music Festival Security & Venue Planning',
    eventType: 'Mega Music Concert',
    date: '2026-10-05',
    timeSlot: '04:00 PM - 05:00 PM IST',
    mode: 'VIRTUAL_MEET',
    meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
    consultantName: 'Rajesh Kulkarni',
    consultantRole: 'Chief Sound & Technical Engineer',
    consultantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'COMPLETED',
    agenda: 'Line Array acoustics calibration & police permission roadmap review.',
    notes: 'All permissions approved. Sound test completed successfully.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 504,
    title: 'Celebrity Host Booking & Anchor Alignment Call',
    eventType: 'Awards Ceremony',
    date: '2026-12-01',
    timeSlot: '02:00 PM - 02:30 PM IST',
    mode: 'PHONE_CALL',
    consultantName: 'Ananya Deshmukh',
    consultantRole: 'Head of Celebrity Curation',
    consultantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    status: 'RESCHEDULED',
    agenda: 'Align anchor script and celebrity red carpet timing.',
    notes: 'Rescheduled to Dec 03 upon client request.',
    createdAt: new Date().toISOString(),
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const consultationApi = {
  getConsultations: async (): Promise<Consultation[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/users');
      const users = response.data?.data;
      if (Array.isArray(users) && users.length > 0) {
        return fallbackConsultations;
      }
      return fallbackConsultations;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback consultations dataset:', error);
      return fallbackConsultations;
    }
  },
};
