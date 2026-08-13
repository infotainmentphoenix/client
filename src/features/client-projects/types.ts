export type ProjectStatus = 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING' | 'ON_HOLD';
export type MilestoneStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
export type DocumentType = 'CONTRACT' | 'INVOICE' | 'RIDER' | 'BLUEPRINT';

export interface ProjectMilestone {
  id: number;
  title: string;
  dueDate: string;
  status: MilestoneStatus;
  notes?: string;
}

export interface ProjectDocument {
  id: number;
  title: string;
  type: DocumentType;
  size: string;
  downloadUrl: string;
  updatedAt: string;
}

export interface ClientProject {
  id: number;
  slug: string;
  title: string;
  eventType: string;
  eventDate: string;
  endDate?: string;
  venue: string;
  city: string;
  budget: number;
  progress: number; // 0 to 100
  status: ProjectStatus;
  coverImage?: string;
  leadProducer: string;
  leadProducerPhone: string;
  milestones: ProjectMilestone[];
  documents: ProjectDocument[];
  notes?: string;
  createdAt: string;
}
