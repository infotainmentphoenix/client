export type MediaType = 'image' | 'video' | 'document';

export interface MediaFile {
  id: number;
  name: string;
  type: MediaType;
  size: string; // e.g., '2.4 MB'
  sizeInBytes: number;
  date: string; // e.g., '2024-03-15'
  url: string;
}
