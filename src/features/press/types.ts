export type LogoType = 'CLIENT' | 'SPONSOR' | 'PARTNER' | 'MEDIA_PARTNER';

export interface PressLogo {
  id: number;
  name: string;
  logoUrl: string;
  website?: string;
  type: LogoType;
  sortOrder: number;
  isActive: boolean;
}

export interface PressRelease {
  id: number;
  title: string;
  outlet: string;
  outletLogo?: string;
  date: string;
  category: string;
  summary: string;
  fullStoryUrl?: string;
  featuredImage?: string;
  badge?: string;
}
