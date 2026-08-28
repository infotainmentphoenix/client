'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Carousel } from '../types';
import { carouselApi } from '../api';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

export function CarouselList() {
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  async function fetchCarousels() {
    setLoading(true);
    const data = await carouselApi.getCarousels({ search });
    setCarousels(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCarousels();
  }, [search]);

  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this carousel slide?')) {
      const success = await carouselApi.deleteCarousel(id);
      if (success) {
        setCarousels((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete carousel slide.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Carousels</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage homepage slider banners, background images, and call-to-action buttons.
          </p>
        </div>
        <Link
          href="/admin/content/carousels/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
        >
          <PlusIcon />
          <span>Add New Slide</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search slides by title or subtitle..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
        />
      </div>

      {/* Content Table / Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200/50 dark:border-white/10">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Loading carousels...</p>
          </div>
        </div>
      ) : carousels.length === 0 ? (
        <div className="text-center p-12 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200/50 dark:border-white/10">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <ImageIcon />
          </div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">No Carousel Slides Found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Create your first hero banner slide to showcase key events, services, or announcements.
          </p>
          <Link
            href="/admin/content/carousels/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors"
          >
            <PlusIcon /> Add Slide
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carousels.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0a0a0c] border border-gray-200/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image Preview Banner */}
              <div className="relative h-48 w-full bg-gray-100 dark:bg-black/50 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Carousel Slide'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <ImageIcon />
                  </div>
                )}
                {}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                      item.isActive
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-white">
                  Order: #{item.sortOrder}
                </div>
              </div>

              {}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1">
                    {item.title || 'Untitled Slide'}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                  {item.buttonText && (
                    <div className="mt-3">
                      <span className="inline-block px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-md border border-blue-500/20">
                        CTA: {item.buttonText} &rarr; {item.linkUrl || '#'}
                      </span>
                    </div>
                  )}
                </div>

                {}
                <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/content/carousels/${item.id}`}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                    title="Edit Slide"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Slide"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
