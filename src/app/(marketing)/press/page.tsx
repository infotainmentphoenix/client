'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pressApi } from '@/features/press/api';
import { PressLogo, PressRelease } from '@/features/press/types';

const NewspaperIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

export default function PressPage() {
  const [pressLogos, setPressLogos] = useState<PressLogo[]>([]);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showKitModal, setShowKitModal] = useState(false);

  useEffect(() => {
    const loadPress = async () => {
      setIsLoading(true);
      const [logos, releases] = await Promise.all([
        pressApi.getLogos(),
        pressApi.getPressReleases(),
      ]);
      setPressLogos(logos);
      setPressReleases(releases);
      setIsLoading(false);
    };
    loadPress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-gray-50 dark:from-blue-950/20 dark:via-black dark:to-black pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            <NewspaperIcon className="w-4 h-4" /> Press Room & Media Coverage
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Phoenix Infotainment <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              In The News & Media
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Stay updated with our latest press releases, media features, corporate announcements, and industry recognitions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowKitModal(true)}
              className="px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
            >
              <DownloadIcon className="w-4 h-4" /> Download Official Press Kit
            </button>
            <a
              href="mailto:press@phoenixinfotainment.com"
              className="px-6 py-3.5 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <MailIcon className="w-4 h-4" /> Press Enquiries
            </a>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">Featured News Stories</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Leading publications covering Phoenix Infotainment live events & corporate milestones.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressReleases.map((story) => (
              <div
                key={story.id}
                className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {}
                  {story.featuredImage && (
                    <div className="relative h-56 overflow-hidden bg-gray-900">
                      <img
                        src={story.featuredImage}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {story.badge && (
                          <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow">
                            {story.badge}
                          </span>
                        )}
                        <span className="px-3 py-1 bg-black/60 backdrop-blur text-white text-xs font-semibold rounded-full">
                          {story.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{story.outlet}</span>
                      <span>{story.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Reading full story: ${story.title}`); }}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read Full Story <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {}
      <section className="bg-white dark:bg-white/5 border-y border-gray-200 dark:border-white/5 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-5xl">
          <h2 className="text-xl font-bold uppercase tracking-wider text-gray-400 mb-8">
            Media Partners & Featured Outlets
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {pressLogos.map((logo) => (
              <a
                key={logo.id}
                href={logo.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-blue-500/50 flex flex-col items-center justify-center gap-2 group transition-all"
              >
                <div className="h-12 w-full flex items-center justify-center">
                  <span className="font-black text-gray-700 dark:text-gray-300 text-sm group-hover:text-blue-500 transition-colors text-center">
                    {logo.name}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold text-gray-400">
                  {logo.type.replace('_', ' ')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {}
      {showKitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 max-w-lg w-full text-center relative shadow-2xl">
            <h3 className="text-2xl font-black mb-3">Download Phoenix Press Kit</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              Get high-resolution brand logos, executive bios, high-res event photography, and corporate factsheet.
            </p>
            <div className="space-y-3 mb-6 text-left">
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-between text-xs font-semibold">
                <span>📁 Phoenix_Brand_Assets_2026.zip</span>
                <span className="text-gray-400">24 MB</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-between text-xs font-semibold">
                <span>📄 Phoenix_Corporate_Factsheet.pdf</span>
                <span className="text-gray-400">2.4 MB</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('Downloading Press Kit Assets (Phoenix_Brand_Assets_2026.zip)');
                  setShowKitModal(false);
                }}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Download ZIP
              </button>
              <button
                onClick={() => setShowKitModal(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Planning a Story or Interview?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Our founders and event directors are available for expert media commentary on the future of live entertainment & corporate galas.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Get In Touch With PR Team
          </Link>
        </div>
      </section>
    </div>
  );
}
