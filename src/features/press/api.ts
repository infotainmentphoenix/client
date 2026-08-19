import { api } from '@/lib/api/client';
import { PressLogo, PressRelease } from './types';

export const fallbackPressLogos: PressLogo[] = [
  { id: 1, name: 'Times of India', logoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80', website: 'https://timesofindia.indiatimes.com', type: 'MEDIA_PARTNER', sortOrder: 1, isActive: true },
  { id: 2, name: 'Hindustan Times', logoUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80', website: 'https://hindustantimes.com', type: 'MEDIA_PARTNER', sortOrder: 2, isActive: true },
  { id: 3, name: 'The Economic Times', logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80', website: 'https://economictimes.indiatimes.com', type: 'MEDIA_PARTNER', sortOrder: 3, isActive: true },
  { id: 4, name: 'Bollywood Hungama', logoUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80', website: 'https://bollywoodhungama.com', type: 'MEDIA_PARTNER', sortOrder: 4, isActive: true },
  { id: 5, name: 'Eventfaqs India', logoUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80', website: 'https://eventfaqs.com', type: 'MEDIA_PARTNER', sortOrder: 5, isActive: true },
];

export const fallbackPressReleases: PressRelease[] = [
  {
    id: 1,
    title: 'Phoenix Infotainment Redefines Mega Live Concert Production in India',
    outlet: 'Times of India - Entertainment',
    date: 'July 15, 2026',
    category: 'Concert & Festival',
    summary: 'Phoenix Infotainment set a benchmark in live entertainment execution with a 30,000+ attendee stadium concert featuring top playback icons and immersive 3D stage mapping.',
    featuredImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    badge: 'Cover Story',
  },
  {
    id: 2,
    title: 'How Phoenix Infotainment Elevated Corporate Galas for Global Fortune 500 Brands',
    outlet: 'Economic Times',
    date: 'June 02, 2026',
    category: 'Corporate Excellence',
    summary: 'Exploring how Phoenix Infotainment seamlessly blends high-tech AV production, VIP celebrity artist management, and custom thematic staging for top MNC leadership summits.',
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    badge: 'Industry Spotlight',
  },
  {
    id: 3,
    title: 'Destination Weddings Go High-Tech: The Royal Marriages Crafted by Phoenix',
    outlet: 'Hindustan Times Luxury',
    date: 'April 20, 2026',
    category: 'Royal Weddings',
    summary: 'A deep dive into destination wedding experiences in Udaipur & Goa engineered by Phoenix Infotainment featuring custom aerial drone light shows and celebrity guest performances.',
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusive',
  },
  {
    id: 4,
    title: 'Phoenix Infotainment Announces Strategic Expansion into Middle East & SEA Markets',
    outlet: 'Eventfaqs Business',
    date: 'March 10, 2026',
    category: 'Global Expansion',
    summary: 'Phoenix Infotainment officially launches its international ops division in Dubai, bringing Indian entertainment concepts and celebrity artist management to global venues.',
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    badge: 'Press Release',
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const pressApi = {
  getLogos: async (ignoreFallback: boolean = false): Promise<PressLogo[]> => {
    try {
      const response = await api.get<ApiResponse<PressLogo[]>>('/api/client-logos');
      const items = response.data?.data;
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
      return ignoreFallback ? [] : fallbackPressLogos;
    } catch (error) {
      return ignoreFallback ? [] : fallbackPressLogos;
    }
  },

  getPressReleases: async (): Promise<PressRelease[]> => {
    return Promise.resolve(fallbackPressReleases);
  },

  getLogo: async (id: string | number, ignoreFallback: boolean = false): Promise<PressLogo | null> => {
    try {
      const response = await api.get<ApiResponse<PressLogo>>(`/api/client-logos/${id}`);
      return response.data?.data || null;
    } catch (error) {
      const logos = await pressApi.getLogos(ignoreFallback);
      return logos.find(l => l.id.toString() === id.toString()) || null;
    }
  },

  createLogo: async (data: Partial<PressLogo> | FormData): Promise<PressLogo | null> => {
    try {
      const response = await api.post<ApiResponse<PressLogo>>('/api/client-logos', data);
      return response.data?.data || null;
    } catch (error: any) {
      console.error('Error creating partner logo:', error);
      throw error;
    }
  },

  updateLogo: async (id: string | number, data: Partial<PressLogo> | FormData): Promise<PressLogo | null> => {
    try {
      const response = await api.put<ApiResponse<PressLogo>>(`/api/client-logos/${id}`, data);
      return response.data?.data || null;
    } catch (error: any) {
      console.error('Error updating partner logo:', error);
      throw error;
    }
  },

  deleteLogo: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/client-logos/${id}`);
      return true;
    } catch (error: any) {
      console.error('Error deleting partner logo:', error);
      return false;
    }
  },
};
