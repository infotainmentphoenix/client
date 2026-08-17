'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { serviceApi } from '@/features/services/api';
import { Service } from '@/features/services/types';

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>
);

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setIsLoading(true);
      const data = await serviceApi.getServiceBySlug(slug);
      setService(data);
      setIsLoading(false);
    };
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-black">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
        <p className="text-gray-500 mb-8">The service you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {}
      <section className="relative h-[50vh] md:h-[60vh] bg-gradient-to-br from-gray-950 via-orange-950 to-black overflow-hidden">
        {service.coverImage ? (
          <img
            src={service.coverImage}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.2),transparent_70%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 md:px-8 pb-12">
            <span className="inline-block px-3.5 py-1 bg-orange-500/20 backdrop-blur text-orange-400 border border-orange-500/30 text-xs font-bold rounded-full mb-4">
              Service Overview
            </span>
            <h1 className="text-3xl md:text-6xl font-black text-white mb-3 max-w-4xl">
              {service.name}
            </h1>
            {service.tagline && (
              <p className="text-lg md:text-xl text-orange-200/90 font-medium max-w-2xl">
                {service.tagline}
              </p>
            )}
          </div>
        </div>
      </section>

      {}
      <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/services" className="hover:text-orange-600 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{service.name}</span>
          </nav>
        </div>
      </div>

      {}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {}
          <div className="lg:col-span-2 space-y-12">
            {}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-4">About {service.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {}
            {service.packages && service.packages.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-black">Available Service Packages</h2>
                  <p className="text-gray-500 text-sm mt-1">Select a package tailored to your budget and event scale.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative bg-white dark:bg-white/5 border rounded-3xl p-6 flex flex-col justify-between transition-all ${
                        pkg.isPopular
                          ? 'border-orange-500 shadow-xl dark:shadow-[0_0_30px_rgba(249,115,22,0.15)] ring-1 ring-orange-500'
                          : 'border-gray-200 dark:border-white/10 hover:border-orange-500/50'
                      }`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded-full shadow flex items-center gap-1">
                          <SparklesIcon className="w-3 h-3" /> Most Popular
                        </span>
                      )}

                      <div>
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">{pkg.description}</p>
                        
                        {pkg.priceLabel && (
                          <div className="mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                            <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                              {pkg.priceLabel}
                            </span>
                          </div>
                        )}

                        <div className="space-y-3 mb-8">
                          {pkg.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                              <CheckIcon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/contact?service=${service.slug}&package=${encodeURIComponent(pkg.name)}`}
                        className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-all ${
                          pkg.isPopular
                            ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white hover:opacity-95 shadow-lg'
                            : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90'
                        }`}
                      >
                        Book Package
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-black mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {service.faqs.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full p-5 text-left flex items-center justify-between font-bold text-base"
                        >
                          <span>{faq.question}</span>
                          <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-white/5 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-500/10 via-rose-500/5 to-purple-600/10 dark:from-orange-500/20 dark:via-rose-500/10 dark:to-purple-600/20 border border-orange-500/20 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl sticky top-28 text-center">
              <span className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl mx-auto mb-4">✨</span>
              <h3 className="text-xl font-black mb-2 text-gray-900 dark:text-white">Request Consultation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-6 leading-relaxed">
                Want to book {service.name} or get a custom quote? Send us your requirements and we will respond within 24 hours.
              </p>

              <Link
                href={`/contact?service=${service.slug}`}
                className="block w-full py-4 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm cursor-pointer"
              >
                Inquire About Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
