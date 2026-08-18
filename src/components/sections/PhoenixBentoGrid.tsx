'use client';

import Link from 'next/link';
import { useRef, MouseEvent } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}

function GlowCard({ children, className, href }: { children: React.ReactNode, className?: string, href?: string }) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  if (href) {
    return (
      <Link 
        href={href}
        ref={ref as any} 
        onMouseMove={handleMouseMove}
        className={`group relative overflow-hidden rounded-[2rem] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 ${className}`}
      >
        <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-50 rounded-[2rem] dark:block hidden"
             style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)' }} />
        <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-50 rounded-[2rem] dark:hidden block"
             style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.05), transparent 40%)' }} />
        {children}
      </Link>
    );
  }

  return (
    <div 
      ref={ref as any} 
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[2rem] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-50 rounded-[2rem] dark:block hidden"
           style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)' }} />
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-50 rounded-[2rem] dark:hidden block"
           style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.05), transparent 40%)' }} />
      {children}
    </div>
  );
}

export function PhoenixBentoGrid() {
  return (
    <section className="container mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-24 relative z-10">
      <ScrollReveal className="flex flex-col items-center justify-center mb-16">
        <span className="px-6 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase bg-gray-100 dark:bg-black mb-6 shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          Explore The Ecosystem
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Everything You Need.</h2>
      </ScrollReveal>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {}
        <ScrollReveal delay={0}>
          <GlowCard href="/about" className="h-[500px] bg-gray-900 flex flex-col justify-end p-8 md:p-10 w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 ease-out"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
            <div className="relative z-10 transform group-hover:-translate-y-4 transition-transform duration-700 ease-out">
              <h3 className="text-4xl font-black text-white mb-3 leading-tight tracking-tight">New to<br />Phoenix?</h3>
              <p className="text-gray-300 text-base font-light">Discover what we're all about and how you can be part of the journey.</p>
            </div>
            <div className="absolute top-8 right-8 text-black bg-white w-12 h-12 rounded-full flex items-center justify-center scale-90 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-blue-500 group-hover:text-white">
              <ArrowUpRightIcon className="w-6 h-6" />
            </div>
          </GlowCard>
        </ScrollReveal>

        {}
        <ScrollReveal delay={150}>
          <GlowCard className="h-[500px] bg-white dark:bg-[#0c0c0c] p-8 md:p-10 flex flex-col w-full">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/10 blur-[80px] dark:blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight shrink-0">Services &<br />Categories</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-6 font-light relative z-10 shrink-0">Explore our diverse range of premium offerings and specialized areas tailored for excellence.</p>
            
            <div className="flex flex-wrap gap-3 mt-auto relative z-10 overflow-y-auto flex-1 content-start pb-4 hide-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style dangerouslySetInnerHTML={{ __html: `.hide-scroll::-webkit-scrollbar { display: none; }` }} />
              {['Corporate Events', 'Weddings', 'Concerts', 'Photography', 'Videography', 'Live Streaming', 'Artist Management', 'Stage Setup'].map((tag, i) => (
                <Link href="/services" key={tag} className="px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white dark:hover:text-white hover:border-transparent cursor-pointer transition-all duration-500 hover:shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
                  {tag}
                </Link>
              ))}
            </div>
          </GlowCard>
        </ScrollReveal>

        {}
        <ScrollReveal delay={300}>
          <GlowCard className="h-[500px] bg-white dark:bg-[#0c0c0c] p-8 md:p-10 flex flex-col w-full">
            <div className="relative z-10 shrink-0 mb-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">A Place for<br />Everyone</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base font-light">We believe in making space for absolute creativity, raw talent, and brilliant execution.</p>
            </div>
            
            <div className="flex flex-col gap-3 relative z-10 overflow-y-auto flex-1 pb-4 hide-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style dangerouslySetInnerHTML={{ __html: `.hide-scroll::-webkit-scrollbar { display: none; }` }} />
              {[
                { title: 'Emerging Artists', sub: 'Incubating new talents' },
                { title: 'Established Pros', sub: 'For industry veterans' },
                { title: 'Content Creators', sub: 'Digital & social media' },
                { title: 'Event Planners', sub: 'Visionary organizers' }
              ].map((item, idx) => (
                <Link href="/artists" key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-4 hover:bg-gradient-to-r hover:from-gray-900 hover:to-black dark:hover:from-white/10 dark:hover:to-white/5 transition-all duration-500 cursor-pointer group/item border border-black/5 hover:border-transparent dark:border-white/5 dark:hover:border-white/20 shrink-0 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex flex-col transform group-hover/item:translate-x-1 transition-transform duration-500">
                    <span className="font-bold text-gray-900 dark:text-white group-hover/item:text-white transition-colors duration-500">{item.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover/item:text-gray-300 transition-colors duration-500">{item.sub}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-500 shadow-lg">
                    <ArrowUpRightIcon className="w-4 h-4 text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
