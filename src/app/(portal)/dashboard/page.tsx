'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const VideoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

export default function PortalDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-white/10 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold rounded-full">
              👑 VIP Client Command Hub
            </span>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Welcome back, Client User! 👋
            </h1>

            <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
              Your next event <strong className="text-white font-bold">&quot;Royal Udaipur Destination Wedding&quot;</strong> is scheduled in <span className="text-orange-400 font-bold">14 days</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/bookings"
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              Manage Artist Bookings <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/consultations"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs backdrop-blur transition-all"
            >
              Schedule Strategy Call
            </Link>
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase text-gray-400">Active Projects</span>
            <div className="p-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">3</p>
          <span className="text-xs text-green-500 font-semibold mt-1 inline-block">● All 3 On Schedule</span>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase text-gray-400">Confirmed Artists</span>
            <div className="p-2.5 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">4</p>
          <span className="text-xs text-rose-500 font-semibold mt-1 inline-block">Riders & Suites Confirmed</span>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase text-gray-400">Upcoming Strategy Calls</span>
            <div className="p-2.5 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
              <VideoIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">2</p>
          <span className="text-xs text-purple-500 font-semibold mt-1 inline-block">Google Meet Links Ready</span>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase text-gray-400">Total Contract Value</span>
            <div className="p-2.5 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl">
              <CheckCircleIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">₹48.5L</p>
          <span className="text-xs text-green-500 font-semibold mt-1 inline-block">Milestone Payment 75% Complete</span>
        </div>
      </div>

      {}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
          <div>
            <h2 className="text-xl font-black">Live Event Execution Progress</h2>
            <p className="text-gray-500 text-xs mt-0.5">Real-time status of your active event productions.</p>
          </div>
          <Link href="/projects" className="text-xs font-bold text-orange-500 hover:underline">
            View All Projects &rarr;
          </Link>
        </div>

        <div className="space-y-6">
          {[
            {
              title: 'Royal Udaipur Destination Wedding Sangeet',
              date: 'Nov 20, 2026',
              progress: 85,
              statusText: 'Stage Staging & Sound Check Underway',
              artist: 'Armaan Malik & Band',
              color: 'from-orange-500 to-rose-500',
            },
            {
              title: 'Annual Fortune 500 Corporate Gala & Awards Night',
              date: 'Dec 05, 2026',
              progress: 60,
              statusText: '3D Curved LED Trussing & Security Licensing',
              artist: 'DJ Chetas',
              color: 'from-blue-500 to-purple-500',
            },
            {
              title: 'National Tech Leadership Summit 2026',
              date: 'Jan 15, 2027',
              progress: 35,
              statusText: 'Delegate Registration & Keynote Speaker Alignment',
              artist: 'Zakir Khan & Anchors',
              color: 'from-emerald-500 to-teal-500',
            },
          ].map((project, idx) => (
            <div key={idx} className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>📅 Date: {project.date}</span>
                    <span>🎤 Artist: {project.artist}</span>
                  </div>
                </div>
                <span className="text-xs font-black text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 px-3 py-1 rounded-full">
                  {project.progress}% Completed
                </span>
              </div>

              {}
              <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-1000`} style={{ width: `${project.progress}%` }} />
              </div>

              <p className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" /> Currently: {project.statusText}
              </p>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
            <h2 className="text-xl font-black">Upcoming Event Schedule</h2>
            <Link href="/bookings" className="text-xs font-bold text-orange-500 hover:underline">View Bookings</Link>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Royal Wedding Sangeet',
                artist: 'Armaan Malik',
                date: 'Nov 20, 2026',
                time: '07:00 PM IST',
                venue: 'City Palace Grounds, Udaipur',
                coordinator: 'Ananya Deshmukh',
                phone: '+91 98765 11223',
              },
              {
                title: 'Corporate Gala & Awards',
                artist: 'DJ Chetas',
                date: 'Dec 05, 2026',
                time: '08:00 PM IST',
                venue: 'St. Regis Ballrooms, Mumbai',
                coordinator: 'Siddharth Mehta',
                phone: '+91 98765 44332',
              },
            ].map((event, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">Scheduled Show</span>
                  <h3 className="text-base font-bold">{event.title} — {event.artist}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {event.date} at {event.time}</span>
                    <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5" /> {event.venue}</span>
                  </div>
                </div>

                <a
                  href={`tel:${event.phone}`}
                  className="px-4 py-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-center shrink-0 hover:bg-orange-200 transition-colors"
                >
                  <PhoneIcon className="w-3.5 h-3.5" /> Call Lead Director
                </a>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-black pb-4 border-b border-gray-100 dark:border-white/5">Client Resource Vault</h2>

          <div className="space-y-3">
            <button
              onClick={() => alert('Downloading all signed contracts (PDF package)')}
              className="w-full p-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl border border-gray-100 dark:border-white/5 text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <h3 className="text-xs font-bold">📄 Download Signed Contracts</h3>
                <p className="text-[11px] text-gray-400">PDF agreements & artist riders</p>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </button>

            <Link
              href="/account?tab=BILLING"
              className="w-full p-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl border border-gray-100 dark:border-white/5 text-left flex items-center justify-between transition-colors group block"
            >
              <div>
                <h3 className="text-xs font-bold">💳 Tax Invoices & Receipts</h3>
                <p className="text-[11px] text-gray-400">GSTIN invoices & milestone payments</p>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </Link>

            <button
              onClick={() => alert('Emergency On-Site Hotline: +91 98765 00001')}
              className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-500/20 text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <h3 className="text-xs font-bold">🚨 24/7 On-Site Emergency Hotline</h3>
                <p className="text-[11px] opacity-80">Direct line to lead production head</p>
              </div>
              <PhoneIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
