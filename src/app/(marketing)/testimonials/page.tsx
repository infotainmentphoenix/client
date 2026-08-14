'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { testimonialApi } from '@/features/testimonials/api';
import { Testimonial } from '@/features/testimonials/types';

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
);
const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="6 3 20 12 6 21 6 3"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      const data = await testimonialApi.getTestimonials();
      setTestimonials(data);
      setIsLoading(false);
    };
    loadTestimonials();
  }, []);

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'ALL') return testimonials;
    return testimonials.filter(t => t.category.toUpperCase() === activeCategory.toUpperCase());
  }, [testimonials, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-gray-50 dark:from-amber-950/20 dark:via-black dark:to-black pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            <StarIcon className="w-4 h-4 text-amber-500" /> Verified Client & Artist Feedback
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Trusted By Global Brands & <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Celebrity Performers
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Read real stories from corporate VPs, royal wedding families, and playback singers about their experience with Phoenix Infotainment.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl">
            <div>
              <p className="text-3xl font-black text-amber-500">100+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Mega Events Produced</p>
            </div>
            <div>
              <p className="text-3xl font-black text-orange-500">500K+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Audience Reached</p>
            </div>
            <div>
              <p className="text-3xl font-black text-rose-500">5.0 ★</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-black text-purple-500">99%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Repeat Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Reviews' },
            { id: 'CORPORATE', label: 'Corporate Galas' },
            { id: 'WEDDINGS', label: 'Royal Weddings' },
            { id: 'CONCERTS', label: 'Music Festivals' },
            { id: 'CELEBRITIES', label: 'Celebrity Performers' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Background Decor */}
                <div className="absolute top-6 right-6 text-amber-500/10 dark:text-amber-500/20 group-hover:scale-110 transition-transform">
                  <QuoteIcon className="w-16 h-16" />
                </div>

                <div>
                  {/* Category Badge & Rating */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>

                  {/* Event Title */}
                  {item.eventTitle && (
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                      Event: {item.eventTitle}
                    </h3>
                  )}

                  {/* Quote */}
                  <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed italic mb-8 relative z-10">
                    &quot;{item.clientQuote}&quot;
                  </p>
                </div>

                {/* Client Profile Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={item.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30 shrink-0"
                    />
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                        {item.clientName}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.designation}{item.company ? ` • ${item.company}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Video Trigger Button */}
                  {item.videoUrl && (
                    <button
                      onClick={() => setActiveVideoModal(item.videoUrl!)}
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-transform hover:scale-110"
                      title="Watch Video Review"
                    >
                      <PlayIcon className="w-4 h-4 ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={`${activeVideoModal}?autoplay=1`}
                title="Client Video Review"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Experience The Phoenix Standard</h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg mb-8">
            Join hundreds of satisfied corporate partners and families who trust us for their mega event executions.
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
