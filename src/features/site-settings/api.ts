import { api } from '@/lib/api/client';
import { SiteSetting, ClientLogo, SocialLink } from './types';

export const siteSettingsApi = {
  
  getSiteSettings: async (): Promise<Record<string, string>> => {
    const res = await api.get<any>('/api/site-settings');
    return res.data.data || {};
  },
  
  bulkUpsertSettings: async (settings: { key: string; value: string; type?: string }[]): Promise<Record<string, string>> => {
    const res = await api.post<any>('/api/site-settings/bulk', { settings });
    return res.data.data;
  },

  
  getClientLogos: async (): Promise<ClientLogo[]> => {
    const res = await api.get<any>('/api/client-logos');
    return res.data.data || [];
  },

  createClientLogo: async (data: FormData): Promise<ClientLogo> => {
    const res = await api.post<any>('/api/client-logos', data);
    return res.data?.data;
  },

  deleteClientLogo: async (id: number): Promise<void> => {
    await api.delete(`/api/client-logos/${id}`);
  },

  
  getSocialLinks: async (): Promise<{ data: SocialLink[], meta: any }> => {
    const res = await api.get<any>('/api/social-links/getAllSocialLinks');
    
    const items = res.data?.data?.items || [];
    const pagination = res.data?.data?.pagination || {};
    return { data: items, meta: pagination };
  },

  createSocialLink: async (data: FormData | any): Promise<SocialLink> => {
    const res = await api.post<any>('/api/social-links/create', data);
    return res.data?.data;
  },

  deleteSocialLink: async (id: number): Promise<void> => {
    await api.delete(`/api/social-links/delete/${id}`);
  }
};
