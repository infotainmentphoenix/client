'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { pressApi } from '../api';
import { BlogPost, BlogPostStatus } from '../types';

export function PressList() {
  // State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>(''); // empty means All
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await pressApi.getBlogPosts({
        page,
        limit,
        search,
        status: status || undefined,
        sortBy,
        sortOrder
      });
      setPosts(response.items || []);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, status, sortBy, sortOrder]);

  // Trigger fetch on changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Reset page when filters change
  const handleFilterChange = () => {
    setPage(1);
  };

  // Delete post
  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this press post? This action cannot be undone.')) {
      try {
        const success = await pressApi.deleteBlogPost(id);
        if (success) {
          fetchPosts();
        } else {
          alert('Failed to delete the post.');
        }
      } catch (err: any) {
        alert(err.message || 'An error occurred.');
      }
    }
  };

  const getStatusBadge = (postStatus: BlogPostStatus) => {
    switch (postStatus) {
      case 'PUBLISHED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Published
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-zinc-500"></span>
            Draft
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top filter and actions block */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <svg 
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search by title, excerpt, content..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); handleFilterChange(); }}
                className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchPosts} 
                className="p-2.5 bg-background border border-border rounded-xl hover:bg-muted transition-colors text-foreground"
                title="Refresh Directory"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                </svg>
              </button>
              <Link 
                href="/admin/content/press/new" 
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all hover:scale-[1.01]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Press Post
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex bg-muted p-1 rounded-xl">
              <button
                onClick={() => { setStatus(''); handleFilterChange(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  status === '' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              <button
                onClick={() => { setStatus('PUBLISHED'); handleFilterChange(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  status === 'PUBLISHED' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => { setStatus('DRAFT'); handleFilterChange(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  status === 'DRAFT' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => { setStatus('ARCHIVED'); handleFilterChange(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  status === 'ARCHIVED' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Archived
              </button>
            </div>

            {/* Sorting controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); handleFilterChange(); }}
                  className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="publishedAt">Date Published</option>
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <button
                onClick={() => { setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc'); handleFilterChange(); }}
                className="p-1.5 bg-background border border-border rounded-lg hover:bg-muted text-foreground transition-colors"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Per Page:</span>
                <select
                  value={limit}
                  onChange={(e) => { setLimit(Number(e.target.value)); handleFilterChange(); }}
                  className="px-2 py-1.5 bg-background border border-border rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 font-bold">Featured Image</th>
                <th className="px-6 py-4 font-bold">Article Details</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Date Published</th>
                <th className="px-6 py-4 font-bold">Created By</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <svg className="animate-spin w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-semibold text-sm">Fetching press releases...</span>
                    </div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted text-muted-foreground mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">No articles found</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">Create a new press release or blog post to share updates with your visitors.</p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-20 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border relative">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-semibold">No Image</span>
                        )}
                        {post.youtubeUrl && (
                          <span className="absolute bottom-1 right-1 bg-red-600 text-white rounded p-0.5" title="Video Post">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.5 6.163C0 8.018 0 12 0 12s0 3.982.5 5.837a3.003 3.003 0 002.11 2.108c1.858.555 9.388.555 9.388.555s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108c.5-1.855.5-5.837.5-5.837s0-3.982-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-sm lg:max-w-md">
                        <span className="font-bold text-foreground truncate hover:text-primary transition-colors">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                          /{post.slug}
                        </span>
                        {post.excerpt && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-normal">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-muted-foreground">
                      {post.publishedAt ? (
                        <div className="flex flex-col">
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          <span className="text-[10px] text-muted-foreground/60">{new Date(post.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/45 italic">Not Published</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {post.user?.image ? (
                          <img 
                            src={post.user.image} 
                            alt={post.user.name || 'Author'} 
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                            {(post.user?.name || post.user?.email || 'A').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs font-semibold text-foreground">
                          {post.user?.name || post.user?.email.split('@')[0] || 'Admin'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link 
                          href={`/admin/content/press/${post.id}`} 
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-xl transition-all"
                          title="Edit Article"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)} 
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          title="Delete Article"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20">
            <span className="text-xs text-muted-foreground font-semibold">
              Showing <span className="text-foreground">{Math.min((page - 1) * limit + 1, pagination.totalItems)}</span> to{' '}
              <span className="text-foreground">{Math.min(page * limit, pagination.totalItems)}</span> of{' '}
              <span className="text-foreground">{pagination.totalItems}</span> posts
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={!pagination.hasPrevPage || isLoading}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-50 disabled:hover:bg-background transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    disabled={isLoading}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      p === page 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'bg-background border border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                disabled={!pagination.hasNextPage || isLoading}
                onClick={() => setPage(prev => Math.min(pagination.totalPages, prev + 1))}
                className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-50 disabled:hover:bg-background transition-colors flex items-center gap-1"
              >
                Next
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
