import React from 'react';
import { FaqList } from '@/features/faqs/components/FaqList';

export default function AdminFaqsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">FAQs</h1>
        <p className="text-gray-500">Manage frequently asked questions for your clients.</p>
      </div>

      <FaqList />
    </div>
  );
}
