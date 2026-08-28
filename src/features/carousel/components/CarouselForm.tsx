'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { carouselApi } from '../api';
import { Carousel } from '../types';
import { extractValidationErrors } from '@/lib/utils';

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export function CarouselForm({ id }: { id?: string | number }) {
  const router = useRouter();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      async function loadCarousel() {
        setIsFetching(true);
        const data = await carouselApi.getCarouselById(id!);
        if (data) {
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
          setLinkUrl(data.linkUrl || '');
          setButtonText(data.buttonText || '');
          setSortOrder(data.sortOrder ?? 0);
          setIsActive(data.isActive ?? true);
          setExistingImageUrl(data.imageUrl || null);
        } else {
          setError('Carousel slide not found');
        }
        setIsFetching(false);
      };
      loadCarousel();
    }
  }, [id, isEditing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isEditing && !imageFile && !existingImageUrl) {
      setError('Please select a carousel image file.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      if (title) formData.append('title', title);
      if (subtitle) formData.append('subtitle', subtitle);
      if (linkUrl) formData.append('linkUrl', linkUrl);
      if (buttonText) formData.append('buttonText', buttonText);
      formData.append('sortOrder', sortOrder.toString());
      formData.append('isActive', isActive ? 'true' : 'false');

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEditing && id) {
        await carouselApi.updateCarousel(id, formData);
      } else {
        await carouselApi.createCarousel(formData);
      }

      router.push('/admin/content/carousels');
    } catch (err: any) {
      let message = err.message || 'Failed to save carousel slide.';
      const fieldErrors = extractValidationErrors(err);
      const errorList = Object.entries(fieldErrors).map(([field, msg]) => {
        const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
        return `${capitalizedField}: ${msg}`;
      });
      if (errorList.length > 0) {
        message = errorList.join('; ');
      }
      setError(message);
      
      // Scroll to the top of the form
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500">
        <div className="flex items-center gap-3">
          <LoaderIcon />
          <span>Loading slide details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Hero Carousel Slide' : 'Create New Hero Carousel Slide'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure slide image banner, titles, call-to-action buttons, and display priority.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0a0a0c] border border-gray-200/80 dark:border-white/10 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
        {}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Slide Banner Image {isEditing ? '(Leave blank to keep existing image)' : '*'}
          </label>

          {(imagePreview || existingImageUrl) && (
            <div className="relative h-56 w-full rounded-xl overflow-hidden bg-black/40 border border-gray-200 dark:border-white/10 mb-3">
              <img
                src={imagePreview || existingImageUrl || ''}
                alt="Slide Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl cursor-pointer bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon />
                <p className="mb-1 text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  Click to upload or drag & drop banner image
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  High Resolution JPG, PNG, WebP (1920x1080 recommended)
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Slide Heading Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Elevate Your Experience"
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle / Tagline</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Premium Entertainment & Event Production"
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 text-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Link URL & Button Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CTA Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="e.g. Explore Events"
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CTA Link URL</label>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="e.g. /events or https://..."
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 text-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Priority & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort Order Priority</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">Active Status</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
          <button
            type="button"
            onClick={() => router.push('/admin/content/carousels')}
            className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70"
          >
            {isLoading ? <><LoaderIcon /><span>Saving...</span></> : <span>{isEditing ? 'Save Changes' : 'Create Slide'}</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
