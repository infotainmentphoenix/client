'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { artistApi } from '@/features/artists/api';
import { eventApi } from '@/features/events/api';
import { serviceApi } from '@/features/services/api';

const CONTENT_MODULES = [
  {
    id: 'artists',
    title: 'Artists Roster',
    description: 'Manage artist profiles, categories, and availability.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    href: '/admin/content/artists',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'events',
    title: 'Events & Projects',
    description: 'Manage past events, case studies, and portfolios.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    href: '/admin/content/events',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-500/10',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'services',
    title: 'Service Offerings',
    description: 'Manage business services, packages, and descriptions.',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    href: '/admin/content/services',
    color: 'bg-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    textColor: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Manage frequently asked questions and categories.',
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    href: '/admin/content/faqs',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    id: 'carousels',
    title: 'Hero Carousels',
    description: 'Manage homepage banner carousels, CTA links, and slide order.',
    icon: 'M4 6h16M4 12h16M4 18h16',
    href: '/admin/content/carousels',
    color: 'bg-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-500/10',
    textColor: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 'gallery',
    title: 'Media Gallery',
    description: 'Manage homepage carousels, client logos, and global images.',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    href: '/admin/content/gallery',
    color: 'bg-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-500/10',
    textColor: 'text-pink-600 dark:text-pink-400'
  },
  {
    id: 'pages',
    title: 'Site Pages & Settings',
    description: 'Manage static page content, text blocks, and site settings.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    href: '/admin/content/pages',
    color: 'bg-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-500/10',
    textColor: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    id: 'press',
    title: 'Press & Partners',
    description: 'Manage client logos, media partners, and sponsor features.',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15',
    href: '/admin/content/press',
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-500/10',
    textColor: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 'team',
    title: 'Team Roster',
    description: 'Manage internal team members and administrators.',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    href: '/admin/content/team',
    color: 'bg-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-500/10',
    textColor: 'text-rose-600 dark:text-rose-400'
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'Manage client reviews and quotes attached to events.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    href: '/admin/content/testimonials',
    color: 'bg-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-400'
  },
];

export default function ContentDashboardPage() {
  const [counts, setCounts] = useState<{ artists: number; events: number; services: number }>({
    artists: 0,
    events: 0,
    services: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCounts() {
      try {
        const [a, e, s] = await Promise.all([
          artistApi.getArtists(),
          eventApi.getEvents(),
          serviceApi.getServices()
        ]);
        setCounts({ artists: a.length, events: e.length, services: s.length });
      } catch (error) {
        console.error("Failed to load counts", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCounts();
  }, []);

  return (
    <div className="space-y-8">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Content Hub</h1>
          <p className="text-gray-500 mt-1">Centralized management for all website content, media, and data models.</p>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CONTENT_MODULES.map((module) => {
          let count = 0;
          if (module.id === 'artists') count = counts.artists;
          if (module.id === 'events') count = counts.events;
          if (module.id === 'services') count = counts.services;

          return (
            <Link key={module.id} href={module.href} className="group flex flex-col bg-card border border-border hover:border-transparent rounded-2xl p-6 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
              {}
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${module.color}`} />
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.bgColor} ${module.textColor}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={module.icon} />
                  </svg>
                </div>
                {['artists', 'events', 'services'].includes(module.id) && (
                  <div className="text-right">
                    {isLoading ? (
                      <div className="w-8 h-6 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    ) : (
                      <span className="text-2xl font-bold tracking-tight text-foreground">{count || '-'}</span>
                    )}
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</p>
                  </div>
                )}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-blue-600 transition-colors">{module.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{module.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform relative z-10">
                Manage {module.title}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {}
      <div className="bg-card border border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Quick Media Upload</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">Drag and drop images here to quickly add them to your central media library. You can attach them to events or artists later.</p>
        <button className="px-6 py-2.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity">
          Browse Files
        </button>
      </div>
    </div>
  );
}
