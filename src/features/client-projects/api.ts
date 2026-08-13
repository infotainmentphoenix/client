import { api } from '@/lib/api/client';
import { ClientProject } from './types';

export const fallbackProjects: ClientProject[] = [
  {
    id: 1,
    slug: 'royal-udaipur-wedding',
    title: 'Royal Udaipur Destination Wedding Sangeet',
    eventType: 'Luxury Destination Wedding',
    eventDate: '2026-11-20',
    venue: 'City Palace Grounds',
    city: 'Udaipur, Rajasthan',
    budget: 2500000,
    progress: 85,
    status: 'IN_PROGRESS',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    leadProducer: 'Ananya Deshmukh',
    leadProducerPhone: '+91 98765 11223',
    notes: 'Stage trussing & floral architecture approved. Playback singer rider confirmed.',
    milestones: [
      { id: 1, title: 'Concept Design & Theme Finalization', dueDate: '2026-09-01', status: 'COMPLETED', notes: 'Theme approved by family.' },
      { id: 2, title: 'Celebrity Artist Booking & Rider Contract', dueDate: '2026-09-15', status: 'COMPLETED', notes: 'Armaan Malik & Band signed.' },
      { id: 3, title: 'Venue Licensing & Technical Staging', dueDate: '2026-10-10', status: 'COMPLETED', notes: 'Line Array & 3D LED Trussing ready.' },
      { id: 4, title: 'On-Site Sound Check & Rehearsals', dueDate: '2026-11-19', status: 'IN_PROGRESS', notes: 'Scheduled for 4:00 PM.' },
      { id: 5, title: 'Live Event Execution & Finale Pyro', dueDate: '2026-11-20', status: 'PENDING', notes: 'Main Show at 7:00 PM.' },
    ],
    documents: [
      { id: 101, title: 'Official_Event_Agreement_Signed.pdf', type: 'CONTRACT', size: '3.4 MB', downloadUrl: '#', updatedAt: '2026-09-16' },
      { id: 102, title: '3D_Stage_Architecture_Blueprint.pdf', type: 'BLUEPRINT', size: '12.1 MB', downloadUrl: '#', updatedAt: '2026-10-05' },
      { id: 103, title: 'Artist_Rider_Tech_Specs.pdf', type: 'RIDER', size: '1.8 MB', downloadUrl: '#', updatedAt: '2026-10-12' },
      { id: 104, title: 'Tax_Invoice_Milestone_2.pdf', type: 'INVOICE', size: '850 KB', downloadUrl: '#', updatedAt: '2026-10-20' },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    slug: 'corporate-gala-mumbai',
    title: 'Annual Fortune 500 Corporate Gala & Awards',
    eventType: 'Corporate Gala & Summit',
    eventDate: '2026-12-05',
    venue: 'St. Regis Ballrooms',
    city: 'Mumbai, Maharashtra',
    budget: 1500000,
    progress: 60,
    status: 'IN_PROGRESS',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    leadProducer: 'Siddharth Mehta',
    leadProducerPhone: '+91 98765 44332',
    notes: 'Keynote 4K broadcast feed and curved LED screen trussing under preparation.',
    milestones: [
      { id: 1, title: 'Delegate Registration Portal Setup', dueDate: '2026-10-01', status: 'COMPLETED', notes: 'Online registration live.' },
      { id: 2, title: 'AV & 4K Curved LED Wall Procurement', dueDate: '2026-10-25', status: 'COMPLETED', notes: 'Equipment secured.' },
      { id: 3, title: 'Celebrity Host & Emcee Scripting', dueDate: '2026-11-15', status: 'IN_PROGRESS', notes: 'Script drafting in progress.' },
      { id: 4, title: 'Gala Night Execution', dueDate: '2026-12-05', status: 'PENDING', notes: 'Main Show at 8:00 PM.' },
    ],
    documents: [
      { id: 201, title: 'Corporate_Gala_Master_Contract.pdf', type: 'CONTRACT', size: '4.2 MB', downloadUrl: '#', updatedAt: '2026-10-02' },
      { id: 202, title: 'AV_Curved_LED_Layout_Plan.pdf', type: 'BLUEPRINT', size: '8.5 MB', downloadUrl: '#', updatedAt: '2026-10-26' },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    slug: 'stadium-music-festival',
    title: 'Stadium Music Festival & Laser Night',
    eventType: 'Mega Music Concert',
    eventDate: '2025-12-18',
    venue: 'DY Patil Stadium',
    city: 'Navi Mumbai',
    budget: 8500000,
    progress: 100,
    status: 'COMPLETED',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    leadProducer: 'Rajesh Kulkarni',
    leadProducerPhone: '+91 98765 99887',
    notes: '35,000+ audience concert executed with zero technical hitches.',
    milestones: [
      { id: 1, title: 'Stadium Venue Booking & Licensing', dueDate: '2025-08-01', status: 'COMPLETED' },
      { id: 2, title: 'Line Array Acoustics & Pyro Setup', dueDate: '2025-11-20', status: 'COMPLETED' },
      { id: 3, title: 'Stadium Live Show Execution', dueDate: '2025-12-18', status: 'COMPLETED' },
    ],
    documents: [
      { id: 301, title: 'Stadium_Festival_Completion_Report.pdf', type: 'CONTRACT', size: '5.1 MB', downloadUrl: '#', updatedAt: '2025-12-20' },
    ],
    createdAt: new Date().toISOString(),
  },
];

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const projectApi = {
  getProjects: async (): Promise<ClientProject[]> => {
    try {
      const response = await api.get<ApiResponse<any>>('/api/event/getAllEvent');
      const events = response.data?.data?.items || response.data?.data;
      if (Array.isArray(events) && events.length > 0) {
        const mapped: ClientProject[] = events.map((e: any, idx: number) => ({
          id: e.id,
          slug: e.slug || `project-${e.id}`,
          title: e.title,
          eventType: e.eventType || 'Live Event Project',
          eventDate: e.eventDate || '2026-11-20',
          venue: e.venue || 'Grand Ballroom',
          city: e.city || 'Mumbai',
          budget: 2000000,
          progress: idx % 2 === 0 ? 80 : 50,
          status: 'IN_PROGRESS',
          coverImage: e.coverImage || fallbackProjects[idx % fallbackProjects.length].coverImage,
          leadProducer: 'Phoenix Producer Team',
          leadProducerPhone: '+91 98765 43210',
          milestones: fallbackProjects[0].milestones,
          documents: fallbackProjects[0].documents,
          createdAt: e.createdAt || new Date().toISOString(),
        }));
        return mapped;
      }
      return fallbackProjects;
    } catch (error) {
      console.warn('Backend API unavailable, using fallback client projects:', error);
      return fallbackProjects;
    }
  },

  getProjectById: async (identifier: string | number): Promise<ClientProject | null> => {
    const all = await projectApi.getProjects();
    const found = all.find(p => p.id.toString() === identifier.toString() || p.slug === identifier);
    return found || fallbackProjects[0];
  },
};
