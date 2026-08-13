'use client';

import { use } from 'react';
import { CarouselForm } from '@/features/carousel/components/CarouselForm';

export default function AdminEditCarouselPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <CarouselForm id={resolvedParams.id} />;
}
