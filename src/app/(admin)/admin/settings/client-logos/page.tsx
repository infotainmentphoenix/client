'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { siteSettingsApi } from '@/features/site-settings/api';
import { ClientLogo, LogoType } from '@/features/site-settings/types';

export default function AdminSettingsClientLogosPage() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadData, setUploadData] = useState({ name: '', website: '', type: 'CLIENT' as LogoType });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadLogos();
  }, []);

  const loadLogos = async () => {
    setIsLoading(true);
    try {
      const data = await siteSettingsApi.getClientLogos();
      setLogos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    if (!uploadData.name) {
      alert("Please enter a brand name first!");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      let formattedWebsite = uploadData.website.trim();
      if (formattedWebsite && !/^https?:\/\//i.test(formattedWebsite)) {
        formattedWebsite = `https://${formattedWebsite}`;
      }

      const formData = new FormData();
      formData.append('logoImage', file);
      formData.append('name', uploadData.name);
      if (formattedWebsite) formData.append('website', formattedWebsite);
      formData.append('type', uploadData.type);
      
      const newLogo = await siteSettingsApi.createClientLogo(formData);
      if (newLogo) {
        setLogos(prev => [...prev, newLogo]);
      }
      
      setIsAdding(false);
      setUploadData({ name: '', website: '', type: 'CLIENT' });
    } catch (err: any) {
      alert(err.message || 'Failed to upload client logo');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this logo permanently?')) return;
    try {
      await siteSettingsApi.deleteClientLogo(id);
      setLogos(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      alert('Failed to delete logo');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Client Logos...</div>;
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Client & Sponsor Logos</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the brands displayed in your platform's trust sections.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white text-sm font-medium rounded-xl transition-all"
          >
            + Add Brand
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
          <h3 className="font-semibold mb-4 text-sm">Upload New Brand Logo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Brand Name (e.g. Google)"
              value={uploadData.name}
              onChange={e => setUploadData(prev => ({ ...prev, name: e.target.value }))}
              className="px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none"
            />
            <input 
              type="url" 
              placeholder="Website URL (Optional)"
              value={uploadData.website}
              onChange={e => setUploadData(prev => ({ ...prev, website: e.target.value }))}
              className="px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none"
            />
            <select
              value={uploadData.type}
              onChange={e => setUploadData(prev => ({ ...prev, type: e.target.value as LogoType }))}
              className="px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg text-sm outline-none"
            >
              <option value="CLIENT">Client</option>
              <option value="SPONSOR">Sponsor</option>
              <option value="PARTNER">Partner</option>
              <option value="MEDIA_PARTNER">Media Partner</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || !uploadData.name}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Select Image to Upload'}
            </button>
            <button 
              onClick={() => { setIsAdding(false); setUploadData({ name: '', website: '', type: 'CLIENT' }); }}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {logos.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm border-2 border-dashed border-gray-100 dark:border-white/5 rounded-xl">
          No logos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {logos.map(logo => (
            <div key={logo.id} className="group relative bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex flex-col items-center hover:border-gray-300 dark:hover:border-white/20 transition-all hover:-translate-y-1">
              <div className="w-full aspect-[3/2] relative mb-3 flex items-center justify-center p-2">
                <Image 
                  src={logo.logoUrl} 
                  alt={logo.name} 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center w-full">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{logo.name}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{logo.type.replace('_', ' ')}</p>
              </div>
              
              <button 
                onClick={() => handleDelete(logo.id)}
                className="absolute top-2 right-2 p-1.5 bg-white dark:bg-black text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50 dark:hover:bg-red-500/20"
                title="Delete Logo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
