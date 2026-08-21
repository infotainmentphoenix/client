'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { inquiryApi } from '@/features/inquiries/api';
import { artistApi } from '@/features/artists/api';
import { serviceApi } from '@/features/services/api';
import { eventApi } from '@/features/events/api';
import { Inquiry } from '@/features/inquiries/types';

// Simple SVG Icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const MessageSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    inquiries: 0,
    artists: 0,
    services: 0,
    events: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [inquiries, artists, services, events] = await Promise.all([
          inquiryApi.getInquiries(),
          artistApi.getArtists(),
          serviceApi.getServices(),
          eventApi.getEvents()
        ]);

        setStats({
          inquiries: inquiries?.length || 0,
          artists: artists?.length || 0,
          services: services?.length || 0,
          events: events?.length || 0
        });

        // Get 5 most recent inquiries
        setRecentInquiries((inquiries || []).slice(0, 5));
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-white/10 rounded mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-96 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
          <div className="h-96 bg-gray-200 dark:bg-white/5 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your platform today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/admin/content/artists/new" className="px-4 py-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
            <PlusIcon />
            Artist
          </Link>
          <Link href="/admin/content/events/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2">
            <PlusIcon />
            Event
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Inquiries</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MessageSquareIcon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.inquiries}</div>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            Active leads
          </p>
        </div>

        <div className="bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Artists</h3>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <UsersIcon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.artists}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Registered on platform</p>
        </div>

        <div className="bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Services</h3>
            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <BriefcaseIcon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.services}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Available for booking</p>
        </div>

        <div className="bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Events</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CalendarIcon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.events}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Scheduled events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Inquiries Table */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent CRM Inquiries</h2>
            <Link href="/admin/crm" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {recentInquiries.length > 0 ? (
                  recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">{inquiry.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {inquiry.inquiryType || inquiry.eventType || 'General'}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        {new Date(inquiry.createdAt || '').toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          inquiry.status === 'NEW' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                          (inquiry.status === 'CONTACTED' || inquiry.status === 'QUALIFIED' || inquiry.status === 'NEGOTIATION') ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' :
                          (inquiry.status === 'WON' || inquiry.status === 'CLOSED_WON') ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                          'bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/10 dark:text-gray-300 dark:border-white/10'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No recent inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links / Resources */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm flex flex-col">
          <div className="p-6 border-b border-black/5 dark:border-white/5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quick Access</h2>
          </div>
          <div className="p-4 space-y-2">
            <Link href="/admin/crm" className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <MessageSquareIcon />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">CRM & Inquiries</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage client leads</p>
              </div>
            </Link>
            
            <Link href="/admin/content/artists" className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <UsersIcon />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Artist Roster</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage your talents</p>
              </div>
            </Link>

            <Link href="/admin/content/services" className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <BriefcaseIcon />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Services</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Edit platform offerings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
