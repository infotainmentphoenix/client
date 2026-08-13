export type ConsultationStatus = 'SCHEDULED' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED';
export type ConsultationType = 'VIRTUAL_MEET' | 'IN_PERSON' | 'PHONE_CALL';

export interface Consultation {
  id: number;
  title: string;
  eventType: string;
  date: string;
  timeSlot: string;
  mode: ConsultationType;
  meetingUrl?: string;
  location?: string;
  consultantName: string;
  consultantRole: string;
  consultantAvatar?: string;
  status: ConsultationStatus;
  agenda?: string;
  notes?: string;
  createdAt: string;
}
