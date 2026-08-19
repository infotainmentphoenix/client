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
  slug?: string;
  outlet: string;
  outletLogo?: string;
  date: string;
  category: string;
  summary: string;
  fullStoryUrl?: string;
  featuredImage?: string;
  badge?: string;
}

export type BlogPostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  youtubeUrl?: string | null;
  featuredImage?: string | null;
  featuredImageFieldId?: string | null;
  status: BlogPostStatus;
  publishedAt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  createdBy?: number | null;
  updatedBy?: number | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
  updatedUser?: {
    id: number;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}
