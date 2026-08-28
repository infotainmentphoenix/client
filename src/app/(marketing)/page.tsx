import { PhoenixHero } from '@/components/sections/PhoenixHero';
import { PhoenixMarquee } from '@/components/sections/PhoenixMarquee';
import { LiveEventsSection } from '@/components/sections/LiveEventsSection';
import { PhoenixStats } from '@/components/sections/PhoenixStats';
import { PhoenixBanners } from '@/components/sections/PhoenixBanners';
import { PhoenixBentoGrid } from '@/components/sections/PhoenixBentoGrid';
import { PhoenixArtists } from '@/components/sections/PhoenixArtists';
import { ClientLogosMarquee } from '@/components/sections/ClientLogosMarquee';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { Icon38 } from '@/components/icons/MarketingIcons';


function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <Icon38 className={className} />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      { }
      <PhoenixHero />

      { }
      <PhoenixMarquee />

      { }
      <LiveEventsSection />

      { }
      <PhoenixStats />

      { }
      <PhoenixBanners />

      { }
      <PhoenixArtists />

      { }
      <PhoenixBentoGrid />

      {/* Sponsor / Client Logos Marquee */}
      <ClientLogosMarquee />

      { }
      <section className="container mx-auto px-4 md:px-8 pb-24 pt-16 relative z-10">
        <ScrollReveal>
          <Link href="/contact" className="group relative w-full h-44 md:h-52 rounded-[2.5rem] overflow-hidden flex items-center justify-between px-8 md:px-16 bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl hover:-translate-y-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/10 to-transparent opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col max-w-lg">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">Unforgettable Experiences</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors">
                Bring Your Vision To Life
              </h2>
              <p className="text-gray-300 text-xs md:text-sm font-light mt-1 max-w-md">
                Step into a world of pure creativity, flawless production execution, and legendary entertainment.
              </p>
            </div>

            <div className="hidden md:flex relative z-10 w-16 h-16 rounded-full bg-white text-black items-center justify-center scale-90 group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:bg-blue-500 group-hover:text-white">
              <ArrowUpRightIcon className="w-8 h-8" />
            </div>
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
