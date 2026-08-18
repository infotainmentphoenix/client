'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';
import { SocialLink, SocialPlatform } from '@/features/site-settings/types';

const platforms: SocialPlatform[] = ['INSTAGRAM', 'YOUTUBE', 'FACEBOOK', 'LINKEDIN', 'TWITTER'];

// SVG Icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);

const PlatformIcon = ({ platform }: { platform: SocialPlatform }) => {
  switch(platform) {
    case 'INSTAGRAM':
      return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
    case 'YOUTUBE':
      return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;
    case 'FACEBOOK':
      return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
    case 'LINKEDIN':
      return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'TWITTER':
      return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
    default:
      return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  }
}

export default function AdminSettingsSocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>('INSTAGRAM');
  const [newUrl, setNewUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    setIsLoading(true);
    try {
      const data = await siteSettingsApi.getSocialLinks();
      setLinks(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setIsSaving(true);
    try {
      const payload = {
        platform: newPlatform,
        url: newUrl,
        isActive: true,
        sortOrder: links.length,
      };
      
      const newLink = await siteSettingsApi.createSocialLink(payload);
      setLinks(prev => [...prev, newLink]);
      setNewUrl('');
      setIsAdding(false);
    } catch (err: any) {
      alert(err.message || 'Failed to add social link');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Remove this social link?')) return;
    try {
      await siteSettingsApi.deleteSocialLink(id);
      setLinks(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      alert('Failed to delete social link');
    }
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
      
      {/* Decorative Blur */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Social Media Links</h2>
          <p className="text-sm text-gray-500 mt-1.5 max-w-2xl">Connect your official pages to display them in the website footer and contact sections.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            <PlusIcon /> Add Link
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-10 p-6 sm:p-8 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 relative z-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Add New Social Profile</h3>
          
          <div className="flex flex-col md:flex-row gap-5 mb-6">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Platform</label>
              <div className="relative">
                <select 
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all appearance-none pl-10"
                >
                  {platforms.map(p => <option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>)}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <PlatformIcon platform={newPlatform} />
                </div>
              </div>
            </div>
            
            <div className="flex-[2] space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile URL <span className="text-red-500">*</span></label>
              <input 
                type="url" 
                required
                placeholder="https://..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              type="submit" 
              disabled={isSaving || !newUrl}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <SaveIcon />
              )}
              {isSaving ? 'Saving...' : 'Add Link'}
            </button>
            <button 
              type="button" 
              onClick={() => { setIsAdding(false); setNewUrl(''); }}
              className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4 relative z-10">
        {links.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl relative z-10">
            <p className="text-gray-500 text-sm font-medium">No social links added yet.</p>
            <p className="text-gray-400 text-xs mt-1">Click "Add Link" to connect your social profiles.</p>
          </div>
        ) : (
          links.map(link => (
            <div key={link.id} className="group flex items-center justify-between p-5 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/5 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all duration-300">
                  <PlatformIcon platform={link.platform} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{link.platform.charAt(0) + link.platform.slice(1).toLowerCase()}</h4>
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-[13px] text-gray-500 hover:text-blue-500 transition-colors block max-w-[200px] sm:max-w-xs md:max-w-md truncate">
                    {link.url}
                  </a>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(link.id)}
                className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-red-100 dark:hover:bg-red-500/20 shadow-sm"
                title="Remove Link"
              >
                <TrashIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
