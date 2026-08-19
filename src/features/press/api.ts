import { api } from '@/lib/api/client';
import { PressLogo, PressRelease, BlogPost } from './types';

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
      return [];
    } catch (error) {
      return [];
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
      return [];
    } catch (error) {
      return [];
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
