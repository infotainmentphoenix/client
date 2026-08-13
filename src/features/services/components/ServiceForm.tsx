'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serviceApi } from '../api';
import { Service } from '../types';

interface ServiceFormProps {
  serviceId?: string | number;
}

export function ServiceForm({ serviceId }: ServiceFormProps) {
  const router = useRouter();
  const isEditing = !!serviceId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    icon: '',
    coverImage: '',
    coverImageFieldId: '',
    metaTitle: '',
    metaDescription: '',
    ogImage: '',
    ogImageFieldId: '',
    sortOrder: 0,
    featured: false,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadService();
    }
  }, [serviceId]);

  const loadService = async () => {
    setIsLoading(true);
    const data = await serviceApi.getService(serviceId!);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        if (name === 'name' && !isEditing) {
          newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        return newData;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let result;
    if (isEditing) {
      result = await serviceApi.updateService(serviceId!, formData);
    } else {
      result = await serviceApi.createService(formData);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/services');
    } else {
      alert('Failed to save service. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading service data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Basic Information</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Service Name *</label>
              <input 
                required
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Wedding Photography"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">URL Slug *</label>
              <input 
                required
                type="text" 
                name="slug" 
                value={formData.slug || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="e.g. wedding-photography"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tagline</label>
            <input 
              type="text" 
              name="tagline" 
              value={formData.tagline || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Capture your special moments forever"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Description *</label>
            <textarea 
              required
              name="description" 
              rows={5}
              value={formData.description || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the service..."
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Media & SEO</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Cover Image URL</label>
              <input 
                type="url" 
                name="coverImage" 
                value={formData.coverImage || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ik.imagekit.io/..."
              />
              {formData.coverImage && (
                <div className="mt-4 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-border">
                  <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cover Image Field ID</label>
                <input 
                  type="text" 
                  name="coverImageFieldId" 
                  value={formData.coverImageFieldId || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="Optional (ImageKit ID)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Icon (SVG or class)</label>
                <input 
                  type="text" 
                  name="icon" 
                  value={formData.icon || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="<svg>...</svg>"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">OG Image URL (For Social Sharing)</label>
              <input 
                type="url" 
                name="ogImage" 
                value={formData.ogImage || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ik.imagekit.io/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">OG Image Field ID</label>
              <input 
                type="text" 
                name="ogImageFieldId" 
                value={formData.ogImageFieldId || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="Optional (ImageKit ID)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Meta Title</label>
              <input 
                type="text" 
                name="metaTitle" 
                value={formData.metaTitle || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Meta Description (Max 160 chars)</label>
              <textarea 
                name="metaDescription" 
                rows={2}
                maxLength={160}
                value={formData.metaDescription || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Display Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                name="featured" 
                checked={formData.featured || false} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <div>
                <div className="font-medium text-sm">Featured Service</div>
                <div className="text-xs text-gray-500">Show on homepage</div>
              </div>
            </label>
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
                <div className="font-medium text-sm">Active</div>
                <div className="text-xs text-gray-500">Visible to public</div>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
        </button>
      </div>
    </form>
  );
}
