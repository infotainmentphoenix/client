'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { teamApi } from '../api';
import { TeamMember } from '../types';
import { extractValidationErrors } from '@/lib/utils';

interface TeamFormProps {
  memberId?: string | number;
}

export function TeamForm({ memberId }: TeamFormProps) {
  const router = useRouter();
  const isEditing = !!memberId;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    fieldId: '',
    role: 'TEAM_MEMBER',
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadMember();
    }
  }, [memberId]);

  async function loadMember() {
    setIsLoading(true);
    const data = await teamApi.getMember(memberId!, true);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = new FormData();
    if (selectedFile) {
      payload.append('image', selectedFile);
    } else if (formData.image) {
      payload.append('image', formData.image);
    }

    if (formData.name) payload.append('name', formData.name);
    if (formData.email) payload.append('email', formData.email);
    if (formData.role) payload.append('role', formData.role);
    if (formData.phone) payload.append('phone', formData.phone);
    if (formData.password) payload.append('password', formData.password);
    if (formData.fieldId) payload.append('fieldId', formData.fieldId);
    payload.append('isActive', (formData.isActive ?? true).toString());

    try {
      let result;
      if (isEditing) {
        result = await teamApi.updateMember(memberId!, payload);
      } else {
        result = await teamApi.createMember(payload);
      }

      if (result) {
        router.push('/admin/content/team');
      } else {
        setError('Failed to save team member.');
      }
    } catch (err: any) {
      console.error(err);
      let message = err.message || 'An unexpected error occurred.';
      
      const fieldErrors = extractValidationErrors(err);
      const errorList = Object.entries(fieldErrors).map(([field, msg]) => {
        const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
        return `${capitalizedField}: ${msg}`;
      });
      if (errorList.length > 0) {
        message = errorList.join('; ');
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm font-medium flex items-start gap-3 relative shadow-sm">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <div className="font-bold">Failed to Save Team Member</div>
            <p className="mt-1 text-xs opacity-90">{error}</p>
          </div>
          <button type="button" onClick={() => setError(null)} className="hover:opacity-75 transition-opacity absolute right-4 top-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Personal Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
              <input 
                required
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
              <input 
                required
                type="email" 
                name="email" 
                value={formData.email || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={isEditing ? "Leave blank to keep unchanged" : "Enter a strong password"}
                required={!isEditing}
              />
              {isEditing && <p className="text-xs text-gray-500 mt-1">Leave empty unless you want to reset their password.</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Role Type</label>
            <select 
              name="role" 
              value={formData.role || 'TEAM_MEMBER'} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TEAM_MEMBER">Team Member</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Profile Image & Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Upload Profile Avatar</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-white/10 dark:file:text-white"
              />
              {formData.image && (
                <div className="mt-4 w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-border">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="isActive" 
                checked={formData.isActive || false} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <div>
                <div className="font-medium text-sm">Active Account</div>
                <div className="text-xs text-gray-500">Allow login and dashboard access.</div>
              </div>
            </label>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Member' : 'Add Team Member')}
        </button>
      </div>
    </form>
  );
}
