import React from 'react';
import { ServiceList } from '@/features/services/components/ServiceList';

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Services</h1>
        <p className="text-gray-500">Manage the core services you provide to clients.</p>
      </div>

      <ServiceList />
    </div>
  );
}
