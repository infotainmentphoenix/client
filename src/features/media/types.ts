export type MediaType = 'image' | 'video' | 'document';

export interface MediaFile {
  id: number;
  name: string;
  type: MediaType;
  size: string; 
  sizeInBytes: number;
  date: string; 
  url: string;
}
