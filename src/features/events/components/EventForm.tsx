'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { eventApi } from '../api';
import { Event } from '../types';

interface EventFormProps {
  eventId?: string | number;
}

export function EventForm({ eventId }: EventFormProps) {
  const router = useRouter();
  const isEditing = !!eventId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    slug: '',
    description: '',
    shortDesc: '',
    date: new Date().toISOString(),
    location: '',
    venue: '',
    eventType: 'CORPORATE',
    attendeeCount: 0,
    clientName: '',
    clientQuote: '',
    coverImage: '',
    gallery: [],
    videoUrl: '',
    metaTitle: '',
    metaDescription: '',
    featured: false,
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadEvent();
    }
  }, [eventId]);

  const loadEvent = async () => {
    setIsLoading(true);
    const data = await eventApi.getEvent(eventId!);
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
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else if (name === 'gallery') {
      setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()).filter(Boolean) }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        if (name === 'title' && !isEditing) {
          newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        return newData;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let result;
    if (isEditing) {
      result = await eventApi.updateEvent(eventId!, formData);
    } else {
      result = await eventApi.createEvent(formData);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/events');
    } else {
      alert('Failed to save event. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading event data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Event Title *</label>
            <input 
              required
              type="text" 
              name="title" 
              value={formData.title || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Phoenix Corporate Gala 2026"
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
              placeholder="e.g. phoenix-gala-2026"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Event Type</label>
            <select 
              name="eventType" 
              value={formData.eventType || 'Corporate'} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Corporate">Corporate</option>
              <option value="Wedding">Wedding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Festival">Festival</option>
              <option value="Concert">Concert</option>
              <option value="Private Party">Private Party</option>
              <option value="Awards Ceremony">Awards Ceremony</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Client Name</label>
            <input 
              type="text" 
              name="clientName" 
              value={formData.clientName || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Tata Motors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Short Description (Summary)</label>
            <input 
              type="text" 
              name="shortDesc" 
              value={formData.shortDesc || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A short 1-2 sentence overview of the event"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Detailed Description</label>
            <textarea 
              name="description" 
              rows={5}
              value={formData.description || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide a comprehensive description of the event..."
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Client Quote (Testimonial)</label>
            <textarea 
              name="clientQuote" 
              rows={2}
              value={formData.clientQuote || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What did the client say about the event?"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Logistics & Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Event Date</label>
            <input 
              required
              type="datetime-local" 
              name="date" 
              value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''} 
              onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value).toISOString() }))}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Total Attendees</label>
            <input 
              type="number" 
              name="attendeeCount" 
              value={formData.attendeeCount || 0} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Venue Name</label>
            <input 
              type="text" 
              name="venue" 
              value={formData.venue || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Location (City, Country)</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Media & SEO</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Cover Image URL</label>
            <input 
              type="url" 
              name="coverImage" 
              value={formData.coverImage || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Event Video URL (YouTube Embed)</label>
            <input 
              type="url" 
              name="videoUrl" 
              value={formData.videoUrl || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Gallery Image URLs (Comma separated)</label>
            <input 
              type="text" 
              name="gallery" 
              value={formData.gallery?.join(', ') || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://image1.jpg, https://image2.jpg"
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
              value={formData.metaDescription || ''} 
              onChange={handleChange}
              maxLength={160}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Display Settings</h3>
        
        <div className="flex flex-col sm:flex-row gap-8">
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
              <div className="font-medium text-sm">Active on Website</div>
              <div className="text-xs text-gray-500">Event will be visible in portfolios.</div>
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
              <div className="font-medium text-sm">Featured Event</div>
              <div className="text-xs text-gray-500">Highlight this event on the homepage.</div>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update Event' : 'Create Event')}
        </button>
      </div>
    </form>
  );
}
