export interface FaqCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  categoryId?: number;
  serviceId?: number;
  sortOrder: number;
  isActive: boolean;
  category?: FaqCategory;
  createdAt: string;
  updatedAt: string;
}
