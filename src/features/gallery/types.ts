export type GalleryMediaType = 'IMAGE' | 'VIDEO';

export interface GalleryMediaItem {
  id: number;
  title: string;
  category: 'Concerts' | 'Corporate' | 'Weddings' | 'Celebrity Shows' | 'Production & Lighting';
  type: GalleryMediaType;
  imageUrl: string;
  videoUrl?: string; 
  location?: string;
  date?: string;
  description?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  subtitle?: string;
  linkUrl?: string;
  buttonText?: string;
  sortOrder?: number;
  isActive?: boolean;
  imageFieldId?: string;
}

export type CarouselItem = GalleryMediaItem;
