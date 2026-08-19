'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { pressApi } from '@/features/press/api';
import { BlogPost } from '@/features/press/types';

// Icons
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19-7-7 7-7M19 12H5" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
);

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  } catch {
    return dateStr;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PressReleaseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch published blog posts
        const response = await pressApi.getBlogPosts({ limit: 100, status: 'PUBLISHED' });
        const items = response.items || [];
        
        // Find matching slug
        const found = items.find(p => p.slug === slug);
        if (found) {
          setPost(found);
          // Suggest other posts (excluding current)
          setRecentPosts(items.filter(p => p.id !== found.id).slice(0, 3));
        } else {
          // Check fallbacks if slug belongs to mock releases
          const isMock = slug.startsWith('phoenix-') || slug.startsWith('how-');
          if (isMock) {
            const fallbackReleases = await pressApi.getPressReleases();
            const foundMock = fallbackReleases.find(r => r.slug === slug);
            if (foundMock) {
              // Convert mock release to BlogPost format
              const mappedMock: BlogPost = {
                id: foundMock.id,
                title: foundMock.title,
                slug: foundMock.slug || slug,
                excerpt: foundMock.summary,
                content: foundMock.summary + '\n\nThis is a featured press story published on our media outlets. Contact our PR team for the full press package or read the story details directly on the main publications.',
                youtubeUrl: null,
                featuredImage: foundMock.featuredImage,
                status: 'PUBLISHED',
                publishedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              setPost(mappedMock);
              setRecentPosts([]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching press post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-gray-500">Loading press release...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-black">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Press Release Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">The article you are searching for does not exist or has been deleted.</p>
        <Link href="/press" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Press Room
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden flex items-end">
        {post.featuredImage ? (
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.15),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        
        <div className="container mx-auto px-4 md:px-8 pb-10 relative z-10 max-w-6xl">
          <span className="inline-flex items-center px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
            {post.youtubeUrl ? 'Video Feature' : 'Official Announcement'}
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black text-white max-w-4xl leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 mt-5 text-white/70 text-xs md:text-sm font-semibold">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-indigo-400" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            {post.user && (
              <span className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-indigo-400" />
                Published by {post.user.name || post.user.email.split('@')[0]}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb nav */}
      <div className="bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-white/5 py-4">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link href="/press" className="hover:text-indigo-600 transition-colors">Press Room</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-md">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Grid Section */}
      <section className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Excerpt */}
            {post.excerpt && (
              <div className="p-6 bg-indigo-50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100 dark:border-indigo-500/10">
                <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Summary</h3>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-sm md:text-base font-medium">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
              <article className="prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap font-sans">
                {post.content}
              </article>
            </div>

            {/* YouTube Embed */}
            {post.youtubeUrl && (
              <div className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-red-500 rounded-sm"></span>
                  Video Coverage
                </h2>
                <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-border shadow-lg">
                  <iframe 
                    src={`https://www.youtube.com/embed/${post.youtubeUrl.split('v=')[1]?.split('&')[0] || post.youtubeUrl.split('/').pop()?.split('?')[0]}`} 
                    className="w-full h-full" 
                    allowFullScreen 
                    title={post.title} 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            
            {/* Share / Details Widget */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Actions & Details</h3>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-3">
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Published Date</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </p>
                </div>
                {post.user && (
                  <div>
                    <p className="text-gray-400 font-semibold mb-0.5">Author</p>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{post.user.name || post.user.email}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleShare}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShareIcon />
                {copied ? 'Link Copied!' : 'Share This Release'}
              </button>
            </div>

            {/* Sugesstions Widget */}
            {recentPosts.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Other Recent News</h3>
                
                <div className="space-y-4">
                  {recentPosts.map((other) => (
                    <Link 
                      key={other.id} 
                      href={`/press/${other.slug}`}
                      className="block group space-y-1.5"
                    >
                      <span className="text-[10px] uppercase font-bold text-indigo-500 dark:text-indigo-400">
                        {formatDate(other.publishedAt || other.createdAt)}
                      </span>
                      <h4 className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-500 transition-colors line-clamp-2 leading-snug">
                        {other.title}
                      </h4>
                      {other.excerpt && (
                        <p className="text-[11px] text-gray-500 line-clamp-1 leading-normal">
                          {other.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Back Button Widget */}
            <Link 
              href="/press" 
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm w-full"
            >
              <ArrowLeftIcon /> Back to Press List
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
