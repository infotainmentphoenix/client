export interface Testimonial {
  id: number;
  eventId?: number;
  eventTitle: string;
  clientName: string;
  designation?: string;
  company?: string;
  clientQuote: string;
  rating?: number;
  category: 'Corporate' | 'Weddings' | 'Concerts' | 'Celebrities';
  avatarUrl?: string;
  coverImage?: string;
  videoUrl?: string; // Optional YouTube review video
  createdAt?: string;
}
