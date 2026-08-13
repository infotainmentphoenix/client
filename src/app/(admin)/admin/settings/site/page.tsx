'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';

export default function AdminSettingsSitePage() {
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
      const payload = Object.entries(settings).map(([key, value]) => ({
        key,
        value: String(value ?? ''),
        type: 'string',
      }));
      await siteSettingsApi.bulkUpsertSettings(payload);
      alert('Site profile settings saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Site Settings...</div>;
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Site Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Update your company's core identity and contact information.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
            <input 
              type="text" 
              value={settings['company_name'] || ''}
              onChange={(e) => handleChange('company_name', e.target.value)}
              placeholder="e.g. Phoenix Infotainment"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
            <input 
              type="email" 
              value={settings['contact_email'] || ''}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
            <input 
              type="text" 
              value={settings['contact_phone'] || ''}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Physical Address</label>
            <textarea 
              rows={3} 
              value={settings['contact_address'] || ''}
              onChange={(e) => handleChange('contact_address', e.target.value)}
              placeholder="123 Business Park, Mumbai, India"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all resize-none"
            />
          </div>
          
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Footer Text</label>
            <input 
              type="text" 
              value={settings['footer_text'] || ''}
              onChange={(e) => handleChange('footer_text', e.target.value)}
              placeholder="© 2024 Phoenix Infotainment. All rights reserved."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black/50 focus:border-black dark:focus:border-white rounded-xl text-sm outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-6 py-2.5 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white text-sm font-medium rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Profile Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
