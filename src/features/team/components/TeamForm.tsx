'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { teamApi } from '../api';
import { TeamMember } from '../types';

interface TeamFormProps {
  memberId?: string | number;
}

export function TeamForm({ memberId }: TeamFormProps) {
  const router = useRouter();
  const isEditing = !!memberId;
  const [isLoading, setIsLoading] = useState(false);
  
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

  const loadMember = async () => {
    setIsLoading(true);
    const data = await teamApi.getMember(memberId!);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let result;
    if (isEditing) {
      result = await teamApi.updateMember(memberId!, formData);
    } else {
      result = await teamApi.createMember(formData);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/team');
    } else {
      alert('Failed to save team member. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
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
              <label className="block text-sm font-medium text-foreground mb-1">Profile Avatar URL</label>
              <input 
                type="url" 
                name="image" 
                value={formData.image || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ik.imagekit.io/..."
              />
              {formData.image && (
                <div className="mt-4 w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-border">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Avatar Image Field ID</label>
              <input 
                type="text" 
                name="fieldId" 
                value={formData.fieldId || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="Optional (ImageKit ID)"
              />
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
