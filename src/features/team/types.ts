export type UserRole = 'ADMIN' | 'CLIENT' | 'TEAM_MEMBER';

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department: 'Leadership' | 'Artist Curation' | 'Production & Sound' | 'Event Operations' | 'PR & Marketing';
  bio?: string;
  image?: string;
  phone?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  experience?: string;
  password?: string;
  fieldId?: string;
  isActive: boolean;
  createdAt: string;
}
