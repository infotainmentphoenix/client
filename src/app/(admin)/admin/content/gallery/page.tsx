import React from 'react';
import { GalleryList } from '@/features/gallery/components/GalleryList';

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Media Gallery</h1>
        <p className="text-gray-500">Manage carousel banners, hero images, and featured media.</p>
      </div>

      <GalleryList />
    </div>
  );
}
