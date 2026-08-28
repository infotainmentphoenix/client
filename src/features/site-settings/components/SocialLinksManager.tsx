'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '../api';
import { SocialLink, SocialPlatform } from '../types';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

export function SocialLinksManager() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isAdding, setIsAdding] = useState(false);
  const [platform, setPlatform] = useState<SocialPlatform>('INSTAGRAM');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    setIsLoading(true);
    const { data } = await siteSettingsApi.getSocialLinks();
    setLinks(data || []);
    setIsLoading(false);
  }

  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      await siteSettingsApi.deleteSocialLink(id);
      fetchLinks();
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    
    setIsSubmitting(true);
    // Since createSocialLink might accept json or formData depending on backend.
    // The API uses `api.post<any>('/api/social-links/create', data);`
    // We'll send standard JSON payload assuming the backend handles it.
    
    const payload = {
      platform,
      url,
      isActive: true,
      sortOrder: links.length
    };

    try {
      await siteSettingsApi.createSocialLink(payload);
      setIsAdding(false);
      setUrl('');
      fetchLinks();
    } catch (error) {
      alert('Failed to add social link');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Social Media Links</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <PlusIcon /> {isAdding ? 'Cancel' : 'Add New Link'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl p-6 space-y-4 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/5 pb-2">Add New Social Link</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform *</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
              >
                <option value="INSTAGRAM">Instagram</option>
                <option value="FACEBOOK">Facebook</option>
                <option value="TWITTER">Twitter / X</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="YOUTUBE">YouTube</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile URL *</label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !url}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Link'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-sm text-gray-500">Loading links...</div>
      ) : links.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5">
          <p className="text-sm text-gray-500">No social media links added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <div key={link.id} className="relative group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
                {link.platform.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{link.platform.toLowerCase()}</h4>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate block">
                  {link.url}
                </a>
              </div>
              
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 bg-white dark:bg-black text-red-500 border border-gray-200 dark:border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
                title="Delete Link"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
