import { api } from '@/lib/api/client';
import { GalleryMediaItem } from './types';

export const fallbackGalleryItems: GalleryMediaItem[] = [
  {
    id: 1,
    title: 'Live Stadium Music Concert',
    category: 'Concerts',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    location: 'Mumbai Arena, MH',
    date: 'Jan 2026',
    description: '30,000+ enthusiastic fans experiencing cutting-edge sound & laser stage design.',
    aspectRatio: 'landscape',
  },
  {
    id: 2,
    title: 'Bollywood Superstar Live Showreel',
    category: 'Celebrity Shows',
    type: 'VIDEO',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample video player URL
    location: 'Sahar Star, Mumbai',
    date: 'Dec 2025',
    description: 'Exclusive celebrity stage performance managed seamlessly by Phoenix Infotainment.',
    aspectRatio: 'portrait',
  },
  {
    id: 3,
    title: 'Royal Udaipur Destination Wedding',
    category: 'Weddings',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    location: 'City Palace, Udaipur',
    date: 'Nov 2025',
    description: 'Extravagant 3-day royal wedding palace setup with custom floral architecture.',
    aspectRatio: 'square',
  },
  {
    id: 4,
    title: 'Fortune 500 Leadership Summit & Gala',
    category: 'Corporate',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    location: 'Grand Hyatt, Bengaluru',
    date: 'Oct 2025',
    description: 'High-tech corporate gala featuring 3D LED wall projection mapping.',
    aspectRatio: 'landscape',
  },
  {
    id: 5,
    title: 'Line Array Sound & Laser Night Showreel',
    category: 'Production & Lighting',
    type: 'VIDEO',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    location: 'Pune Stadium Grounds',
    date: 'Sep 2025',
    description: 'State-of-the-art concert lighting, intelligent moving heads, and pyro FX.',
    aspectRatio: 'landscape',
  },
  {
    id: 6,
    title: 'Beachside Sangeet Party & Live Band',
    category: 'Weddings',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    location: 'W Hotel, Goa',
    date: 'Aug 2025',
    description: 'Breathtaking beachside sunset sangeet celebration with live fusion music.',
    aspectRatio: 'portrait',
  },
  {
    id: 7,
    title: 'National Tech Brand Product Launch',
    category: 'Corporate',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    location: 'Aerocity, New Delhi',
    date: 'Jul 2025',
    description: 'Keynote product reveal with curved LED backdrop and live broadcast feed.',
    aspectRatio: 'landscape',
  },
  {
    id: 8,
    title: 'Electronic Music Festival & Pyro Fireworks',
    category: 'Concerts',
    type: 'VIDEO',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    location: 'Sunburn Arena, Goa',
    date: 'Jun 2025',
    description: 'Electrifying music festival night with laser cannons and synchronized pyro.',
    aspectRatio: 'square',
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const galleryApi = {
  getItems: async (): Promise<GalleryMediaItem[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/carousels');
      const carousels = response.data?.data?.items || response.data?.data;
      if (Array.isArray(carousels) && carousels.length > 0) {
        // Map carousels into GalleryMediaItem
        const mapped: GalleryMediaItem[] = carousels.map((c: any, index: number) => ({
          id: c.id || index + 10,
          title: c.title || 'Phoenix Event Showcase',
          category: 'Concerts',
          type: 'IMAGE',
          imageUrl: c.imageUrl,
          description: c.subtitle || 'Unforgettable live event experience created by Phoenix Infotainment.',
          aspectRatio: index % 3 === 0 ? 'landscape' : index % 3 === 1 ? 'portrait' : 'square',
        }));
        return mapped;
      }
      return fallbackGalleryItems;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback gallery items:', error);
      return fallbackGalleryItems;
    }
  },

  getItem: async (id: string | number): Promise<GalleryMediaItem | null> => {
    const items = await galleryApi.getItems();
    return items.find(i => i.id.toString() === id.toString()) || null;
  },

  createItem: async (data: Partial<GalleryMediaItem>): Promise<GalleryMediaItem> => {
    try {
      const payload = {
        title: data.title,
        subtitle: data.description,
        imageUrl: data.imageUrl,
        linkUrl: data.videoUrl,
      };
      const response = await api.post<ApiResponse<any>>('/api/carousels', payload);
      return response.data?.data || (data as GalleryMediaItem);
    } catch (error) {
      console.error('Error creating gallery carousel item:', error);
      throw error;
    }
  },

  updateItem: async (id: string | number, data: Partial<GalleryMediaItem>): Promise<GalleryMediaItem | null> => {
    try {
      const payload = {
        title: data.title,
        subtitle: data.description,
        imageUrl: data.imageUrl,
        linkUrl: data.videoUrl,
      };
      const response = await api.patch<ApiResponse<any>>(`/api/carousels/${id}`, payload);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating gallery item ${id}:`, error);
      return null;
    }
  },

  deleteItem: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/carousels/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting gallery item ${id}:`, error);
      return false;
    }
  },
};
