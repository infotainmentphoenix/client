'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { galleryApi } from '../api';
import { CarouselItem } from '../types';

export function GalleryList() {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    const data = await galleryApi.getItems(true);
    setItems(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      await galleryApi.deleteItem(id);
      loadItems();
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Media & Banners</h2>
          <p className="text-sm text-gray-500">Manage carousel banners and featured media.</p>
        </div>
        
        <div>
          <Link href="/admin/content/gallery/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add Media
          </Link>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="py-12 text-center text-gray-500 flex flex-col items-center">
            <svg className="animate-spin w-8 h-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading gallery...
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-border rounded-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No media found</h3>
            <p className="text-gray-500 text-sm">Upload images to display in the carousel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-xl border border-border overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title || 'Gallery image'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  
                  {!item.isActive && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      Hidden
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 text-foreground text-xs px-2 py-1 rounded font-mono shadow-sm backdrop-blur-sm">
                    Ord: {item.sortOrder}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-foreground truncate">{item.title || 'Untitled Banner'}</h3>
                  <p className="text-sm text-gray-500 truncate mt-1">{item.subtitle || 'No subtitle'}</p>
                  
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-gray-400">ID: {item.id}</span>
                    <div className="flex gap-2">
                      <Link href={`/admin/content/gallery/${item.id}`} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
