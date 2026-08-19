'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '../ui/ScrollReveal';
import { artistApi } from '@/features/artists/api';
import { Artist } from '@/features/artists/types';

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const BadgeCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
);

const availabilityLabels: Record<string, { text: string; dot: string; bg: string }> = {
  AVAILABLE: { text: 'Available Now', dot: 'bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]', bg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
  BUSY: { text: 'Currently Booked', dot: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]', bg: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
  UNAVAILABLE: { text: 'Unavailable', dot: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]', bg: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
  ON_REQUEST: { text: 'On Request', dot: 'bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(96,165,250,0.9)]', bg: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
};

export function PhoenixArtists() {
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const a = await artistApi.getArtists({ limit: 4, featured: true }); 
        
        let fetchedArtists: any[] = [];
        if (a && a.length > 0) {
          fetchedArtists = a.filter(x => x.isActive).slice(0, 4);
        } else {
          const allArtists = await artistApi.getArtists({ limit: 4 });
          if (allArtists && allArtists.length > 0) {
            fetchedArtists = allArtists.filter(x => x.isActive).slice(0, 4);
          }
        }

        if (fetchedArtists.length > 0) {
          setArtists(fetchedArtists);
        }
      } catch (err) {
        console.error("Failed to load artists", err);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-24 md:py-32 relative bg-black text-white overflow-hidden border-y border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155732-684736382404?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 dark:opacity-10 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-xs md:text-sm">Exclusive Talent</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-tight">
                Our Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Artist Roster</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                We partner with world-renowned musicians, DJs, and performers to bring unparalleled entertainment to your most exclusive events.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Link href="/artists" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all font-medium text-sm">
              View All Artists
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
            <p className="text-lg">No artists available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center">
            {artists.map((artist, i) => {
              const avail = availabilityLabels[artist.availability] || availabilityLabels.ON_REQUEST;
              return (
                <ScrollReveal key={artist.id} delay={i * 100}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 shadow-xl hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden block"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-900 border-2 border-white/20">
                      {/* Background Profile Image */}
                      {artist.profileImage ? (
                        <img
                          src={artist.profileImage}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-950 via-indigo-950 to-black flex items-center justify-center text-6xl font-black text-white/30">
                          {artist.name.charAt(0)}
                        </div>
                      )}

                      {/* Gradient Shading Overlay at Bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Featured Star Badge */}
                      {artist.featured && (
                        <div className="absolute top-5 right-5 z-10 p-2 bg-amber-500 text-white rounded-full shadow-lg group-hover:opacity-0 transition-opacity">
                          <StarIcon className="w-3.5 h-3.5" />
                        </div>
                      )}

                      {/* Floating Glass Pill */}
                      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/85 backdrop-blur-xl rounded-full text-white text-[11px] font-bold shadow-2xl flex items-center gap-1.5 border border-white/25 group-hover:opacity-0 transition-all duration-300 max-w-[72%] whitespace-nowrap overflow-hidden">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${avail.dot}`} />
                        <span className="truncate max-w-[85px] sm:max-w-[100px]">{artist.name}</span>
                        {artist.verified && <BadgeCheckIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      </div>

                      {/* HOVER DETAILS OVERLAY */}
                      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/90 to-purple-950/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-center items-center text-center text-white">
                        <div className="flex items-center gap-1.5 mb-1 max-w-[180px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-lg font-black tracking-tight text-white line-clamp-1 truncate">
                            {artist.name}
                          </h3>
                          {artist.verified && <BadgeCheckIcon className="w-4 h-4 text-blue-400 shrink-0" />}
                        </div>

                        <div className="flex items-center gap-1.5 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                            {artist.category?.name || 'Performer'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${avail.bg} flex items-center gap-1`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
                            {avail.text}
                          </span>
                        </div>

                        {artist.shortBio ? (
                          <p className="text-xs text-gray-300 line-clamp-3 mb-3 font-light leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 px-2">
                            {artist.shortBio}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 italic mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                            Exclusive Live Performer
                          </p>
                        )}

                        <div className="flex flex-wrap justify-center items-center gap-1.5 mb-3 text-[10px] text-gray-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                          {artist.basedIn && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10">
                              <MapPinIcon className="w-3 h-3 text-purple-400" /> {artist.basedIn}
                            </span>
                          )}
                          {artist.priceRange && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                              {artist.priceRange}
                            </span>
                          )}
                        </div>

                        <div className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200 flex items-center gap-1">
                          View Profile &rarr;
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}
        
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/artists" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/10 transition-all font-medium text-sm">
            View All Artists
          </Link>
        </div>
      </div>
    </section>
  );
}
