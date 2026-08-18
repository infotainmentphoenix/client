'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Site Profile', href: '/admin/settings/site', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { label: 'Hero Sliders', href: '/admin/settings/carousels', icon: 'M4 6h16M4 12h16M4 18h16' },
    { label: 'SEO Config', href: '/admin/settings/seo', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { label: 'Social Links', href: '/admin/settings/social-links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    { label: 'Client Logos', href: '/admin/settings/client-logos', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Platform Settings</h1>
        <p className="text-gray-500 mt-1">Manage your website configurations, brand identity, and integrations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-2xl p-3 shadow-sm">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <svg className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {}
        <div className="flex-1 w-full">
          {children}
        </div>
        
      </div>
    </div>
  );
}
