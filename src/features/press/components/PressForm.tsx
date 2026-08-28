'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pressApi } from '../api';
import { BlogPost, BlogPostStatus } from '../types';

interface PressFormProps {
  logoId?: string | number; // Treating logoId internally as the BlogPost ID
}

export function PressForm({ logoId: postId }: PressFormProps) {
  const router = useRouter();
  const isEditing = !!postId;
  
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeFeaturedImage, setRemoveFeaturedImage] = useState(false);
  const [slugModified, setSlugModified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    youtubeUrl: '',
    status: 'DRAFT',
    publishedAt: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
  });

  // Load post for editing
  useEffect(() => {
    if (isEditing) {
      loadPost();
    }
  }, [postId]);

  async function loadPost() {
    setIsLoading(true);
    try {
      const data = await pressApi.getBlogPostById(postId!);
      if (data) {
        // Format dates for inputs
        let formattedDate = '';
        if (data.publishedAt) {
          formattedDate = new Date(data.publishedAt).toISOString().slice(0, 16);
        }
        
        setFormData({
          ...data,
          excerpt: data.excerpt || '',
          youtubeUrl: data.youtubeUrl || '',
          publishedAt: formattedDate,
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          keywords: data.keywords || '',
        });
        
        if (data.featuredImage) {
          setImagePreview(data.featuredImage);
        }
        setSlugModified(true); // Don't auto-regenerate slug for existing posts
      } else {
        alert('Blog post not found.');
        router.push('/admin/content/press');
      }
    } catch (error) {
      console.error('Failed to load blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to slugify text
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters except -
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start
      .replace(/-+$/, ''); // Trim - from end
  };

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-generate slug if user hasn't manually edited it
      if (name === 'title' && !slugModified) {
        updated.slug = slugify(value);
      }
      
      return updated;
    });

    if (name === 'slug') {
      setSlugModified(true);
    }

    // Clear validation error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSlugBlur = () => {
    if (!formData.slug && formData.title) {
      setFormData(prev => ({ ...prev, slug: slugify(prev.title || '') }));
      setSlugModified(false);
    } else if (formData.slug) {
      setFormData(prev => ({ ...prev, slug: slugify(prev.slug || '') }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveFeaturedImage(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setRemoveFeaturedImage(true);
    
    // Clear input element
    const fileInput = document.getElementById('featuredImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    if (!formData.content || formData.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters long';
    }
    if (formData.slug) {
      const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!SLUG_REGEX.test(formData.slug)) {
        newErrors.slug = 'Slug must be lowercase letters, numbers, and hyphens only';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const payload = new FormData();
      
      if (selectedFile) {
        payload.append('featuredImage', selectedFile);
      }
      
      payload.append('title', formData.title || '');
      payload.append('slug', formData.slug || '');
      payload.append('content', formData.content || '');
      payload.append('status', formData.status || 'DRAFT');
      
      if (formData.excerpt) payload.append('excerpt', formData.excerpt);
      if (formData.youtubeUrl) payload.append('youtubeUrl', formData.youtubeUrl);
      if (formData.metaTitle) payload.append('metaTitle', formData.metaTitle);
      if (formData.metaDescription) payload.append('metaDescription', formData.metaDescription);
      if (formData.keywords) payload.append('keywords', formData.keywords);
      
      if (formData.status === 'PUBLISHED' && formData.publishedAt) {
        payload.append('publishedAt', new Date(formData.publishedAt).toISOString());
      }
      
      if (isEditing) {
        payload.append('removeFeaturedImage', removeFeaturedImage.toString());
        await pressApi.updateBlogPost(postId!, payload);
      } else {
        await pressApi.createBlogPost(payload);
      }

      setIsLoading(false);
      router.push('/admin/content/press');
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message || 'Failed to save press post. Check slug uniqueness or field validations.');
    }
  };

  if (isLoading && isEditing) {
    return (
      <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
        <svg className="animate-spin w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading article data...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
      
      {/* Left Columns - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Core details */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-lg font-bold border-b border-border pb-3">Article Content</h3>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Post Title *
              </label>
              <input 
                required
                type="text" 
                name="title" 
                value={formData.title || ''} 
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.title ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Phoenix Redefines Mega Live Concert Production in India..."
              />
              {errors.title && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Slug (URL Path) *
              </label>
              <div className="flex rounded-xl overflow-hidden border border-border bg-background">
                <span className="inline-flex items-center px-3 bg-muted border-r border-border text-xs text-muted-foreground font-mono">
                  /press/
                </span>
                <input 
                  required
                  type="text" 
                  name="slug" 
                  value={formData.slug || ''} 
                  onChange={handleInputChange}
                  onBlur={handleSlugBlur}
                  className={`flex-1 px-4 py-2.5 bg-transparent border-0 text-sm focus:outline-none focus:ring-0 font-mono`}
                  placeholder="phoenix-redefines-concert-production"
                />
              </div>
              {errors.slug && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.slug}</p>}
              <p className="text-[10px] text-muted-foreground mt-1">
                URL path for the post. Letters, numbers, and hyphens only.
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Excerpt (Summary)
              </label>
              <textarea 
                name="excerpt" 
                rows={3}
                value={formData.excerpt || ''} 
                onChange={handleInputChange}
                maxLength={500}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                placeholder="A brief summary of this press release or announcement to show on lists and previews..."
              />
              <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1 font-semibold">
                <span>Recommended: under 160 characters.</span>
                <span>{(formData.excerpt || '').length}/500</span>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Body Content *
                </label>
                <div className="flex bg-muted p-0.5 rounded-lg border border-border text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('edit')}
                    className={`px-3 py-1 rounded-md transition-all font-semibold ${
                      activeTab === 'edit' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-md transition-all font-semibold ${
                      activeTab === 'preview' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {activeTab === 'edit' ? (
                <div>
                  <textarea 
                    required
                    name="content" 
                    rows={12}
                    value={formData.content || ''} 
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-sans leading-relaxed ${
                      errors.content ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Write the article content here. You can use standard formatting. Add detailed reports, press copy, or descriptions..."
                  />
                  {errors.content && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.content}</p>}
                </div>
              ) : (
                <div className="border border-border rounded-xl p-5 bg-muted/20 min-h-[300px] max-h-[450px] overflow-y-auto prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {formData.content ? (
                    formData.content
                  ) : (
                    <span className="text-muted-foreground/60 italic font-semibold">Nothing to preview. Start writing in the editor tab!</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Metadata Card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-bold">SEO & Search Optimization</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Meta Title
              </label>
              <input 
                type="text" 
                name="metaTitle" 
                value={formData.metaTitle || ''} 
                onChange={handleInputChange}
                maxLength={70}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Phoenix Press - Event Production in India"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-semibold">
                <span>Optimal length: 50-60 characters.</span>
                <span>{(formData.metaTitle || '').length}/70</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Meta Description
              </label>
              <textarea 
                name="metaDescription" 
                rows={3}
                value={formData.metaDescription || ''} 
                onChange={handleInputChange}
                maxLength={160}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                placeholder="Read our press announcement detailing how Phoenix Infotainment executed a mega concert..."
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-semibold">
                <span>Optimal length: 150-160 characters.</span>
                <span>{(formData.metaDescription || '').length}/160</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Keywords
              </label>
              <input 
                type="text" 
                name="keywords" 
                value={formData.keywords || ''} 
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="press release, concert production, live events, entertainment"
              />
              <p className="text-[10px] text-muted-foreground mt-1 font-semibold">Comma-separated tags.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Media & Settings */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Publish settings */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-lg font-bold border-b border-border pb-3">Publish Settings</h3>
          
          <div className="space-y-4">
            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Status
              </label>
              <select 
                name="status" 
                value={formData.status || 'DRAFT'} 
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">
                Draft: Visible only in admin. Published: Live on website immediately. Archived: Hidden.
              </p>
            </div>

            {/* Published At Date picker */}
            {formData.status === 'PUBLISHED' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Publication Date
                </label>
                <input 
                  type="datetime-local" 
                  name="publishedAt" 
                  value={formData.publishedAt || ''} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Leave blank to set publish date to current time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Media Featured Image */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-lg font-bold border-b border-border pb-3">Featured Image</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Image File (Landscape Recommended)
              </label>
              
              <div className="relative group border-2 border-dashed border-border hover:border-primary/50 transition-all rounded-2xl overflow-hidden bg-muted/10 p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]">
                <input 
                  id="featuredImage"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {imagePreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="py-4 space-y-2 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary block">Click to upload image</span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">PNG, JPG, JPEG up to 5MB</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {imagePreview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="w-full py-2 bg-red-500/10 hover:bg-red-500/15 text-red-500 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Image
              </button>
            )}
          </div>
        </div>

        {/* Video / YouTube Integration */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-lg font-bold border-b border-border pb-3">Video Integration</h3>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              YouTube Video URL (Optional)
            </label>
            <input 
              type="url" 
              name="youtubeUrl" 
              value={formData.youtubeUrl || ''} 
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-xs"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {formData.youtubeUrl && (
              <div className="mt-4 rounded-xl overflow-hidden border border-border bg-muted/30 p-2 flex flex-col items-center">
                <span className="text-[10px] text-muted-foreground font-semibold mb-2 self-start">Attached Video Stream</span>
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${formData.youtubeUrl.split('v=')[1]?.split('&')[0] || formData.youtubeUrl.split('/').pop()?.split('?')[0]}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Actions Toolbar - Sticky */}
      <div className="lg:col-span-3 flex justify-end gap-4 sticky bottom-6 bg-background/85 backdrop-blur-md p-4 rounded-2xl border border-border shadow-lg z-20 transition-all">
        <button 
          type="button" 
          disabled={isLoading}
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-border hover:bg-muted rounded-xl text-sm font-bold text-foreground transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving Post...
            </>
          ) : (
            isEditing ? 'Update Press Post' : 'Publish Press Post'
          )}
        </button>
      </div>

    </form>
  );
}
