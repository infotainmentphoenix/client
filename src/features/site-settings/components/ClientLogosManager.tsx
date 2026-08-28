'use client';

import React, { useState, useEffect } from 'react';
import { siteSettingsApi } from '../api';
import { ClientLogo, LogoType } from '../types';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

export function ClientLogosManager() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<LogoType>('CLIENT');
  const [website, setWebsite] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  async function fetchLogos() {
    setIsLoading(true);
    const data = await siteSettingsApi.getClientLogos();
    setLogos(data || []);
    setIsLoading(false);
  }

  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this logo?')) {
      await siteSettingsApi.deleteClientLogo(id);
      fetchLogos();
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !name) return;
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    if (website) formData.append('website', website);
    formData.append('file', file);
    formData.append('isActive', 'true');
    formData.append('sortOrder', '0');

    try {
      await siteSettingsApi.createClientLogo(formData);
      setIsAdding(false);
      setName('');
      setWebsite('');
      setFile(null);
      fetchLogos();
    } catch (error) {
      alert('Failed to add logo');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Client Logos</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <PlusIcon /> {isAdding ? 'Cancel' : 'Add New Logo'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl p-6 space-y-4 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/5 pb-2">Add New Logo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                placeholder="e.g. Acme Corp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as LogoType)}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
              >
                <option value="CLIENT">Client</option>
                <option value="SPONSOR">Sponsor</option>
                <option value="PARTNER">Partner</option>
                <option value="MEDIA_PARTNER">Media Partner</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL (Optional)</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                placeholder="https://..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Logo Image *</label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-1.5 text-sm text-gray-900 dark:text-white file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !file || !name}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Logo'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-sm text-gray-500">Loading logos...</div>
      ) : logos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5">
          <p className="text-sm text-gray-500">No client logos uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {logos.map((logo) => (
            <div key={logo.id} className="relative group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-24 w-full flex items-center justify-center mb-3 p-2">
                <img 
                  src={logo.logoUrl} 
                  alt={logo.name} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate w-full text-center">{logo.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{logo.type}</p>
              
              <button
                onClick={() => handleDelete(logo.id)}
                className="absolute top-2 right-2 p-1.5 bg-white dark:bg-black text-red-500 border border-gray-200 dark:border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Delete Logo"
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
