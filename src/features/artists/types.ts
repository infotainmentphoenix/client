export interface ArtistCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
}

export type ArtistAvailability = 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE' | 'ON_REQUEST';

export interface Artist {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  bio?: string;
  shortBio?: string;
  genre: string[];
  languages: string[];
  basedIn?: string;
  experience?: string;
  priceRange?: string;
  priceMinValue?: number;
  priceMaxValue?: number;
  availability: ArtistAvailability;
  bookingNote?: string;
  profileImage?: string;
  coverImage?: string;
  videoShowreel?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  websiteUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
  verified: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  category?: ArtistCategory;
}

export interface ArtistFormData extends Omit<Artist, 'id' | 'createdAt' | 'updatedAt' | 'category' | 'slug'> {
  // Add specific frontend form fields if needed
}
