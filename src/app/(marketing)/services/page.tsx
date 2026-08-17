'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { serviceApi } from '@/features/services/api';
import { Service } from '@/features/services/types';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const data = await serviceApi.getServices();
      setServices(data.filter(s => s.isActive !== false));
      setIsLoading(false);
    };
    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-gray-50 dark:from-orange-950/20 dark:via-black dark:to-black pt-32 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            World-Class Event Solutions
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Services That Elevate <br />
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              Every Live Experience
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            From A-list celebrity bookings to stadium acoustic engineering and luxury wedding decor, explore our full spectrum of event services.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-2xl hover:opacity-95 transition-all shadow-xl flex items-center gap-2"
            >
              Contact Us <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {}
                  <div className="relative h-56 overflow-hidden bg-gray-900">
                    <img
                      src={service.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {service.featured && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-amber-500/90 backdrop-blur text-white text-xs font-bold rounded-full flex items-center gap-1 shadow">
                        <StarIcon className="w-3 h-3" /> Featured
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors">
                        {service.name}
                      </h3>
                      {service.tagline && (
                        <p className="text-xs text-orange-200/90 line-clamp-1 mt-0.5 font-medium">
                          {service.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {}
                    {service.packages && service.packages.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Available Packages:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.packages.slice(0, 3).map((pkg) => (
                            <span key={pkg.id} className="px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold rounded-lg border border-orange-200 dark:border-orange-500/20">
                              {pkg.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {}
                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-white/5 mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex-1 text-center py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-xl hover:opacity-90 transition-opacity"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="px-4 py-3 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-sm rounded-xl hover:bg-orange-200 dark:hover:bg-orange-500/20 transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {}
      <section className="bg-white dark:bg-white/5 border-y border-gray-200 dark:border-white/5 py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-black mb-4">Why Choose Phoenix Infotainment?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-12">
            We deliver flawless execution, direct celebrity contracts, and unmatched production values across India & abroad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
              <CheckCircleIcon className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Direct Artist Rosters</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Direct access to Bollywood celebrities, singers, and international DJs without middleman markups.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
              <CheckCircleIcon className="w-8 h-8 text-rose-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">End-to-End Production</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">From Line Array sound to 3D LED mapping and security, we manage 100% of event technical execution.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
              <CheckCircleIcon className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">100+ High Profile Events</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Trusted by Fortune 500 brands, stadium concert promoters, and luxury royal families.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to Plan Your Next Masterpiece?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg mb-8">
            Tell us about your event vision and our lead event director will structure a customized proposal.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
