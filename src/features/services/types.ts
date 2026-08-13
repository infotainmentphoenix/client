export interface ServicePackage {
  id: number;
  serviceId: number;
  name: string;
  description: string;
  priceLabel?: string;
  priceValue?: number;
  currency: string;
  features: string[];
  isPopular: boolean;
  sortOrder: number;
  isActive: boolean;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  icon?: string;
  coverImage?: string;
  coverImageFieldId?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogImageFieldId?: string;
  sortOrder: number;
  featured: boolean;
  isActive: boolean;
  packages?: ServicePackage[];
  faqs?: Array<{ id: number; question: string; answer: string }>;
  events?: Array<{ id: number; title: string; slug: string; coverImage?: string; city?: string }>;
  createdAt: string;
  updatedAt: string;
}
