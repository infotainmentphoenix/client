import React from 'react';
import { EventList } from '@/features/events/components/EventList';

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Events</h1>
        <p className="text-gray-500">Manage your past and upcoming event portfolio.</p>
      </div>

      <EventList />
    </div>
  );
}
