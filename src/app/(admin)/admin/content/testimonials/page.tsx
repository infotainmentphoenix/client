import React from 'react';
import { TestimonialList } from '@/features/testimonials/components/TestimonialList';

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Client Testimonials</h1>
        <p className="text-gray-500">Manage client reviews and feedback associated with your events.</p>
      </div>

      <TestimonialList />
    </div>
  );
}
