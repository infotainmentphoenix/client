'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pageApi } from '../api';
import { SiteSetting } from '../types';

interface PageFormProps {
  settingId?: string | number;
}

export function PageForm({ settingId }: PageFormProps) {
  const router = useRouter();
  const isEditing = !!settingId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<SiteSetting>>({
    key: '',
    value: '',
    type: 'string',
  });

  useEffect(() => {
    if (isEditing) {
      loadSetting();
    }
  }, [settingId]);

  async function loadSetting() {
    setIsLoading(true);
    const data = await pageApi.getSetting(settingId!);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    let result;
    if (isEditing) {
      result = await pageApi.updateSetting(settingId!, formData);
    } else {
      result = await pageApi.createSetting(formData);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/pages');
    } else {
      alert('Failed to save setting. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading site content...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Content Block Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Content Key *</label>
              <input 
                required
                type="text" 
                name="key" 
                value={formData.key || ''} 
                onChange={handleChange}
                disabled={isEditing}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="e.g. about_us_text"
              />
              <p className="text-xs text-gray-500 mt-1">Unique identifier used by the frontend to fetch this content.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Data Type</label>
              <select 
                name="type" 
                value={formData.type || 'string'} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="string">Plain Text</option>
                <option value="html">Rich Text / HTML</option>
                <option value="json">JSON Config</option>
                <option value="number">Numeric</option>
                <option value="boolean">Boolean (true/false)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Content Value *</label>
            <textarea 
              required
              name="value" 
              rows={12}
              value={formData.value || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="Enter your content here..."
            />
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Content' : 'Create Content')}
        </button>
      </div>
    </form>
  );
}
