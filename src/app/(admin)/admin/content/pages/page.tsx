import React from 'react';
import { PageList } from '@/features/pages/components/PageList';

export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Site Pages & Settings</h1>
        <p className="text-gray-500">Manage static content blocks like About Us, Privacy Policy, and global config.</p>
      </div>

      <PageList />
    </div>
  );
}
