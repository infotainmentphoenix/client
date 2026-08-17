'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { eventApi } from '../api';
import { Event, EventImage } from '../types';
import { serviceApi } from '@/features/services/api';
import { Service } from '@/features/services/types';

interface EventFormProps {
  eventId?: string | number;
}

export function EventForm({ eventId }: EventFormProps) {
  const router = useRouter();
  const isEditing = !!eventId;
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const galleryImagesInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    brief: '',
    outcome: '',
    eventDate: '',
    endDate: '',
    venue: '',
    city: '',
    state: 'Maharashtra',
    attendees: '',
    clientName: '',
    clientQuote: '',
    videoUrl: '',
    metaTitle: '',
    metaDescription: '',
    featured: false,
    sortOrder: 0,
    isActive: true,
    serviceId: '',
    eventType: 'CORPORATE',
  });

  
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [existingCoverImage, setExistingCoverImage] = useState<string | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<EventImage[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);

  
  const [isDragOverCover, setIsDragOverCover] = useState(false);

  
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const fetchedServices = await serviceApi.getServices();
        setServices(fetchedServices);

        if (isEditing) {
          await loadEvent();
        }
      } catch (err: any) {
        console.error('Initialization error:', err);
        setError('Failed to initialize the form.');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [eventId]);

  const loadEvent = async () => {
    const data = await eventApi.getEvent(eventId!);
    if (data) {
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        brief: data.brief || '',
        outcome: data.outcome || '',
        eventDate: data.eventDate ? new Date(data.eventDate).toISOString().slice(0, 16) : '',
        endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : '',
        venue: data.venue || '',
        city: data.city || '',
        state: data.state || 'Maharashtra',
        attendees: data.attendees !== undefined && data.attendees !== null ? String(data.attendees) : '',
        clientName: data.clientName || '',
        clientQuote: data.clientQuote || '',
        videoUrl: data.videoUrl || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        featured: !!data.featured,
        sortOrder: data.sortOrder || 0,
        isActive: data.isActive !== false,
        serviceId: data.serviceId !== undefined && data.serviceId !== null ? String(data.serviceId) : '',
        eventType: data.eventType || 'CORPORATE',
      });

      if (data.coverImage) {
        setExistingCoverImage(data.coverImage);
        setCoverImagePreview(data.coverImage);
      }
      if (data.images) {
        setExistingGallery(data.images);
      }
    } else {
      setError('Event not found.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        
        if (name === 'title' && !isEditing) {
          newData.slug = value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        }
        return newData;
      });
    }

    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Safe date-time picker trigger that catches native showPicker user-gesture exceptions
  const handleDatePickerTrigger = (e: React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    try {
      if (typeof (e.target as any).showPicker === 'function') {
        (e.target as any).showPicker();
      }
    } catch (err) {
      console.warn('Native date picker popup blocked or unsupported:', err);
    }
  };

  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated['coverImage'];
        return updated;
      });
    }
  };

  const removeCoverImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }
  };

  // Cover image drag and drop handlers
  const handleDragOverCover = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCover(true);
  };

  const handleDragLeaveCover = () => {
    setIsDragOverCover(false);
  };

  const handleDropCover = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCover(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  // Gallery multi-image selection
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setGalleryFiles(prev => [...prev, ...validFiles]);
      if (galleryImagesInputRef.current) {
        galleryImagesInputRef.current.value = '';
      }
    }
  };

  const removeNewGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (id: number) => {
    setDeleteImageIds(prev => [...prev, id]);
    setExistingGallery(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const payload = new FormData();

      // Append general text/number/boolean fields
      payload.append('title', formData.title);
      payload.append('slug', formData.slug);
      payload.append('eventType', formData.eventType);
      payload.append('description', formData.description);
      payload.append('brief', formData.brief || '');
      payload.append('outcome', formData.outcome || '');
      payload.append('venue', formData.venue || '');
      payload.append('city', formData.city || '');
      payload.append('state', formData.state || '');
      
      if (formData.attendees) {
        payload.append('attendees', formData.attendees);
      }
      payload.append('clientName', formData.clientName || '');
      payload.append('clientQuote', formData.clientQuote || '');
      payload.append('videoUrl', formData.videoUrl || '');
      payload.append('metaTitle', formData.metaTitle || '');
      payload.append('metaDescription', formData.metaDescription || '');
      payload.append('featured', String(formData.featured));
      payload.append('sortOrder', String(formData.sortOrder));
      payload.append('isActive', String(formData.isActive));

      if (formData.serviceId) {
        payload.append('serviceId', formData.serviceId);
      }

      
      if (formData.eventDate) {
        payload.append('eventDate', new Date(formData.eventDate).toISOString());
      }
      if (formData.endDate) {
        payload.append('endDate', new Date(formData.endDate).toISOString());
      }

      
      if (coverImageFile) {
        payload.append('coverImage', coverImageFile);
      } else if (!coverImagePreview && existingCoverImage) {
        
        payload.append('coverImage', 'null');
      }

      
      galleryFiles.forEach(file => {
        payload.append('images', file);
      });

      
      if (isEditing && deleteImageIds.length > 0) {
        payload.append('deleteImageIds', JSON.stringify(deleteImageIds));
      }

      let result;
      if (isEditing) {
        result = await eventApi.updateEvent(eventId!, payload);
      } else {
        result = await eventApi.createEvent(payload);
      }

      if (result) {
        router.push('/admin/content/events');
      }
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while saving the event.');
      
      if (err.errors?.issues) {
        const fieldErrors: Record<string, string> = {};
        err.errors.issues.forEach((issue: any) => {
          const path = issue.path[0];
          if (path) {
            fieldErrors[path] = issue.message;
          }
        });
        setValidationErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing && !formData.title) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border shadow-sm">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="mt-4 text-gray-500 font-medium">Loading event data...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12 max-w-5xl mx-auto">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 flex items-start gap-3 shadow-sm animate-pulse">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-bold text-sm">Submission Failed</h4>
            <p className="text-xs opacity-90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
          <h3 className="text-lg font-black tracking-tight">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Event Title *</label>
            <input 
              required
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-background border ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'} rounded-lg text-sm focus:outline-none focus:ring-2 transition-all`}
              placeholder="e.g. Phoenix Corporate Gala 2026"
            />
            {validationErrors.title && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">URL Slug (Auto-generated)</label>
            <input 
              required
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-background border ${validationErrors.slug ? 'border-red-500 focus:ring-red-500 font-mono' : 'border-border focus:ring-blue-500 font-mono'} rounded-lg text-sm focus:outline-none focus:ring-2 transition-all`}
              placeholder="e.g. phoenix-gala-2026"
            />
            {validationErrors.slug && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.slug}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Event Type *</label>
            <select 
              name="eventType" 
              value={formData.eventType} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
            >
              <option value="CORPORATE">Corporate</option>
              <option value="WEDDING">Wedding</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="FESTIVAL">Festival</option>
              <option value="CONCERT">Concert</option>
              <option value="PRIVATE_PARTY">Private Party</option>
              <option value="AWARDS_CEREMONY">Awards Ceremony</option>
              <option value="PRODUCT_LAUNCH">Product Launch</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Associated Service</label>
            <select 
              name="serviceId" 
              value={formData.serviceId} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">None / Independent Event</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
            {validationErrors.serviceId && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.serviceId}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-1">Client Name</label>
            <input 
              type="text" 
              name="clientName" 
              value={formData.clientName} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. Tata Motors"
            />
            {validationErrors.clientName && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.clientName}</p>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-sm">2</div>
          <h3 className="text-lg font-black tracking-tight">Event Descriptions</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Short Summary (Brief Overview)</label>
            <input 
              type="text" 
              name="brief" 
              value={formData.brief} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="A short 1-2 sentence summary of what the event was"
            />
            {validationErrors.brief && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.brief}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Detailed Description *</label>
            <textarea 
              name="description" 
              rows={5}
              value={formData.description} 
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-background border ${validationErrors.description ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'} rounded-lg text-sm focus:outline-none focus:ring-2 transition-all`}
              placeholder="Provide a comprehensive description of the event, what happened, highlights, details, etc..."
            />
            {validationErrors.description && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Event Outcome & Deliverables</label>
            <textarea 
              name="outcome" 
              rows={3}
              value={formData.outcome} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Highlight any key outcomes, deliverables, performance stats, or success metrics..."
            />
            {validationErrors.outcome && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.outcome}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Client Quote (Testimonial)</label>
            <textarea 
              name="clientQuote" 
              rows={3}
              value={formData.clientQuote} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="What did the client say about our management of this event?"
            />
            {validationErrors.clientQuote && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.clientQuote}</p>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-8 h-8 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
          <h3 className="text-lg font-black tracking-tight">Logistics & Location</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Event Start Date</label>
            <div className="relative">
              <input 
                type="datetime-local" 
                name="eventDate" 
                value={formData.eventDate} 
                onChange={handleChange}
                onClick={handleDatePickerTrigger}
                onFocus={handleDatePickerTrigger}
                className={`w-full pl-10 pr-4 py-2.5 bg-background border ${validationErrors.eventDate ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'} rounded-lg text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {validationErrors.eventDate && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.eventDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Event End Date</label>
            <div className="relative">
              <input 
                type="datetime-local" 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange}
                onClick={handleDatePickerTrigger}
                onFocus={handleDatePickerTrigger}
                className={`w-full pl-10 pr-4 py-2.5 bg-background border ${validationErrors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'} rounded-lg text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {validationErrors.endDate && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.endDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Total Attendees</label>
            <input 
              type="number" 
              name="attendees" 
              value={formData.attendees} 
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-background border ${validationErrors.attendees ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'} rounded-lg text-sm focus:outline-none focus:ring-2 transition-all`}
              min="0"
              placeholder="e.g. 500"
            />
            {validationErrors.attendees && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.attendees}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Venue Name</label>
            <input 
              type="text" 
              name="venue" 
              value={formData.venue} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. Grand Hyatt Ballroom"
            />
            {validationErrors.venue && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.venue}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">City</label>
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. Mumbai"
            />
            {validationErrors.city && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">State / Province</label>
            <input 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. Maharashtra"
            />
            {validationErrors.state && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.state}</p>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold text-sm">4</div>
          <h3 className="text-lg font-black tracking-tight">Media & Search Engine Optimization (SEO)</h3>
        </div>
        
        <div className="space-y-6">
          {}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Cover Image</label>
            
            {coverImagePreview ? (
              <div className="relative group rounded-xl overflow-hidden border border-border bg-foreground/5 max-h-80 flex items-center justify-center shadow-inner">
                <img 
                  src={coverImagePreview} 
                  alt="Cover Preview" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    type="button"
                    onClick={() => coverImageInputRef.current?.click()}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                  >
                    Change Image
                  </button>
                  <button 
                    type="button"
                    onClick={removeCoverImage}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                  >
                    Remove Cover
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onDragOver={handleDragOverCover}
                onDragLeave={handleDragLeaveCover}
                onDrop={handleDropCover}
                onClick={() => coverImageInputRef.current?.click()}
                className={`border-2 border-dashed ${isDragOverCover ? 'border-blue-500 bg-blue-500/5' : 'border-border hover:border-gray-400 hover:bg-foreground/5'} rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Click or drag & drop to upload cover image</p>
                  <p className="text-xs text-gray-500 mt-1">Supports JPEG, PNG, WEBP, GIF (Max 5MB)</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={coverImageInputRef}
              onChange={handleCoverImageChange}
              accept="image/*"
              className="hidden"
            />
            {validationErrors.coverImage && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.coverImage}</p>
            )}
          </div>

          {}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="block text-sm font-semibold text-foreground">Event Gallery Images</label>
                <p className="text-xs text-gray-500 mt-0.5">Select up to 10 images to showcase the event gallery.</p>
              </div>
              <button 
                type="button"
                onClick={() => galleryImagesInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-500/20 transition-colors border border-blue-500/20 shadow-sm cursor-pointer"
              >
                Add Images
              </button>
            </div>

            <input 
              type="file" 
              multiple
              ref={galleryImagesInputRef}
              onChange={handleGalleryChange}
              accept="image/*"
              className="hidden"
            />

            {}
            {((existingGallery && existingGallery.length > 0) || galleryFiles.length > 0) ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {}
                {existingGallery.map(img => (
                  <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-border shadow-sm">
                    <img 
                      src={img.imageUrl} 
                      alt="Gallery Item" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      Existing
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeExistingGalleryImage(img.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all shadow-md cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}

                {}
                {galleryFiles.map((file, index) => {
                  const previewUrl = URL.createObjectURL(file);
                  return (
                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-border shadow-sm">
                      <img 
                        src={previewUrl} 
                        alt="New Upload" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-blue-600 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                        New
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeNewGalleryFile(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all shadow-md cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-dashed border-border rounded-xl p-6 text-center text-gray-400 text-sm mt-3">
                No images added to the gallery yet. Click "Add Images" above to add event photos.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-1">Event Video URL (YouTube Embed Link)</label>
              <input 
                type="url" 
                name="videoUrl" 
                value={formData.videoUrl} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="https://www.youtube.com/embed/..."
              />
              {validationErrors.videoUrl && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.videoUrl}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">SEO Meta Title (Recommended max 70 chars)</label>
              <input 
                type="text" 
                name="metaTitle" 
                value={formData.metaTitle} 
                onChange={handleChange}
                maxLength={70}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Phoenix Corporate Gala 2026 | Event Portfolio"
              />
              {validationErrors.metaTitle && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.metaTitle}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">SEO Meta Description (Recommended max 160 chars)</label>
              <textarea 
                name="metaDescription" 
                rows={2}
                value={formData.metaDescription} 
                onChange={handleChange}
                maxLength={160}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Brief summary of the event page metadata..."
              />
              {validationErrors.metaDescription && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.metaDescription}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center font-bold text-sm">5</div>
          <h3 className="text-lg font-black tracking-tight">Display Settings</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Sort Order (0 = First)</label>
            <input 
              type="number" 
              name="sortOrder" 
              value={formData.sortOrder} 
              onChange={handleChange}
              className="w-40 px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              min="0"
            />
            {validationErrors.sortOrder && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.sortOrder}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-2 md:mt-6">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                name="isActive" 
                checked={formData.isActive} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-border bg-background cursor-pointer accent-blue-600 transition-all"
              />
              <div>
                <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">Active on Website</div>
                <div className="text-xs text-gray-500">Enable visibility of this event in portfolios.</div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                name="featured" 
                checked={formData.featured} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-border bg-background cursor-pointer accent-blue-600 transition-all"
              />
              <div>
                <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">Featured Event</div>
                <div className="text-xs text-gray-500">Highlight this event on the main homepage.</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {}
      <div className="flex justify-end gap-4 sticky bottom-4 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg z-10 animate-fade-in">
        <button 
          type="button" 
          disabled={isLoading}
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-foreground/5 transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
        >
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {isLoading ? 'Saving Event...' : (isEditing ? 'Update Event' : 'Create Event')}
        </button>
      </div>
    </form>
  );
}
