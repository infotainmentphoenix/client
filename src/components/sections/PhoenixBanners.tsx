'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}

export function PhoenixBanners() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-16 flex flex-col gap-8 relative z-10">
      {/* Banner 1 */}
      <ScrollReveal delay={0}>
        <Link href="/events/online" className="group relative w-full h-56 md:h-72 rounded-[2rem] overflow-hidden flex items-center bg-gray-100 dark:bg-gray-900 border border-black/10 dark:border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 dark:from-black dark:via-black/50 to-transparent"></div>
          <div className="relative z-10 p-8 md:p-16 w-full flex justify-between items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">Join Us <br />Live Online</h2>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-md font-light">Experience the energy from anywhere. Streaming live every Saturday at 7pm & 9pm.</p>
            </div>
            <div className="hidden md:flex w-16 h-16 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 items-center justify-center text-black dark:text-white group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-xl">
              <ArrowUpRightIcon className="w-8 h-8" />
            </div>
          </div>
        </Link>
      </ScrollReveal>

      {/* Banner 2 */}
      <ScrollReveal delay={200}>
        <Link href="/artists" className="group relative w-full h-48 md:h-64 rounded-[2rem] overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 hover:border-purple-500/50 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-200/50 dark:from-purple-900/30 via-transparent to-transparent opacity-80 dark:opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
          
          {/* Animated noise/texture overlay simulated with CSS pattern */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <span className="text-purple-600 dark:text-purple-400 font-semibold tracking-[0.3em] uppercase text-xs mb-4">Talent Roster</span>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(192,38,211,0.2)] dark:drop-shadow-[0_0_30px_rgba(192,38,211,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(192,38,211,0.4)] dark:group-hover:drop-shadow-[0_0_50px_rgba(192,38,211,0.6)] transition-all duration-500">
              Discover Our Artists
            </h2>
          </div>
          <div className="absolute top-8 right-8 text-black/30 dark:text-white/30 group-hover:text-black dark:group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
            <ArrowUpRightIcon className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </Link>
      </ScrollReveal>
    </section>
  );
}
