export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  type: string;
  updatedAt: string;
}

export type LogoType = 'CLIENT' | 'SPONSOR' | 'PARTNER' | 'MEDIA_PARTNER';

export interface ClientLogo {
  id: number;
  name: string;
  logoUrl: string;
  website?: string;
  type: LogoType;
  sortOrder: number;
  isActive: boolean;
}

export type SocialPlatform = 'INSTAGRAM' | 'YOUTUBE' | 'FACEBOOK' | 'LINKEDIN' | 'TWITTER';

export interface SocialLink {
  id: number;
  platform: SocialPlatform;
  url: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
}
