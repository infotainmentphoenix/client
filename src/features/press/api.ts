import { api } from '@/lib/api/client';
import { PressLogo, PressRelease, BlogPost } from './types';

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
    slug: 'phoenix-infotainment-redefines-mega-live-concert-production-in-india',
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
    slug: 'how-phoenix-infotainment-elevated-corporate-galas-for-global-fortune-500-brands',
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
    slug: 'destination-weddings-go-high-tech-the-royal-marriages-crafted-by-phoenix',
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
    slug: 'phoenix-infotainment-announces-strategic-expansion-into-middle-east-and-sea-markets',
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

export interface PaginatedBlogsResponse {
  items: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
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
    try {
      const response = await api.get<ApiResponse<PaginatedBlogsResponse>>('/api/blogs?status=PUBLISHED&limit=100');
      const items = response.data?.data?.items || [];
      if (items.length > 0) {
        return items.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          outlet: 'Press Release',
          date: post.publishedAt 
            ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          category: 'Company Update',
          summary: post.excerpt || post.content.substring(0, 160) + '...',
          featuredImage: post.featuredImage || undefined,
          badge: post.youtubeUrl ? 'Video' : 'Official',
        }));
      }
      return fallbackPressReleases;
    } catch (error) {
      return fallbackPressReleases;
    }
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

  // BLOG POST CRUD ENDPOINTS
  getBlogPosts: async (params?: { 
    page?: number; 
    limit?: number; 
    search?: string; 
    status?: string; 
    sortBy?: string; 
    sortOrder?: string;
  }): Promise<PaginatedBlogsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== '') {
            queryParams.append(key, val.toString());
          }
        });
      }
      const response = await api.get<ApiResponse<PaginatedBlogsResponse>>(`/api/blogs?${queryParams.toString()}`);
      return response.data?.data || { items: [], pagination: { page: 1, limit: 10, totalItems: 0, totalPages: 1, hasNextPage: false, hasPrevPage: false } };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { items: [], pagination: { page: 1, limit: 10, totalItems: 0, totalPages: 1, hasNextPage: false, hasPrevPage: false } };
    }
  },

  getBlogPostById: async (id: string | number): Promise<BlogPost | null> => {
    try {
      const response = await api.get<ApiResponse<BlogPost>>(`/api/blogs/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error fetching blog post ${id}:`, error);
      return null;
    }
  },

  createBlogPost: async (data: FormData | Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await api.post<ApiResponse<BlogPost>>('/api/blogs', data);
      return response.data?.data || null;
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  updateBlogPost: async (id: string | number, data: FormData | Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await api.patch<ApiResponse<BlogPost>>(`/api/blogs/${id}`, data);
      return response.data?.data || null;
    } catch (error: any) {
      console.error(`Error updating blog post ${id}:`, error);
      throw error;
    }
  },

  deleteBlogPost: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/blogs/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting blog post ${id}:`, error);
      return false;
    }
  },
};
