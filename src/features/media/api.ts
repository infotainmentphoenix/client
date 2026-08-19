import { MediaFile } from './types';

const MEDIA_KEY = 'mock_media_library';

const initialMedia: MediaFile[] = [];

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
