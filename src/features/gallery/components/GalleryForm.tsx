'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { galleryApi } from '../api';
import { CarouselItem } from '../types';
import { extractValidationErrors } from '@/lib/utils';

interface GalleryFormProps {
  itemId?: string | number;
}

export function GalleryForm({ itemId }: GalleryFormProps) {
  const router = useRouter();
  const isEditing = !!itemId;
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    linkUrl: '',
    buttonText: '',
    sortOrder: 0,
    isActive: true,
  });

  // Media states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadItem();
    }
  }, [itemId]);

  async function loadItem() {
    setIsLoading(true);
    try {
      const data = await galleryApi.getItem(itemId!, true);
      if (data) {
        setFormData({
          title: data.title || '',
          subtitle: data.description || '', // maps description in types to subtitle in DB
          linkUrl: data.videoUrl || '', // maps videoUrl in types to linkUrl in DB
          buttonText: (data as any).buttonText || '',
          sortOrder: (data as any).sortOrder || 0,
          isActive: data.isActive !== false,
        });

        if (data.imageUrl) {
          setExistingImage(data.imageUrl);
          setImagePreview(data.imageUrl);
        }
      } else {
        setError('Media banner not found.');
      }
    } catch (err: any) {
      console.error('Failed to load gallery item:', err);
      setError('Failed to load media item data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated['image'];
        return updated;
      });
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    // Validate that we have an image
    if (!imagePreview && !imageFile) {
      setError('An image is required for the gallery banner.');
      setIsLoading(false);
      return;
    }

    try {
      const payload = new FormData();

      // Append textual fields
      payload.append('title', formData.title || '');
      payload.append('subtitle', formData.subtitle || ''); // maps description -> subtitle
      payload.append('linkUrl', formData.linkUrl || ''); // maps videoUrl -> linkUrl
      payload.append('buttonText', formData.buttonText || '');
      payload.append('sortOrder', String(formData.sortOrder));
      payload.append('isActive', String(formData.isActive));

      
      if (imageFile) {
        payload.append('image', imageFile);
      }

      let result;
      if (isEditing) {
        result = await galleryApi.updateItem(itemId!, payload);
      } else {
        result = await galleryApi.createItem(payload);
      }

      if (result) {
        router.push('/admin/content/gallery');
      }
    } catch (err: any) {
      console.error('Error submitting gallery form:', err);
      setError(err.message || 'An error occurred while uploading gallery media.');
      
      const fieldErrors = extractValidationErrors(err);
      setValidationErrors(fieldErrors);

      // Scroll to the first error field or top of the form
      setTimeout(() => {
        const errorInput = document.querySelector('.border-red-500');
        if (errorInput) {
          errorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (errorInput as HTMLElement).focus?.();
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing && !formData.title && !imagePreview) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border shadow-sm">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="mt-4 text-gray-500 font-medium">Loading media details...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12 max-w-4xl mx-auto">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 flex items-start gap-3 shadow-sm animate-pulse">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-bold text-sm">Upload Failed</h4>
            <p className="text-xs opacity-90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-bold border-b border-border pb-4 tracking-tight">Banner Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Title Overlay</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Live Stadium Concerts"
              />
              {validationErrors.title && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Subtitle / Description</label>
              <input 
                type="text" 
                name="subtitle" 
                value={formData.subtitle} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Elevating audiovisual stage setups"
              />
              {validationErrors.subtitle && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.subtitle}</p>
              )}
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Media File Image *</label>
            
            {imagePreview ? (
              <div className="relative group rounded-xl overflow-hidden border border-border bg-foreground/5 max-h-80 flex items-center justify-center shadow-inner">
                <img 
                  src={imagePreview} 
                  alt="Gallery Preview" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                  >
                    Change Image
                  </button>
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => imageInputRef.current?.click()}
                className={`border-2 border-dashed ${isDragOver ? 'border-blue-500 bg-blue-500/5' : 'border-border hover:border-gray-400 hover:bg-foreground/5'} rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Click or drag & drop to select media image</p>
                  <p className="text-xs text-gray-500 mt-1">Supports JPEG, PNG, WEBP, GIF (Max 5MB)</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={imageInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {validationErrors.image && (
              <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.image}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Call to Action (Button Text)</label>
              <input 
                type="text" 
                name="buttonText" 
                value={formData.buttonText} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. View Artists"
              />
              {validationErrors.buttonText && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.buttonText}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Destination URL / Link</label>
              <input 
                type="text" 
                name="linkUrl" 
                value={formData.linkUrl} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. /artists"
              />
              {validationErrors.linkUrl && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors.linkUrl}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-bold border-b border-border pb-4 tracking-tight">Display Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          <div className="flex items-center mt-6">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                name="isActive" 
                checked={formData.isActive} 
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-border bg-background cursor-pointer accent-blue-600 transition-all"
              />
              <div>
                <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">Active Banner</div>
                <div className="text-xs text-gray-500">Display this in the frontend carousel.</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {}
      <div className="flex justify-end gap-4 sticky bottom-4 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg z-10">
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
          {isLoading ? 'Saving Media...' : (isEditing ? 'Update Media' : 'Upload Media')}
        </button>
      </div>
    </form>
  );
}
