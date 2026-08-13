import React from 'react';
import { PressList } from '@/features/press/components/PressList';

export default function AdminPressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Press & Partners</h1>
        <p className="text-gray-500">Manage client logos, media partners, and sponsor features.</p>
      </div>

      <PressList />
    </div>
  );
}
