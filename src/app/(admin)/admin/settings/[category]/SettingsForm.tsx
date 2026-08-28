'use client';

import React, { useState, useEffect } from 'react';
import { SettingsCategoryConfig } from '@/config/settings';
import { siteSettingsApi } from '@/features/site-settings/api';

interface SettingsFormProps {
  config: SettingsCategoryConfig;
  category: string;
}

export function SettingsForm({ config, category }: SettingsFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [category]);

  async function loadSettings() {
    setIsLoading(true);
    const data = await siteSettingsApi.getSiteSettings();
    
    // Initialize form data with existing values for the fields in this category
    const initialData: Record<string, string> = {};
    config.fields.forEach(field => {
      initialData[field.name] = data[field.name] || '';
    });
    
    setFormData(initialData);
    setIsLoading(false);
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: typeof value === 'boolean' ? value.toString() : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = Object.entries(formData).map(([key, value]) => {
      const fieldConfig = config.fields.find(f => f.name === key);
      return {
        key,
        value,
        type: fieldConfig?.type || 'string'
      };
    });

    try {
      await siteSettingsApi.bulkUpsertSettings(payload);
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading settings...</div>;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {config.fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          {field.description && (
            <p className="text-xs text-gray-500 mb-2">{field.description}</p>
          )}
          
          {field.type === 'textarea' ? (
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
              rows={4}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.type === 'boolean' ? (
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData[field.name] === 'true'}
              onChange={(e) => handleChange(field.name, e.target.checked)}
            />
          ) : (
            <input
              type={field.type === 'color' ? 'color' : 'text'}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border ${field.type === 'color' ? 'h-10' : ''}`}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </form>
  );
}
