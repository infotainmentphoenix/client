'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { eventApi } from '@/features/events/api';
import { Event } from '@/features/events/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export function LiveEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      const data = await eventApi.getEvents({ limit: 6 });
      if (isMounted) {
        setEvents(data);
        setLoading(false);
      }
    };
    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-8 py-20 relative z-10">
      {}
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Live & Upcoming Productions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Featured Event Showcases
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base mt-2 max-w-xl font-light">
            From stadium music festivals to royal destination weddings, discover our latest high-octane productions.
          </p>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold text-xs transition-all border border-gray-200 dark:border-white/10 self-start md:self-auto"
        >
          View All Events <ArrowUpRightIcon />
        </Link>
      </ScrollReveal>

      {}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 rounded-3xl bg-gray-200/50 dark:bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-gray-50/50 dark:bg-white/5 rounded-3xl border border-gray-200/50 dark:border-white/10">
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
            Explore our curated event archives and upcoming concert schedules.
          </p>
          <Link
            href="/events"
            className="inline-block mt-4 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-full shadow-lg"
          >
            Browse Event Roster
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 100}>
              <Link
                href={`/events/${item.slug || item.id}`}
                className="group relative flex flex-col h-[420px] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#0a0a0c] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url("${
                      item.coverImage ||
                      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
                    }")`,
                  }}
                />

                {}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {}
                <div className="relative z-10 p-6 flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {item.eventType || 'LIVE EVENT'}
                  </span>

                  {item.eventDate && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-200 text-xs font-semibold">
                      <CalendarIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        {new Date(item.eventDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {}
                <div className="relative z-10 mt-auto p-6 flex flex-col justify-end space-y-2">
                  {(item.venue || item.city) && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      <span>{[item.venue, item.city].filter(Boolean).join(', ')}</span>
                    </div>
                  )}

                  <h3 className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors leading-tight tracking-tight line-clamp-2">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-gray-300 line-clamp-2 font-light">
                      {item.description}
                    </p>
                  )}

                  <div className="pt-3 flex items-center justify-between text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    <span>Explore Showcase</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
