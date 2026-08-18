'use client';

import React, { useEffect, useState } from 'react';
import { siteSettingsApi } from '@/features/site-settings/api';
import { ClientLogo } from '@/features/site-settings/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ClientLogosMarquee() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const data = await siteSettingsApi.getClientLogos();
        setLogos(data);
      } catch (err) {
        console.error('Failed to load logos', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogos();
  }, []);

  if (isLoading || logos.length === 0) {
    return null; // Don't render anything if there are no logos
  }

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-white dark:bg-[#050505]">
      <ScrollReveal>
        <div className="text-center mb-12 px-4">
          <span className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-widest text-xs">Global Network</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mt-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            We are proud to collaborate with world-class brands, sponsors, and media partners to deliver legendary entertainment and production experiences.
          </p>
        </div>
      </ScrollReveal>

      <div className="w-full relative py-10 flex flex-col justify-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 max-w-4xl bg-blue-500/5 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-8 transform-gpu">
          
          {/* Logo Marquee Ribbon */}
          <div className="flex w-full overflow-hidden group">
            <div className="flex animate-marquee min-w-full shrink-0 items-center gap-12 md:gap-24 px-6 md:px-12 group-hover:[animation-play-state:paused] transition-all duration-300">
              {logos.map((logo, i) => (
                <div key={i} className="flex-shrink-0 w-32 md:w-48 h-20 relative flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
              ))}
              {logos.map((logo, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 w-32 md:w-48 h-20 relative flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
              ))}
            </div>
            
            <div className="flex animate-marquee min-w-full shrink-0 items-center gap-12 md:gap-24 px-6 md:px-12 group-hover:[animation-play-state:paused] transition-all duration-300" aria-hidden="true">
              {logos.map((logo, i) => (
                <div key={`dup2-${i}`} className="flex-shrink-0 w-32 md:w-48 h-20 relative flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
              ))}
              {logos.map((logo, i) => (
                <div key={`dup3-${i}`} className="flex-shrink-0 w-32 md:w-48 h-20 relative flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-30 pointer-events-none" />
      </div>
    </section>
  );
}
