import { api } from '@/lib/api/client';
import { ArtistBooking } from './types';

export const fallbackBookings: ArtistBooking[] = [
  {
    id: 1001,
    artistId: 1,
    artistName: 'Armaan Malik',
    artistCategory: 'Bollywood Playback Singer',
    artistImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    eventType: 'Royal Wedding Sangeet Night',
    eventDate: '2026-11-20',
    venue: 'City Palace Grounds',
    city: 'Udaipur',
    contractValue: 1200000,
    currency: 'INR',
    depositPaid: true,
    status: 'CONFIRMED',
    coordinatorName: 'Ananya Deshmukh (Lead Curator)',
    coordinatorPhone: '+91 98765 11223',
    techRiderCompliant: true,
    greenRoomRiderCompliant: true,
    contractUrl: '#',
    notes: '2-hour live performance with 6-piece band. Flight charter & luxury suite confirmed.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 1002,
    artistId: 2,
    artistName: 'DJ Chetas',
    artistCategory: 'EDM & Bollywood DJ',
    artistImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    eventType: 'Annual Fortune 500 Corporate Gala',
    eventDate: '2026-12-05',
    venue: 'St. Regis Ballrooms',
    city: 'Mumbai',
    contractValue: 650000,
    currency: 'INR',
    depositPaid: false,
    status: 'PENDING_DEPOSIT',
    coordinatorName: 'Siddharth Mehta (VP Ops)',
    coordinatorPhone: '+91 98765 44332',
    techRiderCompliant: true,
    greenRoomRiderCompliant: true,
    contractUrl: '#',
    notes: 'Pioneer DJ setup & 4K LED backdrop requested. Invoice generated.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 1003,
    artistId: 3,
    artistName: 'Zakir Khan',
    artistCategory: 'Stand-Up Comedian',
    artistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    eventType: 'National Tech Leadership Summit',
    eventDate: '2026-09-15',
    venue: 'Aerocity Convention Center',
    city: 'New Delhi',
    contractValue: 850000,
    currency: 'INR',
    depositPaid: true,
    status: 'PROPOSAL_SENT',
    coordinatorName: 'Vikramaditya Shinde',
    coordinatorPhone: '+91 98765 00001',
    techRiderCompliant: true,
    greenRoomRiderCompliant: false,
    contractUrl: '#',
    notes: 'Proposal sent to client. Awaiting final green room hospitality approval.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 1004,
    artistId: 4,
    artistName: 'Sunidhi Chauhan',
    artistCategory: 'Playback Singer & Icon',
    artistImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    eventType: 'Stadium Music Festival',
    eventDate: '2025-12-18',
    venue: 'DY Patil Stadium',
    city: 'Navi Mumbai',
    contractValue: 2500000,
    currency: 'INR',
    depositPaid: true,
    status: 'COMPLETED',
    coordinatorName: 'Rajesh Kulkarni (Technical Lead)',
    coordinatorPhone: '+91 98765 99887',
    techRiderCompliant: true,
    greenRoomRiderCompliant: true,
    contractUrl: '#',
    notes: '35,000+ audience. Flawless 90-minute headline performance.',
    createdAt: new Date().toISOString(),
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const bookingApi = {
  getClientBookings: async (): Promise<ArtistBooking[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/artist');
      const artists = response.data?.data?.items || response.data?.data;
      if (Array.isArray(artists) && artists.length > 0) {
        
        const mapped: ArtistBooking[] = artists.slice(0, 3).map((art: any, idx: number) => ({
          id: 200 + idx,
          artistId: art.id,
          artistName: art.name,
          artistCategory: art.category?.name || 'Live Performer',
          artistImage: art.profileImage || fallbackBookings[idx % fallbackBookings.length].artistImage,
          eventType: 'Client Event Show',
          eventDate: art.eventDate || '2026-11-25',
          venue: art.basedIn || 'Grand Palace',
          city: art.basedIn || 'Mumbai',
          contractValue: art.priceMinValue || 500000,
          currency: 'INR',
          depositPaid: true,
          status: 'CONFIRMED',
          coordinatorName: 'Phoenix Curator Team',
          coordinatorPhone: '+91 98765 43210',
          techRiderCompliant: true,
          greenRoomRiderCompliant: true,
          notes: art.bio || 'Direct celebrity booking via Phoenix Infotainment.',
          createdAt: new Date().toISOString(),
        }));
        return [...mapped, ...fallbackBookings];
      }
      return fallbackBookings;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback client bookings:', error);
      return fallbackBookings;
    }
  },
};
