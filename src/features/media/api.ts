import { MediaFile } from './types';

const MEDIA_KEY = 'mock_media_library';

const initialMedia: MediaFile[] = [
  { id: 1, name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', sizeInBytes: 2516582, date: '2024-03-15', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 2, name: 'artist-profile-1.png', type: 'image', size: '1.1 MB', sizeInBytes: 1153433, date: '2024-03-14', url: 'https://images.unsplash.com/photo-1516280440502-6c245958bd85?w=800&q=80' },
  { id: 3, name: 'event-wedding-2023.jpg', type: 'image', size: '3.5 MB', sizeInBytes: 3670016, date: '2024-03-10', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { id: 4, name: 'promo-video-draft.mp4', type: 'video', size: '24.5 MB', sizeInBytes: 25690112, date: '2024-03-08', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80' },
  { id: 5, name: 'corporate-logo.svg', type: 'image', size: '150 KB', sizeInBytes: 153600, date: '2024-03-01', url: 'https://images.unsplash.com/photo-1561489422-45de3d015e3e?w=800&q=80' },
  { id: 6, name: 'service-brochure.pdf', type: 'document', size: '5.2 MB', sizeInBytes: 5452595, date: '2024-02-28', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80' },
];

const getMediaData = (): MediaFile[] => {
  if (typeof window === 'undefined') return initialMedia;
  const data = localStorage.getItem(MEDIA_KEY);
  if (!data) {
    localStorage.setItem(MEDIA_KEY, JSON.stringify(initialMedia));
    return initialMedia;
  }
  return JSON.parse(data);
};

const saveMediaData = (data: MediaFile[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MEDIA_KEY, JSON.stringify(data));
  }
};

export const mediaApi = {
  getMedia: async (): Promise<MediaFile[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getMediaData());
      }, 500);
    });
  },

  uploadMedia: async (file: File): Promise<MediaFile> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return reject('Environment error');
      
      const current = getMediaData();
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result as string;
        
        let type: 'image' | 'video' | 'document' = 'document';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('video/')) type = 'video';
        
        const sizeInMb = file.size / (1024 * 1024);
        const sizeLabel = sizeInMb > 1 ? `${sizeInMb.toFixed(1)} MB` : `${(file.size / 1024).toFixed(0)} KB`;
        
        const newMedia: MediaFile = {
          id: Date.now(),
          name: file.name,
          type,
          size: sizeLabel,
          sizeInBytes: file.size,
          date: new Date().toISOString().split('T')[0],
          url: base64Url,
        };
        
        saveMediaData([newMedia, ...current]);
        resolve(newMedia);
      };
      
      reader.onerror = () => reject('Failed to read file');
      reader.readAsDataURL(file);
    });
  },

  deleteMedia: async (id: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const current = getMediaData();
        saveMediaData(current.filter(m => m.id !== id));
        resolve();
      }, 500);
    });
  }
};
