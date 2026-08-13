import { api } from '@/lib/api/client';
import { Service } from './types';

export const fallbackServices: Service[] = [
  {
    id: 1,
    name: 'Artist & Celebrity Management',
    slug: 'artist-management',
    tagline: 'Book Top Bollywood Stars, Singers, DJs & Performers',
    description: 'Direct booking and end-to-end artist logistics for Bollywood A-listers, playback singers, international DJs, stand-up comedians, and anchors for high-profile events.',
    icon: 'Star',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 1,
    featured: true,
    isActive: true,
    packages: [
      {
        id: 101,
        serviceId: 1,
        name: 'Silver Artist Booking',
        description: 'Ideal for private parties, anniversaries, and curated corporate dinners.',
        priceLabel: 'Starting from ₹1.5 Lakhs',
        priceValue: 150000,
        currency: 'INR',
        features: ['1 Regional Artist / Singer / Anchor', 'Standard Rider Setup', 'Artist Hospitality & Escort', 'Dedicated On-Site Manager'],
        isPopular: false,
        sortOrder: 1,
        isActive: true,
      },
      {
        id: 102,
        serviceId: 1,
        name: 'Gold Star Lineup',
        description: 'Perfect for mid-scale concerts, annual corporate galas, and weddings.',
        priceLabel: 'Starting from ₹5 Lakhs',
        priceValue: 500000,
        currency: 'INR',
        features: ['National Playback Singer or Top DJ', 'Complete Tech Rider Compliance', 'Green Room & VIP Logistics', 'Sound & Stage Coordination'],
        isPopular: true,
        sortOrder: 2,
        isActive: true,
      },
      {
        id: 103,
        serviceId: 1,
        name: 'Platinum Celebrity Showcase',
        description: 'For mega stadium shows, royal weddings, and flagship corporate summits.',
        priceLabel: 'Custom Quote',
        priceValue: 2000000,
        currency: 'INR',
        features: ['A-List Bollywood Celebrity / Superstar Band', 'Charter Flight & Luxury Transport', 'Full Security Detail & Bouncers', 'PR & Media Coverage Support'],
        isPopular: false,
        sortOrder: 3,
        isActive: true,
      },
    ],
    faqs: [
      { id: 1, question: 'How do you handle celebrity artist riders?', answer: 'We manage full rider compliance including sound specs, green room setup, travel, and security.' },
      { id: 2, question: 'Can we request last-minute replacement if an artist is unwell?', answer: 'Yes, we maintain priority contracts with alternate top performers to ensure seamless event delivery.' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Corporate Event Management',
    slug: 'corporate-events',
    tagline: 'Flawless Summits, Galas & Product Launches',
    description: 'Transforming corporate visions into extraordinary live experiences with high-impact stage design, seamless AV integration, keynote coordination, and VIP hospitality.',
    icon: 'Briefcase',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 2,
    featured: true,
    isActive: true,
    packages: [
      {
        id: 201,
        serviceId: 2,
        name: 'Standard Executive Summit',
        description: 'Tailored for annual general meetings and partner conferences.',
        priceLabel: 'Starting from ₹3 Lakhs',
        priceValue: 300000,
        currency: 'INR',
        features: ['Venue Selection & Setup', 'HD Projection & Audio', 'Registration Desk Management', 'Delegate Collaterals'],
        isPopular: false,
        sortOrder: 1,
        isActive: true,
      },
      {
        id: 202,
        serviceId: 2,
        name: 'Grand Corporate Gala',
        description: 'Comprehensive solution for award nights and milestone celebrations.',
        priceLabel: 'Starting from ₹8 Lakhs',
        priceValue: 800000,
        currency: 'INR',
        features: ['Immersive 3D Stage Architecture', 'Celebrity Host / Emcee', 'Custom Award Trophies & Content', 'Gourmet Catering Coordination'],
        isPopular: true,
        sortOrder: 2,
        isActive: true,
      },
    ],
    faqs: [
      { id: 3, question: 'Do you offer hybrid or live-streaming corporate setups?', answer: 'Yes, we provide 4K multi-camera live streaming across Zoom, YouTube, or private enterprise portals.' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Live Concerts & Festivals',
    slug: 'live-concerts',
    tagline: 'Stadium-Scale Sound, Lights & Production Execution',
    description: 'Engineering electrifying music festivals and large-scale public concerts with Line Array acoustics, intelligent LED lighting, security planning, and venue management.',
    icon: 'Music',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 3,
    featured: true,
    isActive: true,
    packages: [
      {
        id: 301,
        serviceId: 3,
        name: 'Festival Production Package',
        description: 'Complete technical and venue infrastructure for multi-thousand audiences.',
        priceLabel: 'Custom Quote',
        priceValue: 1500000,
        currency: 'INR',
        features: ['Staging & Line Array Acoustics', 'Pyro & Cold Spark FX', 'Crowd Management & Ticketing Gate', 'Emergency Medical & Fire Safety'],
        isPopular: true,
        sortOrder: 1,
        isActive: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Luxury Wedding Planning',
    slug: 'luxury-weddings',
    tagline: 'Magical Destination Weddings & Unforgettable Receptions',
    description: 'Crafting breathtaking wedding stories with royal decor themes, Sangeet choreography, celebrity performances, guest hospitality, and thematic pre-wedding galas.',
    icon: 'Heart',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 4,
    featured: true,
    isActive: true,
    packages: [
      {
        id: 401,
        serviceId: 4,
        name: 'Royal Destination Wedding',
        description: 'Turn-key wedding management for palatial and beach destinations.',
        priceLabel: 'Starting from ₹12 Lakhs',
        priceValue: 1200000,
        currency: 'INR',
        features: ['Theme Decor & Floral Styling', 'Sangeet Production & Artist Show', 'Guest Transport & Hospitality Desk', 'Traditional Baraat & DJ Setup'],
        isPopular: true,
        sortOrder: 1,
        isActive: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Sound, Stage & AV Production',
    slug: 'sound-stage-production',
    tagline: 'State-of-the-Art Technical Equipment & Lighting Infrastructure',
    description: 'Providing cutting-edge audiovisual systems, trussing, LED walls, laser shows, atmospheric effects, and professional sound engineers for any venue size.',
    icon: 'Radio',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 5,
    featured: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Brand Activations & Mall Shows',
    slug: 'brand-activations',
    tagline: 'Experiential Marketing & High-Engagement Public Displays',
    description: 'Captivating audience engagement through interactive pop-up booths, flash mobs, influencer activations, and retail launch spectacles across major metros.',
    icon: 'Sparkles',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 6,
    featured: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const serviceApi = {
  getServices: async (): Promise<Service[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/services');
      const items = response.data?.data?.items || response.data?.data || response.data;
      if (Array.isArray(items)) {
        return items.length > 0 ? items : fallbackServices;
      }
      return fallbackServices;
    } catch (error) {
      console.warn('Backend API unavailable, using database fallback services:', error);
      return fallbackServices;
    }
  },

  getServiceBySlug: async (slug: string): Promise<Service | null> => {
    try {
      const response = await api.get<ApiResponse<any>>(`/api/services/${slug}`);
      const item = response.data?.data?.item || response.data?.data?.service || response.data?.data;
      if (item && (item.slug || item.id)) {
        return item;
      }
      const found = fallbackServices.find(s => s.slug === slug || s.id.toString() === slug);
      return found || fallbackServices[0];
    } catch (error) {
      console.warn(`Backend API unavailable for service slug ${slug}, using database fallback:`, error);
      const found = fallbackServices.find(s => s.slug === slug || s.id.toString() === slug);
      return found || fallbackServices[0];
    }
  },

  getService: async (id: string | number): Promise<Service | null> => {
    const services = await serviceApi.getServices();
    return services.find(s => s.id.toString() === id.toString() || s.slug === id) || null;
  },

  createService: async (data: Partial<Service>): Promise<Service> => {
    try {
      const response = await api.post<ApiResponse<Service>>('/api/services', data);
      return response.data?.data || (data as Service);
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  updateService: async (id: string | number, data: Partial<Service>): Promise<Service | null> => {
    try {
      const response = await api.patch<ApiResponse<Service>>(`/api/services/${id}`, data);
      return response.data?.data || null;
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      return null;
    }
  },

  deleteService: async (id: string | number): Promise<boolean> => {
    try {
      await api.delete(`/api/services/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      return false;
    }
  },
};
