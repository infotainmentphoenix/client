'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { artistApi } from '../api';
import { Artist, ArtistAvailability } from '../types';

export function ArtistBookingManager() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    setIsLoading(true);
    const data = await artistApi.getArtists();
    setArtists(data);
    setIsLoading(false);
  };

  const handleAvailabilityChange = async (id: number, availability: ArtistAvailability) => {
    // Optimistic UI update
    setArtists(prev => prev.map(a => a.id === id ? { ...a, availability } : a));
    
    try {
      // In a real implementation, we would call an API endpoint here to update availability.
      // e.g., await artistApi.updateAvailability(id, availability);
      // Since we don't have that endpoint explicitly defined in our mock yet, we'll just simulate it.
      console.log(`Updated artist ${id} availability to ${availability}`);
    } catch (error) {
      
      loadArtists();
    }
  };

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  const availabilityColumns: { label: string; value: ArtistAvailability; color: string }[] = [
    { label: 'Available', value: 'AVAILABLE', color: 'bg-emerald-500' },
    { label: 'Busy / Booked', value: 'BUSY', color: 'bg-yellow-500' },
    { label: 'On Request', value: 'ON_REQUEST', color: 'bg-blue-500' },
    { label: 'Unavailable', value: 'UNAVAILABLE', color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Booking Status Board</h2>
          <p className="text-sm text-gray-500">Quickly manage the availability status and booking notes of your artists.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search artists to update..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <svg className="animate-spin w-8 h-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Loading Booking Board...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {availabilityColumns.map(col => {
            const columnArtists = filteredArtists.filter(a => a.availability === col.value);
            
            return (
              <div key={col.value} className="bg-card/50 rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-16rem)]">
                <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${col.color}`} />
                    <h3 className="font-bold text-foreground">{col.label}</h3>
                  </div>
                  <span className="bg-background text-gray-500 text-xs font-semibold px-2 py-1 rounded-full border border-border">
                    {columnArtists.length}
                  </span>
                </div>
                
                <div className="p-3 overflow-y-auto flex-1 space-y-3">
                  {columnArtists.length === 0 ? (
                    <div className="text-center p-6 text-sm text-gray-400 border border-dashed border-border rounded-xl">
                      No artists
                    </div>
                  ) : (
                    columnArtists.map(artist => (
                      <div key={artist.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-blue-500/30 transition-colors group">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                              {artist.profileImage ? (
                                <img src={artist.profileImage} alt={artist.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                  {artist.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm truncate">{artist.name}</h4>
                              <p className="text-xs text-gray-500 truncate">{artist.category?.name || 'Artist'}</p>
                            </div>
                          </div>
                          <Link href={`/admin/artist-bookings/${artist.id}`} className="text-gray-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </Link>
                        </div>
                        
                        <div className="mb-3 text-xs text-gray-500 bg-background/50 p-2 rounded-lg border border-border">
                          {artist.bookingNote ? artist.bookingNote : 'No booking notes provided.'}
                        </div>

                        <div className="mt-auto">
                          <select 
                            value={artist.availability}
                            onChange={(e) => handleAvailabilityChange(artist.id, e.target.value as ArtistAvailability)}
                            className="w-full text-xs font-medium px-2 py-1.5 rounded outline-none border border-border bg-background hover:bg-foreground/5 cursor-pointer transition-colors"
                          >
                            <option value="AVAILABLE">Mark Available</option>
                            <option value="BUSY">Mark Busy</option>
                            <option value="ON_REQUEST">Mark On Request</option>
                            <option value="UNAVAILABLE">Mark Unavailable</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
