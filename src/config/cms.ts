export type FieldType = 'text' | 'textarea' | 'image' | 'date' | 'boolean' | 'rich-text';

export interface CMSField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export interface CMSEntityConfig {
  singular: string;
  plural: string;
  apiEndpoint: string;
  fields: CMSField[];
}

export const CMS_CONFIG: Record<string, CMSEntityConfig> = {
  artists: {
    singular: 'Artist',
    plural: 'Artists',
    apiEndpoint: '/api/artists',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'bio', label: 'Biography', type: 'rich-text' },
      { name: 'image', label: 'Profile Image', type: 'image' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
    ],
  },
  events: {
    singular: 'Event',
    plural: 'Events',
    apiEndpoint: '/api/events',
    fields: [
      { name: 'title', label: 'Event Title', type: 'text', required: true },
      { name: 'date', label: 'Event Date', type: 'date', required: true },
      { name: 'description', label: 'Description', type: 'rich-text' },
      { name: 'location', label: 'Location', type: 'text' },
    ],
  },
  services: {
    singular: 'Service',
    plural: 'Services',
    apiEndpoint: '/api/services',
    fields: [
      { name: 'name', label: 'Service Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'price', label: 'Starting Price', type: 'text' },
    ],
  },
  // Add other entities here easily (testimonials, press, gallery, etc.)
};

export const getEntityConfig = (entityKey: string): CMSEntityConfig | null => {
  return CMS_CONFIG[entityKey] || null;
};
