import { api } from '@/lib/api/client';
import { Testimonial } from './types';

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    eventId: 101,
    eventTitle: 'Annual Corporate Gala & Leadership Summit 2026',
    clientName: 'Rajiv Malhotra',
    designation: 'VP of Corporate Communications',
    company: 'Reliance Digital',
    clientQuote: 'Phoenix Infotainment executed our annual gala with sheer perfection. From managing celebrity playback singers to 3D stage mapping for 2,500 delegates, every detail was flawless.',
    rating: 5,
    category: 'Corporate',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    eventId: 102,
    eventTitle: 'Royal Udaipur Destination Wedding',
    clientName: 'Sunita & Vikram Singhania',
    designation: 'Host & Parents of the Bride',
    company: 'Singhania Group',
    clientQuote: 'Our daughter’s destination wedding in Udaipur was like a dream fairytale! The drone light show, floral decor, and seamless artist hospitality were praised by all 800 VIP guests.',
    rating: 5,
    category: 'Weddings',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    eventId: 103,
    eventTitle: 'Mega Stadium Music Festival',
    clientName: 'Armaan Malik',
    designation: 'Playback Singer & Performer',
    company: 'Bollywood Music Icon',
    clientQuote: 'Working with Phoenix Infotainment is always a delight for an artist. Their Line Array sound engineering, green room setup, and stage technical compliance are world-class.',
    rating: 5,
    category: 'Celebrities',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 4,
    eventId: 104,
    eventTitle: 'Tech Summit & Product Launch Spectacle',
    clientName: 'Karan Mehra',
    designation: 'CMO',
    company: 'TechCorp India',
    clientQuote: 'Phoenix brought an electric energy to our product launch. The curved LED walls, pyrotechnics, and live 4K stream reached over 500,000 online viewers seamlessly.',
    rating: 5,
    category: 'Corporate',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    eventId: 105,
    eventTitle: 'Sunburn Arena Goa Afterparty',
    clientName: 'DJ Nucleya',
    designation: 'EDM Producer & DJ',
    company: 'Live Musician',
    clientQuote: 'The crowd control, massive bass acoustic setup, and stage laser cannons were top notch. Phoenix Infotainment knows how to deliver a killer festival night!',
    rating: 5,
    category: 'Concerts',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const testimonialApi = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/event/getAllEvent');
      const events = response.data?.data?.items || response.data?.data;
      if (Array.isArray(events) && events.length > 0) {
        const mapped: Testimonial[] = events
          .filter((e: any) => e.clientQuote && e.clientName)
          .map((e: any) => ({
            id: e.id,
            eventId: e.id,
            eventTitle: e.title,
            clientName: e.clientName,
            clientQuote: e.clientQuote,
            designation: 'Client / Event Sponsor',
            category: 'Corporate',
            rating: 5,
            coverImage: e.coverImage,
            createdAt: e.createdAt,
          }));
        if (mapped.length > 0) return [...mapped, ...fallbackTestimonials];
      }
      return fallbackTestimonials;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback testimonials:', error);
      return fallbackTestimonials;
    }
  },

  getTestimonial: async (eventId: string | number): Promise<Testimonial | null> => {
    const list = await testimonialApi.getTestimonials();
    return list.find(t => (t.eventId || t.id).toString() === eventId.toString()) || null;
  },

  getAvailableEvents: async (): Promise<{ id: number; title: string; clientName: string }[]> => {
    const list = await testimonialApi.getTestimonials();
    return list.map(t => ({ id: t.eventId || t.id, title: t.eventTitle, clientName: t.clientName }));
  },

  saveTestimonial: async (eventId: string | number, data: Partial<Testimonial>): Promise<Testimonial> => {
    const newT: Testimonial = {
      id: Number(eventId) || Date.now(),
      eventId: Number(eventId) || Date.now(),
      eventTitle: data.eventTitle || 'Event',
      clientName: data.clientName || 'Client',
      clientQuote: data.clientQuote || '',
      designation: data.designation || 'Client',
      company: data.company || '',
      rating: data.rating || 5,
      category: data.category || 'Corporate',
      avatarUrl: data.avatarUrl || '',
      coverImage: data.coverImage || '',
    };
    return Promise.resolve(newT);
  },

  deleteTestimonial: async (eventId: string | number): Promise<boolean> => {
    return Promise.resolve(true);
  },
};
