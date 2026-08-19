'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { artistApi } from '../api';
import { Artist, ArtistCategory } from '../types';
import { extractValidationErrors } from '@/lib/utils';

interface ArtistFormProps {
  artistId?: string | number;
}

export function ArtistForm({ artistId }: ArtistFormProps) {
  const router = useRouter();
  const isEditing = !!artistId;
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ArtistCategory[]>([]);
  
  const [formData, setFormData] = useState<Partial<Artist>>({
    name: '',
    slug: '',
    categoryId: 0,
    bio: '',
    shortBio: '',
    experience: '',
    basedIn: '',
    genre: [],
    languages: [],
    priceRange: '',
    priceMinValue: 0,
    priceMaxValue: 0,
    availability: 'AVAILABLE',
    bookingNote: '',
    profileImage: '',
    coverImage: '',
    videoShowreel: '',
    instagramUrl: '',
    youtubeUrl: '',
    spotifyUrl: '',
    websiteUrl: '',
    metaTitle: '',
    metaDescription: '',
    sortOrder: 0,
    isActive: true,
    featured: false,
    verified: false,
  });

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadArtist();
    }
  }, [artistId]);

  const loadCategories = async () => {
    const data = await artistApi.getCategories();
    setCategories(data);
    if (!isEditing && data.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: data[0].id }));
    }
  };

  const loadArtist = async () => {
    setIsLoading(true);
    const data = await artistApi.getArtist(artistId!);
    if (data) {
      setFormData(data);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === 'genre' || name === 'languages') {
      
      setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()).filter(Boolean) }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        if (name === 'name' && !isEditing) {
          newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        return newData;
      });
    }
  };

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [coverPreview, setCoverPreview] = useState<string>('');

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = new FormData();
      if (profileFile) payload.append('profileImage', profileFile);
      if (coverFile) payload.append('coverImage', coverFile);

      payload.append('name', formData.name || '');
      payload.append('slug', formData.slug || '');
      payload.append('categoryId', (formData.categoryId || 0).toString());
      if (formData.bio) payload.append('bio', formData.bio);
      if (formData.shortBio) payload.append('shortBio', formData.shortBio);
      if (formData.basedIn) payload.append('basedIn', formData.basedIn);
      if (formData.experience) payload.append('experience', formData.experience);
      if (formData.genre && formData.genre.length > 0) payload.append('genre', formData.genre.join(','));
      if (formData.languages && formData.languages.length > 0) payload.append('languages', formData.languages.join(','));
      if (formData.priceRange) payload.append('priceRange', formData.priceRange);
      if (formData.priceMinValue) payload.append('priceMinValue', formData.priceMinValue.toString());
      if (formData.priceMaxValue) payload.append('priceMaxValue', formData.priceMaxValue.toString());
      if (formData.availability) payload.append('availability', formData.availability || 'AVAILABLE');
      if (formData.bookingNote) payload.append('bookingNote', formData.bookingNote);
      if (formData.videoShowreel) payload.append('videoShowreel', formData.videoShowreel);
      if (formData.instagramUrl) payload.append('instagramUrl', formData.instagramUrl);
      if (formData.youtubeUrl) payload.append('youtubeUrl', formData.youtubeUrl);
      if (formData.spotifyUrl) payload.append('spotifyUrl', formData.spotifyUrl);
      if (formData.websiteUrl) payload.append('websiteUrl', formData.websiteUrl);
      if (formData.metaTitle) payload.append('metaTitle', formData.metaTitle);
      if (formData.metaDescription) payload.append('metaDescription', formData.metaDescription);
      payload.append('featured', (formData.featured ?? false).toString());
      payload.append('verified', (formData.verified ?? false).toString());
      payload.append('sortOrder', (formData.sortOrder || 0).toString());
      payload.append('isActive', (formData.isActive ?? true).toString());

      let result;
      if (isEditing) {
        result = await artistApi.updateArtist(artistId!, payload);
      } else {
        result = await artistApi.createArtist(payload);
      }

      setIsLoading(false);
      if (result) {
        router.push('/admin/content/artists');
      } else {
        alert('Failed to save artist.');
      }
    } catch (err: any) {
      setIsLoading(false);
      let message = err.message || 'Failed to save artist.';
      const fieldErrors = extractValidationErrors(err);
      const errorList = Object.entries(fieldErrors).map(([field, msg]) => {
        const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
        return `${capitalizedField}: ${msg}`;
      });
      if (errorList.length > 0) {
        message = errorList.join('; ');
      }
      alert(message);
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading artist data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Artist Name *</label>
            <input 
              required
              type="text" 
              name="name" 
              value={formData.name || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Arijit Singh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">URL Slug *</label>
            <input 
              required
              type="text" 
              name="slug" 
              value={formData.slug || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="e.g. arijit-singh"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
            <select 
              required
              name="categoryId" 
              value={formData.categoryId || 0} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0} disabled>Select a Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Short Biography</label>
            <input 
              type="text" 
              name="shortBio" 
              value={formData.shortBio || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief 1-line description"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Full Biography</label>
            <textarea 
              name="bio" 
              rows={4}
              value={formData.bio || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the artist's career, achievements, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Genres (Comma separated)</label>
            <input 
              type="text" 
              name="genre" 
              value={formData.genre?.join(', ') || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Pop, Classical, Bollywood"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Languages (Comma separated)</label>
            <input 
              type="text" 
              name="languages" 
              value={formData.languages?.join(', ') || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Hindi, English, Punjabi"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Booking & Pricing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Based In (City/Country)</label>
            <input 
              type="text" 
              name="basedIn" 
              value={formData.basedIn || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Mumbai, India"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Experience (Years/Text)</label>
            <input 
              type="text" 
              name="experience" 
              value={formData.experience || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 10+ Years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Pricing Range (Display Text)</label>
            <input 
              type="text" 
              name="priceRange" 
              value={formData.priceRange || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. ₹50k - ₹1.5L"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Availability</label>
            <select 
              name="availability" 
              value={formData.availability || 'AVAILABLE'} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AVAILABLE">Available</option>
              <option value="BUSY">Busy</option>
              <option value="ON_REQUEST">On Request</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Min Price (Numeric)</label>
            <input 
              type="number" 
              name="priceMinValue" 
              value={formData.priceMinValue || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Max Price (Numeric)</label>
            <input 
              type="number" 
              name="priceMaxValue" 
              value={formData.priceMaxValue || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Booking Notes / Requirements</label>
            <textarea 
              name="bookingNote" 
              rows={2}
              value={formData.bookingNote || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any specific booking requirements or notes"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Media, Social & SEO</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Profile Photo Upload (Avatar)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleProfileFileChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white"
            />
            {(profilePreview || formData.profileImage) && (
              <div className="mt-3 w-28 h-28 bg-gray-50 dark:bg-white/5 rounded-xl overflow-hidden border border-border flex items-center justify-center p-1">
                <img src={profilePreview || formData.profileImage} alt="Profile Preview" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Cover Photo Upload (Banner)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleCoverFileChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white"
            />
            {(coverPreview || formData.coverImage) && (
              <div className="mt-3 w-full h-28 bg-gray-50 dark:bg-white/5 rounded-xl overflow-hidden border border-border flex items-center justify-center p-1">
                <img src={coverPreview || formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Instagram URL</label>
            <input 
              type="url" 
              name="instagramUrl" 
              value={formData.instagramUrl || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">YouTube URL</label>
            <input 
              type="url" 
              name="youtubeUrl" 
              value={formData.youtubeUrl || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Spotify URL</label>
            <input 
              type="url" 
              name="spotifyUrl" 
              value={formData.spotifyUrl || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Website URL</label>
            <input 
              type="url" 
              name="websiteUrl" 
              value={formData.websiteUrl || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-border">
            <label className="block text-sm font-medium text-foreground mb-1">Video Showreel (YouTube Embed URL)</label>
            <input 
              type="url" 
              name="videoShowreel" 
              value={formData.videoShowreel || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-border">
            <label className="block text-sm font-medium text-foreground mb-1">Meta Title</label>
            <input 
              type="text" 
              name="metaTitle" 
              value={formData.metaTitle || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Meta Description (Max 160 chars)</label>
            <textarea 
              name="metaDescription" 
              rows={2}
              maxLength={160}
              value={formData.metaDescription || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Display Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Sort Order (0 = First)</label>
            <input 
              type="number" 
              name="sortOrder" 
              value={formData.sortOrder || 0} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer mt-6">
            <input 
              type="checkbox" 
              name="isActive" 
              checked={formData.isActive || false} 
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <div>
              <div className="font-medium text-sm">Active</div>
              <div className="text-xs text-gray-500">Visible on site.</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer mt-6">
            <input 
              type="checkbox" 
              name="featured" 
              checked={formData.featured || false} 
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <div>
              <div className="font-medium text-sm">Featured</div>
              <div className="text-xs text-gray-500">Showcase on home.</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer mt-6">
            <input 
              type="checkbox" 
              name="verified" 
              checked={formData.verified || false} 
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <div>
              <div className="font-medium text-sm">Verified</div>
              <div className="text-xs text-gray-500">Blue tick badge.</div>
            </div>
          </label>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Artist' : 'Create Artist')}
        </button>
      </div>
    </form>
  );
}
