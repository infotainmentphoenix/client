'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon13 } from '@/components/icons/MarketingIcons';


export default function BookConsultationPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contact');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="flex flex-col items-center gap-3 text-center">
        <Icon13 className="animate-spin h-8 w-8 text-orange-500" />
        <span className="text-gray-500 text-sm font-medium">Redirecting to Contact Us...</span>
      </div>
    </div>
  );
}
