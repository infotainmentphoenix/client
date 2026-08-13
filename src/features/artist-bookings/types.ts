export type BookingStatus = 'CONFIRMED' | 'PROPOSAL_SENT' | 'PENDING_DEPOSIT' | 'COMPLETED' | 'CANCELLED';

export interface ArtistBooking {
  id: number;
  artistId?: number;
  artistName: string;
  artistCategory: string;
  artistImage?: string;
  eventType: string;
  eventDate: string;
  endDate?: string;
  venue: string;
  city: string;
  contractValue: number;
  currency: string;
  depositPaid: boolean;
  status: BookingStatus;
  coordinatorName: string;
  coordinatorPhone: string;
  techRiderCompliant: boolean;
  greenRoomRiderCompliant: boolean;
  contractUrl?: string;
  notes?: string;
  createdAt: string;
}
