import React from 'react';
import { InquiryList } from '@/features/inquiries/components/InquiryList';

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="shrink-0">
        <h1 className="text-3xl font-black tracking-tight">Inquiries</h1>
        <p className="text-gray-500">Manage client leads and booking requests.</p>
      </div>

      <div className="flex-1 min-h-0">
        <InquiryList />
      </div>
    </div>
  );
}
