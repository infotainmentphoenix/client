'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { faqApi } from '../api';
import { FaqCategory } from '../types';

interface FaqCategoryFormProps {
  categoryId?: string | number;
}

export function FaqCategoryForm({ categoryId }: FaqCategoryFormProps) {
  const router = useRouter();
  const isEditing = !!categoryId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<FaqCategory>>({
    name: '',
    slug: '',
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadCategory();
    }
  }, [categoryId]);

  const loadCategory = async () => {
    setIsLoading(true);
    const data = await faqApi.getCategory(categoryId!);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      result = await faqApi.updateCategory(categoryId!, formData);
    } else {
      result = await faqApi.createCategory(formData);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/faqs/categories');
    } else {
      alert('Failed to save category. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading category data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Category Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category Name *</label>
              <input 
                required
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Booking Process"
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
                placeholder="e.g. booking-process"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Display Options</h3>
        
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
                <div className="font-medium text-sm">Active Category</div>
                <div className="text-xs text-gray-500">Show this category to public.</div>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Category' : 'Create Category')}
        </button>
      </div>
    </form>
  );
}
