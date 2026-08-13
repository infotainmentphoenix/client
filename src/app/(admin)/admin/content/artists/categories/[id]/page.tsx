'use client';
import React, { use } from 'react';
import Link from 'next/link';
import { ArtistCategoryForm } from '@/features/artists/components/ArtistCategoryForm';

export default function EditArtistCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/content/artists/categories" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Edit Artist Category</h1>
          <p className="text-gray-500">Update the details of this category.</p>
        </div>
      </div>

      <ArtistCategoryForm categoryId={resolvedParams.id} />
    </div>
  );
}
