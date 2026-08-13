import React from 'react';
import { ArtistBookingManager } from '@/features/artists/components/ArtistBookingManager';

export default function AdminArtistBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Artist Booking Manager</h1>
        <p className="text-gray-500">Manage artist availability, track busy schedules, and update booking notes.</p>
      </div>

      <ArtistBookingManager />
    </div>
  );
}
