'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { artistApi } from '@/features/artists/api';
import { Artist } from '@/features/artists/types';

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const BadgeCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
);
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const availabilityLabels: Record<string, { text: string; color: string }> = {
  AVAILABLE: { text: 'Available for Booking', color: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400' },
  BUSY: { text: 'Currently Busy', color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400' },
  UNAVAILABLE: { text: 'Unavailable', color: 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400' },
  ON_REQUEST: { text: 'Available on Request', color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400' },
};

const SocialLink = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
    {icon} {label}
  </a>
);

export default function ArtistDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setIsLoading(true);
      // The backend getArtistById takes numeric id, but our slug is a string.
      // We'll fetch all artists and find by slug on the frontend since backend doesn't have a getBySlug endpoint.
      const allArtists = await artistApi.getArtists({ limit: 100 });
      const found = allArtists.find(a => a.slug === slug) || null;
      setArtist(found);

      if (found) {
        const related = allArtists
          .filter(a => a.categoryId === found.categoryId && a.id !== found.id && a.isActive)
          .slice(0, 4);
        setRelatedArtists(related);
      }
      setIsLoading(false);
    };
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Artist Not Found</h1>
        <p className="text-gray-500 mb-8">The artist you're looking for doesn't exist or has been removed.</p>
        <Link href="/artists" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Artists
        </Link>
      </div>
    );
  }

  const avail = availabilityLabels[artist.availability] || availabilityLabels.ON_REQUEST;

  return (
    <>
      {/* Cover / Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-black overflow-hidden">
        {artist.coverImage ? (
          <img src={artist.coverImage} alt={artist.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.3),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.2),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 md:px-8 pb-8 flex items-end gap-6">
            {/* Profile Image */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white dark:border-gray-900 shadow-2xl overflow-hidden bg-purple-200 dark:bg-purple-900 shrink-0 -mb-2">
              {artist.profileImage ? (
                <img src={artist.profileImage} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-purple-400/60">
                  {artist.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-white pb-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-4xl font-black">{artist.name}</h1>
                {artist.verified && <BadgeCheckIcon className="w-6 h-6 text-blue-400" />}
              </div>
              <p className="text-purple-300 text-sm font-medium">{artist.category?.name || 'Artist'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/artists" className="hover:text-purple-600 transition-colors">Artists</Link>
            <span>/</span>
            {artist.category && (
              <>
                <Link href={`/artists/categories/${artist.category.slug}`} className="hover:text-purple-600 transition-colors">{artist.category.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 dark:text-white font-medium">{artist.name}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            {artist.bio && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {artist.bio}
                </div>
              </div>
            )}

            {/* Genres & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.genre && artist.genre.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.genre.map((g, i) => (
                      <span key={i} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-lg">{g}</span>
                    ))}
                  </div>
                </div>
              )}
              {artist.languages && artist.languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.languages.map((l, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg">{l}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Video Showreel */}
            {artist.videoShowreel && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Showreel</h2>
                <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    src={artist.videoShowreel.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    title={`${artist.name} Showreel`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Card */}
            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 space-y-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${avail.color}`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {avail.text}
              </div>

              {artist.priceRange && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Price Range</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{artist.priceRange}</p>
                </div>
              )}

              {artist.experience && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Experience</p>
                  <p className="text-gray-900 dark:text-white font-medium">{artist.experience}</p>
                </div>
              )}

              {artist.basedIn && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{artist.basedIn}</span>
                </div>
              )}

              {artist.bookingNote && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-white/10 pt-4">
                  {artist.bookingNote}
                </p>
              )}

              <Link
                href="/book-consultation"
                className="block w-full text-center py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98]"
              >
                Book This Artist
              </Link>
            </div>

            {/* Social Links */}
            {(artist.instagramUrl || artist.youtubeUrl || artist.spotifyUrl || artist.websiteUrl) && (
              <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Connect</h3>
                <div className="space-y-2">
                  {artist.instagramUrl && (
                    <SocialLink href={artist.instagramUrl} label="Instagram" icon={<span className="text-pink-500">◉</span>} />
                  )}
                  {artist.youtubeUrl && (
                    <SocialLink href={artist.youtubeUrl} label="YouTube" icon={<span className="text-red-500">▶</span>} />
                  )}
                  {artist.spotifyUrl && (
                    <SocialLink href={artist.spotifyUrl} label="Spotify" icon={<span className="text-green-500">♫</span>} />
                  )}
                  {artist.websiteUrl && (
                    <SocialLink href={artist.websiteUrl} label="Website" icon={<span className="text-blue-500">◎</span>} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Artists */}
      {relatedArtists.length > 0 && (
        <section className="bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">More from {artist.category?.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtists.map(ra => (
                <Link
                  key={ra.id}
                  href={`/artists/${ra.slug}`}
                  className="group bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20 overflow-hidden">
                    {ra.profileImage ? (
                      <img src={ra.profileImage} alt={ra.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-black text-purple-300/60 dark:text-purple-500/30">{ra.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors truncate">{ra.name}</h3>
                    {ra.shortBio && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{ra.shortBio}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
