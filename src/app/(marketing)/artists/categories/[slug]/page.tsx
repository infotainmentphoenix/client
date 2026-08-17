'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { artistApi } from '@/features/artists/api';
import { Artist, ArtistCategory } from '@/features/artists/types';

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const availabilityLabels: Record<string, { text: string; dotColor: string }> = {
  AVAILABLE: { text: 'Available', dotColor: 'bg-green-500' },
  BUSY: { text: 'Busy', dotColor: 'bg-amber-500' },
  UNAVAILABLE: { text: 'Unavailable', dotColor: 'bg-red-500' },
  ON_REQUEST: { text: 'On Request', dotColor: 'bg-blue-500' },
};

export default function ArtistCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [category, setCategory] = useState<ArtistCategory | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setIsLoading(true);
      
      const allCategories = await artistApi.getCategories();
      const found = allCategories.find(c => c.slug === slug) || null;
      setCategory(found);

      if (found) {
        
        const allArtists = await artistApi.getArtists({ categoryId: found.id });
        setArtists(allArtists.filter(a => a.isActive));
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

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
        <p className="text-gray-500 mb-8">This artist category doesn't exist.</p>
        <Link href="/artists" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Browse All Artists
        </Link>
      </div>
    );
  }

  return (
    <>
      {}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-[#0a0a0a] pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/artists" className="hover:text-purple-600 transition-colors">Artists</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-gray-600 dark:text-gray-400">{category.description}</p>
            )}
            <p className="mt-4 text-sm text-gray-500">
              {artists.length} artist{artists.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {artists.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-gray-500 dark:text-gray-400">No artists found in this category yet.</p>
            <Link href="/artists" className="inline-flex items-center gap-2 mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
              <ArrowLeftIcon className="w-4 h-4" /> Browse All Artists
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map(artist => {
              const avail = availabilityLabels[artist.availability] || availabilityLabels.ON_REQUEST;
              return (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.slug}`}
                  className="group bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 bg-gradient-to-br from-purple-200 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20 overflow-hidden">
                    {artist.profileImage ? (
                      <img src={artist.profileImage} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl font-black text-purple-300/60 dark:text-purple-500/30">{artist.name.charAt(0)}</div>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full">
                      <span className={`w-2 h-2 rounded-full ${avail.dotColor}`} />
                      {avail.text}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">{artist.name}</h3>
                    {artist.shortBio && <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{artist.shortBio}</p>}
                    {artist.basedIn && (
                      <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                        <MapPinIcon className="w-3 h-3" /> {artist.basedIn}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
