'use client';

import { useState, useEffect } from 'react';
import { bookingApi } from '@/features/artist-bookings/api';
import { ArtistBooking } from '@/features/artist-bookings/types';

import { BookingsHeader } from '@/components/portal/bookings/BookingsHeader';
import { BookingsFilter } from '@/components/portal/bookings/BookingsFilter';
import { BookingsList } from '@/components/portal/bookings/BookingsList';
import { BookingDetailModal } from '@/components/portal/bookings/BookingDetailModal';
import { NewBookingModal } from '@/components/portal/bookings/NewBookingModal';

export default function PortalBookingsPage() {
  const [bookings, setBookings] = useState<ArtistBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeDetailModal, setActiveDetailModal] = useState<ArtistBooking | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await bookingApi.getClientBookings();
      setBookings(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredBookings = activeFilter === 'ALL' 
    ? bookings 
    : bookings.filter(b => b.status === activeFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <BookingsHeader onNewBooking={() => setShowNewBookingModal(true)} />
      
      <BookingsFilter 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        totalCount={bookings.length} 
      />

      <BookingsList 
        isLoading={isLoading} 
        bookings={filteredBookings} 
        onViewDetails={setActiveDetailModal}
        onClearFilter={() => setActiveFilter('ALL')}
      />

      <BookingDetailModal 
        booking={activeDetailModal} 
        onClose={() => setActiveDetailModal(null)} 
      />

      <NewBookingModal 
        isOpen={showNewBookingModal} 
        onClose={() => setShowNewBookingModal(false)} 
      />
    </div>
  );
}
