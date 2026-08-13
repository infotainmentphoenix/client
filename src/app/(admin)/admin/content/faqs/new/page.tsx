import React from 'react';
import Link from 'next/link';
import { FaqForm } from '@/features/faqs/components/FaqForm';

export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/content/faqs" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Add New FAQ</h1>
          <p className="text-gray-500">Create a new frequently asked question.</p>
        </div>
      </div>

      <FaqForm />
    </div>
  );
}
