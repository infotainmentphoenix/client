'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { eventApi } from '@/features/events/api';
import { Event } from '@/features/events/types';

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
);

const eventTypeLabels: Record<string, string> = {
  CORPORATE: 'Corporate', WEDDING: 'Wedding', ENTERTAINMENT: 'Entertainment',
  FESTIVAL: 'Festival', CONCERT: 'Concert', PRIVATE_PARTY: 'Private Party',
  AWARDS_CEREMONY: 'Awards Ceremony', PRODUCT_LAUNCH: 'Product Launch', OTHER: 'Other',
};

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return dateStr; }
}

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setIsLoading(true);
      // Backend getEventById takes numeric ID, not slug. Fetch all and match by slug.
      const allEvents = await eventApi.getEvents({ limit: 100 });
      const found = allEvents.find(e => e.slug === slug);

      if (found) {
        // Fetch full details with images
        const full = await eventApi.getEvent(found.id);
        setEvent(full);
      }
      setIsLoading(false);
    };
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
        <p className="text-gray-500 mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Link href="/events" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  const location = [event.venue, event.city, event.state].filter(Boolean).join(', ');

  return (
    <>
      {/* Cover Image */}
      <section className="relative h-[45vh] md:h-[55vh] bg-gradient-to-br from-orange-900 via-rose-900 to-black overflow-hidden">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.3),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(244,63,94,0.2),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 md:px-8 pb-10">
            {event.eventType && (
              <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                {eventTypeLabels[event.eventType] || event.eventType}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-white max-w-3xl">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-5 mt-5 text-white/70 text-sm">
              {event.eventDate && (
                <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" />{formatDate(event.eventDate)}</span>
              )}
              {location && (
                <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" />{location}</span>
              )}
              {event.attendees && (
                <span className="flex items-center gap-1.5"><UsersIcon className="w-4 h-4" />{event.attendees}+ attendees</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/events" className="hover:text-orange-600 transition-colors">Events</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{event.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Brief */}
            {event.brief && (
              <div className="p-6 bg-orange-50 dark:bg-orange-500/5 rounded-2xl border border-orange-100 dark:border-orange-500/10">
                <h2 className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-2">The Brief</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.brief}</p>
              </div>
            )}

            {/* Description */}
            {event.description && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Event</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</div>
              </div>
            )}

            {/* Outcome */}
            {event.outcome && (
              <div className="p-6 bg-green-50 dark:bg-green-500/5 rounded-2xl border border-green-100 dark:border-green-500/10">
                <h2 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">The Outcome</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.outcome}</p>
              </div>
            )}

            {/* Gallery */}
            {event.images && event.images.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.images.map(img => (
                    <button key={img.id} onClick={() => setSelectedImage(img.imageUrl)} className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                      <img src={img.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {event.videoUrl && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Event Video</h2>
                <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe src={event.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title="Event Video" />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Event Details</h3>
              {event.eventDate && (
                <div><p className="text-xs text-gray-400 mb-0.5">Date</p><p className="font-medium text-gray-900 dark:text-white">{formatDate(event.eventDate)}{event.endDate ? ` – ${formatDate(event.endDate)}` : ''}</p></div>
              )}
              {location && (
                <div><p className="text-xs text-gray-400 mb-0.5">Location</p><p className="font-medium text-gray-900 dark:text-white">{location}</p></div>
              )}
              {event.attendees && (
                <div><p className="text-xs text-gray-400 mb-0.5">Attendees</p><p className="font-medium text-gray-900 dark:text-white">{event.attendees}+</p></div>
              )}
              {event.clientName && (
                <div><p className="text-xs text-gray-400 mb-0.5">Client</p><p className="font-medium text-gray-900 dark:text-white">{event.clientName}</p></div>
              )}
              <Link href="/book-consultation" className="block w-full text-center py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98]">
                Plan a Similar Event
              </Link>
            </div>

            {/* Client Quote */}
            {event.clientQuote && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/[0.02] border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                <QuoteIcon className="w-8 h-8 text-orange-300 dark:text-orange-500/50 mb-3" />
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed mb-4">{event.clientQuote}</p>
                {event.clientName && <p className="text-sm font-semibold text-gray-900 dark:text-white">— {event.clientName}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
          <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light">✕</button>
        </div>
      )}
    </>
  );
}
