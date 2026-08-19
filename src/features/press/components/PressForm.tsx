'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pressApi } from '../api';
import { PressLogo } from '../types';

interface PressFormProps {
  logoId?: string | number;
}

export function PressForm({ logoId }: PressFormProps) {
  const router = useRouter();
  const isEditing = !!logoId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<PressLogo>>({
    name: '',
    logoUrl: '',
    website: '',
    type: 'MEDIA_PARTNER',
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadLogo();
    }
  }, [logoId]);

  const loadLogo = async () => {
    setIsLoading(true);
    const data = await pressApi.getLogo(logoId!, true);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, logoUrl: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let formattedWebsite = (formData.website || '').trim();
      if (formattedWebsite && !/^https?:\/\//i.test(formattedWebsite)) {
        formattedWebsite = `https://${formattedWebsite}`;
      }

      const payload = new FormData();
      if (selectedFile) {
        payload.append('logoImage', selectedFile);
      }
      payload.append('name', formData.name || '');
      payload.append('type', formData.type || 'MEDIA_PARTNER');
      if (formattedWebsite) payload.append('website', formattedWebsite);
      payload.append('sortOrder', (formData.sortOrder || 0).toString());
      payload.append('isActive', (formData.isActive ?? true).toString());

      let result;
      if (isEditing) {
        result = await pressApi.updateLogo(logoId!, payload);
      } else {
        result = await pressApi.createLogo(payload);
      }

      setIsLoading(false);
      if (result) {
        router.push('/admin/content/press');
      } else {
        alert('Failed to save partner logo.');
      }
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message || 'Failed to save partner logo.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading partner data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Partner Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Company / Publication Name *</label>
              <input 
                required
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Times of India, Tata Motors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Partner Type</label>
              <select 
                name="type" 
                value={formData.type || 'MEDIA_PARTNER'} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MEDIA_PARTNER">Media / Press Partner</option>
                <option value="CLIENT">Client</option>
                <option value="SPONSOR">Sponsor</option>
                <option value="PARTNER">Strategic Partner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Logo Image File {!isEditing && '*'}</label>
            <input 
              required={!isEditing && !formData.logoUrl}
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white"
            />
            {formData.logoUrl && (
              <div className="mt-4 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-lg overflow-hidden border border-border flex items-center justify-center p-2">
                <img src={formData.logoUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">External Website URL (Optional)</label>
            <input 
              type="url" 
              name="website" 
              value={formData.website || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.example.com"
            />
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
                <div className="font-medium text-sm">Active</div>
                <div className="text-xs text-gray-500">Logo will be visible in the frontend carousel/grid.</div>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Partner' : 'Add Partner')}
        </button>
      </div>
    </form>
  );
}
