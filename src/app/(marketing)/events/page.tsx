'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { eventApi } from '@/features/events/api';
import { Event, EventType } from '@/features/events/types';
import { Icon8, Icon21, Icon9, Icon22, Icon23 } from '@/components/icons/MarketingIcons';


const SearchIcon = ({ className }: { className?: string }) => (
  <Icon8 className={className} />
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <Icon21 className={className} />
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <Icon9 className={className} />
);
const UsersIcon = ({ className }: { className?: string }) => (
  <Icon22 className={className} />
);
const SparklesIcon = ({ className }: { className?: string }) => (
  <Icon23 className={className} />
);

const eventTypeLabels: Record<string, string> = {
  CORPORATE: 'Corporate Gala', WEDDING: 'Royal Wedding', ENTERTAINMENT: 'Live Show',
  FESTIVAL: 'Music Festival', CONCERT: 'Stadium Concert', PRIVATE_PARTY: 'Private VIP Party',
  AWARDS_CEREMONY: 'Awards Ceremony', PRODUCT_LAUNCH: 'Product Launch', OTHER: 'Special Event',
};

const eventTypeColors: Record<string, string> = {
  CORPORATE: 'bg-blue-600', WEDDING: 'bg-rose-600', ENTERTAINMENT: 'bg-purple-600',
  FESTIVAL: 'bg-amber-600', CONCERT: 'bg-red-600', PRIVATE_PARTY: 'bg-emerald-600',
  AWARDS_CEREMONY: 'bg-yellow-600', PRODUCT_LAUNCH: 'bg-cyan-600', OTHER: 'bg-gray-600',
};

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return dateStr; }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await eventApi.getEvents({ limit: 100 });
      setEvents(data.filter(e => e.isActive));
      setIsLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = events;
    if (selectedType) {
      list = list.filter(e => e.eventType === selectedType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.brief?.toLowerCase().includes(q) ||
        e.city?.toLowerCase().includes(q) ||
        e.venue?.toLowerCase().includes(q) ||
        e.clientName?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [events, selectedType, search]);

  const availableTypes = useMemo(() => {
    const types = new Set(events.map(e => e.eventType).filter(Boolean));
    return Array.from(types) as string[];
  }, [events]);

  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-[#0a0a0a] text-white pt-32 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
              <SparklesIcon className="w-3.5 h-3.5" /> Event Portfolio Showcase
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
              Crafting Legendary{' '}
              <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                Live Experiences
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
              Explore stadium concerts, royal destination weddings, and mega corporate galas executed with unmatched precision.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search events, cities, venues..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-orange-500 rounded-xl text-sm outline-none transition-colors text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0 w-full pb-1">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${!selectedType ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
            >
              All Events ({events.length})
            </button>
            {availableTypes.map(type => {
              const count = events.filter(e => e.eventType === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === type ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                >
                  {eventTypeLabels[type] || type} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse h-[400px]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-gray-500 dark:text-gray-400">No events found matching your criteria.</p>
            <button
              onClick={() => { setSearch(''); setSelectedType(null); }}
              className="mt-4 text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(event => {
              const typeColor = event.eventType ? eventTypeColors[event.eventType] || 'bg-gray-600' : 'bg-gray-600';
              const typeLabel = event.eventType ? eventTypeLabels[event.eventType] || event.eventType : 'Event';
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Cover Image Container */}
                  <div className="relative h-60 bg-gradient-to-br from-orange-950 via-gray-900 to-black overflow-hidden">
                    {event.coverImage ? (
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CalendarIcon className="w-16 h-16 text-orange-500/30" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Type Badge */}
                    <span className={`absolute top-4 left-4 px-3 py-1 ${typeColor} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {typeLabel}
                    </span>

                    { }
                    {event.featured && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        ★ Featured
                      </span>
                    )}

                    { }
                    {event.city && (
                      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/10">
                        <MapPinIcon className="w-3.5 h-3.5 text-orange-400" />
                        <span>{event.city}</span>
                      </div>
                    )}
                  </div>

                  { }
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1 mb-2">
                        {event.title}
                      </h3>
                      {event.brief ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-light">
                          {event.brief}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          Seamlessly orchestrated event production by Phoenix.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-400">
                      {event.eventDate ? (
                        <span className="flex items-center gap-1 font-medium text-gray-300">
                          <CalendarIcon className="w-3.5 h-3.5 text-orange-400" />
                          {formatDate(event.eventDate)}
                        </span>
                      ) : (
                        <span>Exclusive Production</span>
                      )}

                      {event.attendees && (
                        <span className="flex items-center gap-1 bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full font-bold">
                          <UsersIcon className="w-3.5 h-3.5" />
                          {event.attendees}+ Attendees
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      { }
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-rose-600 to-purple-700 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Ready to Create an Unforgettable Event?
          </h2>
          <p className="text-lg text-white/90 mb-8 font-light leading-relaxed">
            Partner with Phoenix Infotainment for stadium staging, celebrity artist lineups, and world-class audiovisual production.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-base rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
          >
            Contact Us &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
