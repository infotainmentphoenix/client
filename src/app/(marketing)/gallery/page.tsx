'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { galleryApi } from '@/features/gallery/api';
import { GalleryMediaItem } from '@/features/gallery/types';

const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="6 3 20 12 6 21 6 3"/></svg>
);
const MaximizeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<GalleryMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeMediaModal, setActiveMediaModal] = useState<GalleryMediaItem | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      setIsLoading(true);
      const items = await galleryApi.getItems();
      setMediaItems(items);
      setIsLoading(false);
    };
    loadGallery();
  }, []);

  const filteredItems = useMemo(() => {
    return mediaItems.filter(item => {
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'PHOTOS') return item.type === 'IMAGE';
      if (activeFilter === 'VIDEOS') return item.type === 'VIDEO';
      return item.category.toUpperCase() === activeFilter.toUpperCase();
    });
  }, [mediaItems, activeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-gray-50 dark:from-rose-950/20 dark:via-black dark:to-black pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-block px-4 py-1.5 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            Visual Experience & Media Gallery
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Capturing Moments That <br />
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              Leave You Speechless
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore photos and video showreels from our stadium concerts, celebrity performances, corporate galas, and destination weddings.
          </p>
        </div>
      </section>

      {}
      <section className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Media' },
            { id: 'PHOTOS', label: '📷 Photos Only' },
            { id: 'VIDEOS', label: '🎬 Video Showreels' },
            { id: 'CONCERTS', label: 'Concerts' },
            { id: 'CORPORATE', label: 'Corporate Galas' },
            { id: 'WEDDINGS', label: 'Luxury Weddings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 dark:bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
            <p className="text-gray-500 text-lg">No media found for this filter category.</p>
            <button
              onClick={() => setActiveFilter('ALL')}
              className="mt-4 px-6 py-2 bg-orange-600 text-white font-semibold text-sm rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMediaModal(item)}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {item.type === 'VIDEO' ? (
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
                      <PlayIcon className="w-3 h-3" /> VIDEO
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-black/60 backdrop-blur text-white text-xs font-semibold rounded-full border border-white/20">
                      PHOTO
                    </span>
                  )}
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur text-white text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                {}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.type === 'VIDEO' ? <PlayIcon className="w-4 h-4 ml-0.5" /> : <MaximizeIcon className="w-4 h-4" />}
                </div>

                {}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <h3 className="text-base font-bold line-clamp-1 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-300 mt-2">
                    {item.location && (
                      <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3 text-orange-400" />{item.location}</span>
                    )}
                    {item.date && (
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3 text-orange-400" />{item.date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {}
            <button
              onClick={() => setActiveMediaModal(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {}
            {activeMediaModal.type === 'VIDEO' ? (
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`${activeMediaModal.videoUrl}?autoplay=1`}
                  title={activeMediaModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative max-h-[70vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeMediaModal.imageUrl}
                  alt={activeMediaModal.title}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
            )}

            {}
            <div className="p-6 bg-gray-900 border-t border-white/10 text-white">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold">{activeMediaModal.title}</h3>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-semibold">
                  {activeMediaModal.category}
                </span>
              </div>
              {activeMediaModal.description && (
                <p className="text-gray-400 text-sm mb-3">{activeMediaModal.description}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {activeMediaModal.location && <span>📍 {activeMediaModal.location}</span>}
                {activeMediaModal.date && <span>📅 {activeMediaModal.date}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <section className="bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 py-16 text-white text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Want Your Event Featured Here?</h2>
          <p className="text-white/80 text-lg mb-8">
            From stage architecture to celebrity bookings, let us create an unforgettable spectacle for your brand or celebration.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
