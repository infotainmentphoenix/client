export interface SettingsField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'color' | 'boolean';
  description?: string;
}

export interface SettingsCategoryConfig {
  title: string;
  description: string;
  apiEndpoint: string;
  fields: SettingsField[];
}

export const SETTINGS_CONFIG: Record<string, SettingsCategoryConfig> = {
  seo: {
    title: 'Global SEO Settings',
    description: 'Manage default metadata for the public site.',
    apiEndpoint: '/api/settings/seo',
    fields: [
      { name: 'defaultTitle', label: 'Default Site Title', type: 'text' },
      { name: 'defaultDescription', label: 'Default Description', type: 'textarea' },
      { name: 'defaultOgImage', label: 'Default OpenGraph Image', type: 'image' },
    ],
  },
  site: {
    title: 'Site Identity',
    description: 'Core brand assets and global site configuration.',
    apiEndpoint: '/api/settings/site',
    fields: [
      { name: 'siteName', label: 'Site Name', type: 'text' },
      { name: 'primaryColor', label: 'Primary Brand Color', type: 'color' },
      { name: 'favicon', label: 'Favicon', type: 'image' },
    ],
  },
  'social-links': {
    title: 'Social Media Links',
    description: 'URLs for company social profiles.',
    apiEndpoint: '/api/settings/social-links',
    fields: [
      { name: 'instagramUrl', label: 'Instagram URL', type: 'text' },
      { name: 'twitterUrl', label: 'Twitter / X URL', type: 'text' },
      { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
    ],
  },
};

export const getSettingsConfig = (categoryKey: string): SettingsCategoryConfig | null => {
  return SETTINGS_CONFIG[categoryKey] || null;
};
