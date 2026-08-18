'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const TypeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);

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
      // Optional: Add a nice toast instead of an alert if available
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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative overflow-hidden">
      
      {/* Decorative Blur Background inside the card */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Site Profile</h2>
        <p className="text-sm text-gray-500 mt-1.5 max-w-2xl">
          Update your company's core identity and contact information. These details will be visible to users across the website's footer and contact pages.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Company Name */}
          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <BuildingIcon />
              </div>
              <input 
                type="text" 
                value={settings['company_name'] || ''}
                onChange={(e) => handleChange('company_name', e.target.value)}
                placeholder="e.g. Phoenix Infotainment"
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          {/* Contact Email */}
          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Contact Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <MailIcon />
              </div>
              <input 
                type="email" 
                value={settings['contact_email'] || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div className="space-y-2 group md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Contact Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <PhoneIcon />
              </div>
              <input 
                type="text" 
                value={settings['contact_phone'] || ''}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Physical Address */}
          <div className="space-y-2 group md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Physical Address
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <MapPinIcon />
              </div>
              <textarea 
                rows={3} 
                value={settings['contact_address'] || ''}
                onChange={(e) => handleChange('contact_address', e.target.value)}
                placeholder="123 Business Park, Mumbai, India"
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all resize-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          {/* Footer Text */}
          <div className="space-y-2 group md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Footer Text
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <TypeIcon />
              </div>
              <input 
                type="text" 
                value={settings['footer_text'] || ''}
                onChange={(e) => handleChange('footer_text', e.target.value)}
                placeholder="© 2024 Phoenix Infotainment. All rights reserved."
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-white/10 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="group flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></div>
            ) : (
              <SaveIcon />
            )}
            {isSaving ? 'Saving Changes...' : 'Save Profile Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
