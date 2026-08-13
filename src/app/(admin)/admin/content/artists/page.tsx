import React from 'react';
import { ArtistList } from '@/features/artists/components/ArtistList';

export default function AdminArtistsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Artists</h1>
        <p className="text-gray-500">Manage your roster of talent.</p>
      </div>

      <ArtistList />
    </div>
  );
}
