'use client';

import { CarouselList } from '@/features/carousel/components/CarouselList';

export default function AdminSettingsCarouselsPage() {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
      <CarouselList />
    </div>
  );
}
