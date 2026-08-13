'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';
import { SocialLink, SocialPlatform } from '@/features/site-settings/types';

const platforms: SocialPlatform[] = ['INSTAGRAM', 'YOUTUBE', 'FACEBOOK', 'LINKEDIN', 'TWITTER'];

export default function AdminSettingsSocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>('INSTAGRAM');
  const [newUrl, setNewUrl] = useState('');

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
    return <div className="p-8 text-center text-gray-500">Loading Social Links...</div>;
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Media Links</h2>
          <p className="text-sm text-gray-500 mt-1">Connect your platform with your official social media pages.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white text-sm font-medium rounded-xl transition-all"
          >
            + Add Link
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <select 
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
              className="w-full px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex-[2]">
            <input 
              type="url" 
              required
              placeholder="https://instagram.com/yourpage"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Add</button>
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-200 dark:bg-white/10 rounded-lg text-sm font-medium">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {links.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No social links added yet.</div>
        ) : (
          links.map(link => (
            <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center font-bold text-gray-400">
                  {link.platform.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{link.platform}</h4>
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    {link.url}
                  </a>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(link.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
