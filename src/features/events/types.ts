export type EventType = 
  | 'CORPORATE' 
  | 'WEDDING' 
  | 'ENTERTAINMENT' 
  | 'FESTIVAL' 
  | 'CONCERT' 
  | 'PRIVATE_PARTY' 
  | 'AWARDS_CEREMONY' 
  | 'PRODUCT_LAUNCH' 
  | 'OTHER';

export interface EventImage {
  id: number;
  eventId: number;
  imageUrl: string;
  fieldId?: string;
  sortOrder: number;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  eventType?: EventType;
  description?: string;
  brief?: string;
  outcome?: string;
  eventDate?: string;
  endDate?: string;
  venue?: string;
  city?: string;
  state?: string;
  attendees?: number;
  clientName?: string;
  clientQuote?: string;
  coverImage?: string;
  coverImageFieldId?: string;
  videoUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  featured: boolean;
  sortOrder: number;
  shortDesc?: string;
  date?: string;
  attendeeCount?: number;
  location?: string;
  gallery?: string[];
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  images?: EventImage[];
  service?: any;
}
