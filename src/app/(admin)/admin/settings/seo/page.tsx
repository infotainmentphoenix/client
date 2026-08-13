'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';

export default function AdminSettingsSeoPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await siteSettingsApi.getSiteSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = Object.entries(settings)
        .filter(([key]) => key.startsWith('seo_'))
        .map(([key, value]) => ({
          key,
          value: String(value ?? ''),
          type: 'string',
        }));
        
      if (payload.length > 0) {
        await siteSettingsApi.bulkUpsertSettings(payload);
      }
      alert('SEO Configuration saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to save SEO settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading SEO Settings...</div>;
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Global SEO Configuration</h2>
        <p className="text-sm text-gray-500 mt-1">Manage global search engine optimization attributes for your platform.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Global Meta Title</label>
            <input 
              type="text" 
              value={settings['seo_title'] || ''}
              onChange={(e) => handleChange('seo_title', e.target.value)}
              placeholder="Phoenix Infotainment | Best Event Management"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Global Meta Description</label>
            <textarea 
              rows={3} 
              value={settings['seo_description'] || ''}
              onChange={(e) => handleChange('seo_description', e.target.value)}
              placeholder="We organize world-class corporate and private events..."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta Keywords (Comma separated)</label>
            <input 
              type="text" 
              value={settings['seo_keywords'] || ''}
              onChange={(e) => handleChange('seo_keywords', e.target.value)}
              placeholder="events, management, artists, booking"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Google Analytics ID</label>
            <input 
              type="text" 
              value={settings['seo_ga_id'] || ''}
              onChange={(e) => handleChange('seo_ga_id', e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-6 py-2.5 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white text-sm font-medium rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save SEO Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
