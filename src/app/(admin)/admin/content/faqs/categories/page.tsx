import React from 'react';
import { FaqCategoryList } from '@/features/faqs/components/FaqCategoryList';

export default function AdminFaqCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">FAQ Categories</h1>
        <p className="text-gray-500">Manage categories to organize your frequently asked questions.</p>
      </div>

      <FaqCategoryList />
    </div>
  );
}
