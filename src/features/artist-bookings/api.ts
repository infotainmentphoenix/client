import { api } from '@/lib/api/client';
import { ArtistBooking } from './types';

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
          artistImage: art.profileImage || '',
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
        return mapped;
      }
      return [];
    } catch (error) {
      console.error('Backend API unavailable:', error);
      return [];
    }
  },
};
