'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { galleryApi } from '../api';
import { CarouselItem } from '../types';

interface GalleryFormProps {
  itemId?: string | number;
}

export function GalleryForm({ itemId }: GalleryFormProps) {
  const router = useRouter();
  const isEditing = !!itemId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<CarouselItem>>({
    title: '',
    subtitle: '',
    imageUrl: '',
    linkUrl: '',
    buttonText: '',
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadItem();
    }
  }, [itemId]);

  const loadItem = async () => {
    setIsLoading(true);
    const data = await galleryApi.getItem(itemId!);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: Partial<CarouselItem>) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev: Partial<CarouselItem>) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev: Partial<CarouselItem>) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let result;
    if (isEditing) {
      result = await galleryApi.updateItem(itemId!, formData);
    } else {
      result = await galleryApi.createItem(formData);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/gallery');
    } else {
      alert('Failed to save gallery item. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading media data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Banner Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title Overlay</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Premium Entertainment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Subtitle</label>
              <input 
                type="text" 
                name="subtitle" 
                value={formData.subtitle || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Elevate your next event"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Image URL *</label>
            <input 
              required
              type="url" 
              name="imageUrl" 
              value={formData.imageUrl || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://ik.imagekit.io/..."
            />
            {formData.imageUrl && (
              <div className="mt-4 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-border max-w-md">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Image Field ID (Optional - For ImageKit)</label>
            <input 
              type="text" 
              name="imageFieldId" 
              value={(formData as any).imageFieldId || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="e.g. file_12345"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Call to Action (Button Text)</label>
              <input 
                type="text" 
                name="buttonText" 
                value={formData.buttonText || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Explore Artists"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Destination URL</label>
              <input 
                type="text" 
                name="linkUrl" 
                value={formData.linkUrl || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. /artists"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Display Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Sort Order (0 = First)</label>
            <input 
              type="number" 
              name="sortOrder" 
              value={formData.sortOrder || 0} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          
          <div className="flex items-center mt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="isActive" 
                checked={formData.isActive || false} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <div>
                <div className="font-medium text-sm">Active Banner</div>
                <div className="text-xs text-gray-500">Display this in the frontend carousel.</div>
              </div>
            </label>
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
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : (isEditing ? 'Update Media' : 'Upload Media')}
        </button>
      </div>
    </form>
  );
}
