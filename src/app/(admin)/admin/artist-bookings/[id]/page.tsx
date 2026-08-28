'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { artistApi } from '@/features/artists/api';
import { Artist, ArtistAvailability } from '@/features/artists/types';

export default function AdminArtistBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [artist, setArtist] = useState<Artist | null>(null);
  
  const [formData, setFormData] = useState({
    availability: 'AVAILABLE' as ArtistAvailability,
    bookingNote: '',
  });

  useEffect(() => {
    loadArtist();
  }, [resolvedParams.id]);

  async function loadArtist() {
    setIsLoading(true);
    const data = await artistApi.getArtist(resolvedParams.id);
    if (data) {
      setArtist(data);
      setFormData({
        availability: data.availability || 'AVAILABLE',
        bookingNote: data.bookingNote || '',
      });
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!artist) return;
    
    setIsSaving(true);
    const result = await artistApi.updateArtist(artist.id, formData);
    setIsSaving(false);
    
    if (result) {
      router.push('/admin/artist-bookings');
    } else {
      alert('Failed to update booking status. Check console for details.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <svg className="animate-spin w-8 h-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        Loading artist data...
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="p-12 text-center text-red-500 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20">
        <h2 className="text-xl font-bold mb-2">Artist Not Found</h2>
        <p>The artist you are trying to manage does not exist or has been deleted.</p>
        <Link href="/admin/artist-bookings" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Back to Booking Board
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/artist-bookings" className="p-2 hover:bg-foreground/5 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Booking Status</h1>
          <p className="text-gray-500">Update availability and notes for {artist.name}.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {artist.profileImage ? (
                <img src={artist.profileImage} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl">
                  {artist.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold">{artist.name}</h3>
              <p className="text-sm text-gray-500">{artist.category?.name || 'Artist'}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Current Availability Status</label>
              <select 
                name="availability" 
                value={formData.availability} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AVAILABLE">Available</option>
                <option value="BUSY">Busy / Booked</option>
                <option value="ON_REQUEST">On Request</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">This status dictates how the artist appears on the frontend booking pages.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Internal Booking Notes</label>
              <textarea 
                name="bookingNote" 
                rows={4}
                value={formData.bookingNote} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Busy with international tour until Dec 2025. Contact manager directly."
              />
              <p className="text-xs text-gray-500 mt-2">These notes are only visible to the internal admin team.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 sticky bottom-0 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Updating...' : 'Save Booking Status'}
          </button>
        </div>
      </form>
    </div>
  );
}
