export interface Carousel {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  imageUrl: string;
  imageFieldId?: string | null;
  linkUrl?: string | null;
  buttonText?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarouselFormData {
  title?: string;
  subtitle?: string;
  linkUrl?: string;
  buttonText?: string;
  sortOrder?: number;
  isActive?: boolean;
  image?: File | null;
}
