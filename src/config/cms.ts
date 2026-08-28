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
  carousels: {
    singular: 'Carousel Slide',
    plural: 'Carousels',
    apiEndpoint: '/api/carousels',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'imageUrl', label: 'Image URL', type: 'image', required: true },
      { name: 'linkUrl', label: 'Button Link', type: 'text' },
      { name: 'buttonText', label: 'Button Text', type: 'text' },
    ],
  },
  faqs: {
    singular: 'FAQ',
    plural: 'FAQs',
    apiEndpoint: '/api/faqs',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'rich-text', required: true },
      { name: 'category', label: 'Category', type: 'text' },
    ],
  },
  gallery: {
    singular: 'Media Item',
    plural: 'Media Gallery',
    apiEndpoint: '/api/gallery',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'imageUrl', label: 'Image URL', type: 'image', required: true },
      { name: 'category', label: 'Category', type: 'text' },
    ],
  },
  pages: {
    singular: 'Site Page',
    plural: 'Site Pages & Settings',
    apiEndpoint: '/api/pages',
    fields: [
      { name: 'title', label: 'Page Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'content', label: 'Content', type: 'rich-text' },
    ],
  },
  press: {
    singular: 'Press/Partner',
    plural: 'Press & Partners',
    apiEndpoint: '/api/press',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'logoUrl', label: 'Logo URL', type: 'image', required: true },
      { name: 'linkUrl', label: 'Website URL', type: 'text' },
    ],
  },
  team: {
    singular: 'Team Member',
    plural: 'Team Roster',
    apiEndpoint: '/api/team',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'bio', label: 'Biography', type: 'textarea' },
      { name: 'imageUrl', label: 'Profile Image', type: 'image' },
    ],
  },
  testimonials: {
    singular: 'Testimonial',
    plural: 'Testimonials',
    apiEndpoint: '/api/testimonials',
    fields: [
      { name: 'clientName', label: 'Client Name', type: 'text', required: true },
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'event', label: 'Associated Event', type: 'text' },
      { name: 'rating', label: 'Rating (1-5)', type: 'text' },
    ],
  },
};

export const getEntityConfig = (entityKey: string): CMSEntityConfig | null => {
  return CMS_CONFIG[entityKey] || null;
};
