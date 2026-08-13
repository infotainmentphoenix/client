import React from 'react';
import { ArtistCategoryList } from '@/features/artists/components/ArtistCategoryList';

export default function AdminArtistCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Artist Categories</h1>
        <p className="text-gray-500">Manage genres and types of artists.</p>
      </div>

      <ArtistCategoryList />
    </div>
  );
}
