'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookConsultationPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contact');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="flex flex-col items-center gap-3 text-center">
        <svg className="animate-spin h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-gray-500 text-sm font-medium">Redirecting to Contact Us...</span>
      </div>
    </div>
  );
}
