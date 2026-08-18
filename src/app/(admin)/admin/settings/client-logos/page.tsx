'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';
import { ClientLogo, LogoType } from '@/features/site-settings/types';

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Client & Sponsor Logos</h2>
          <p className="text-sm text-gray-500 mt-1.5 max-w-2xl">Manage the trusted brands and partners displayed across your platform.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:text-black text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            <PlusIcon /> Add Brand
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-10 p-6 sm:p-8 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 relative z-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Upload New Brand Logo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="e.g. Google"
                value={uploadData.name}
                onChange={e => setUploadData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Website URL</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={uploadData.website}
                onChange={e => setUploadData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Relationship</label>
              <select
                value={uploadData.type}
                onChange={e => setUploadData(prev => ({ ...prev, type: e.target.value as LogoType }))}
                className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm outline-none transition-all appearance-none"
              >
                <option value="CLIENT">Client</option>
                <option value="SPONSOR">Sponsor</option>
                <option value="PARTNER">Partner</option>
                <option value="MEDIA_PARTNER">Media Partner</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
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
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <UploadIcon />
              )}
              {isUploading ? 'Uploading...' : 'Select Image to Upload'}
            </button>
            <button 
              onClick={() => { setIsAdding(false); setUploadData({ name: '', website: '', type: 'CLIENT' }); }}
              className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {logos.length === 0 ? (
        <div className="text-center py-16 bg-gray-50/50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl relative z-10">
          <p className="text-gray-500 text-sm font-medium">No logos uploaded yet.</p>
          <p className="text-gray-400 text-xs mt-1">Click "Add Brand" to upload your first client logo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
          {logos.map(logo => (
            <div key={logo.id} className="group relative bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
              
              <div className="w-full aspect-[3/2] relative mb-4 flex items-center justify-center p-3">
                <img 
                  src={logo.logoUrl} 
                  alt={logo.name} 
                  className="w-full h-full object-contain filter dark:brightness-200 dark:contrast-200 transition-all group-hover:scale-105 duration-300"
                />
              </div>
              
              <div className="text-center w-full">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{logo.name}</h4>
                <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{logo.type.replace('_', ' ')}</p>
              </div>
              
              <button 
                onClick={() => handleDelete(logo.id)}
                className="absolute -top-3 -right-3 p-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-red-200 dark:hover:bg-red-500/40 shadow-sm"
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
