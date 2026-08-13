export type InquirySource = 
  | 'WEBSITE_FORM'
  | 'WHATSAPP'
  | 'PHONE'
  | 'EMAIL'
  | 'SOCIAL_MEDIA'
  | 'REFERRAL'
  | 'AI_CHATBOT'
  | 'WALK_IN';

export type InquiryStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL_SENT'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'CLOSED_WON'
  | 'CLOSED_LOST'
  | 'ARCHIVED';

export type InquiryPriority = 
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

export type LeadActivityType = 
  | 'NOTE'
  | 'CALL'
  | 'EMAIL_SENT'
  | 'WHATSAPP_SENT'
  | 'MEETING'
  | 'PROPOSAL'
  | 'FOLLOW_UP'
  | 'STATUS_CHANGE';

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

export interface LeadActivity {
  id: number;
  inquiryId: number;
  type: LeadActivityType;
  title: string;
  notes?: string;
  performedBy?: string;
  createdAt: string;
}

export interface Inquiry {
  id: number;
  source: InquirySource;
  
  name: string;
  email: string;
  phone?: string;
  company?: string;
  eventType?: EventType;
  inquiryType?: string;
  serviceId?: number;
  eventDate?: string;
  endDate?: string;
  guestCount?: number;
  venue?: string;
  city?: string;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  message?: string;
  requirements?: string;

  status: InquiryStatus;
  priority: InquiryPriority;
  leadScore?: number;
  assignedTo?: number;
  notes?: string;
  lastFollowUp?: string;
  nextFollowUp?: string;
  followUpCount: number;
  userId?: number;
  
  activities?: LeadActivity[];
  
  createdAt: string;
  updatedAt: string;
}
