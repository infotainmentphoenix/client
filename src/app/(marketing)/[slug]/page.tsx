'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Icon6 } from '@/components/icons/MarketingIcons';


const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <Icon6 className={className} />
);

export default function CmsPageDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  
  const title = slug
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Page';

  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 mb-8">
            <span className="text-3xl">📄</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
            This page is under construction. Our team is crafting something extraordinary for you. 
            Check back soon for updates!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
