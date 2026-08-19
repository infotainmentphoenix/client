'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { faqApi } from '../api';
import { Faq, FaqCategory } from '../types';

interface FaqFormProps {
  faqId?: string | number;
}

export function FaqForm({ faqId }: FaqFormProps) {
  const router = useRouter();
  const isEditing = !!faqId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  
  const [formData, setFormData] = useState<Partial<Faq>>({
    question: '',
    answer: '',
    categoryId: 0,
    serviceId: 0,
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadFaq();
    }
  }, [faqId]);

  const loadCategories = async () => {
    const data = await faqApi.getCategories(true);
    setCategories(data);
    if (!isEditing && data.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: data[0].id }));
    }
  };

  const loadFaq = async () => {
    setIsLoading(true);
    const data = await faqApi.getFaq(faqId!);
    if (data) {
      setFormData({
        ...data,
        categoryId: data.categoryId || 0,
        serviceId: data.serviceId || 0,
      });
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number' || name === 'categoryId' || name === 'serviceId') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || (name === 'sortOrder' ? 0 : undefined) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { ...formData };
    if (payload.categoryId === 0) payload.categoryId = undefined;
    if (payload.serviceId === 0) payload.serviceId = undefined;

    let result;
    if (isEditing) {
      result = await faqApi.updateFaq(faqId!, payload);
    } else {
      result = await faqApi.createFaq(payload);
    }

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/faqs');
    } else {
      alert('Failed to save FAQ. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading FAQ data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">FAQ Details</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Question *</label>
            <input 
              required
              type="text" 
              name="question" 
              value={formData.question || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. How far in advance should I book an artist?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Answer *</label>
            <textarea 
              required
              name="answer" 
              rows={5}
              value={formData.answer || ''} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide a clear and concise answer..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select 
                name="categoryId" 
                value={formData.categoryId || 0} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>No Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Link to Service (Optional ID)</label>
              <input 
                type="number" 
                name="serviceId" 
                value={formData.serviceId || ''} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 1"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">If this FAQ belongs to a specific service, enter the Service ID.</p>
            </div>

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
                  <div className="font-medium text-sm">Active</div>
                  <div className="text-xs text-gray-500">Visible to users.</div>
                </div>
              </label>
            </div>
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
          {isLoading ? 'Saving...' : (isEditing ? 'Update FAQ' : 'Create FAQ')}
        </button>
      </div>
    </form>
  );
}
