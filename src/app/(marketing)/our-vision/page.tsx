'use client';

import Link from 'next/link';
import { Icon34, Icon35, Icon36, Icon37, Icon2 } from '@/components/icons/MarketingIcons';


const SparklesIcon = ({ className }: { className?: string }) => (
  <Icon34 className={className} />
);

const UsersIcon = ({ className }: { className?: string }) => (
  <Icon35 className={className} />
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <Icon36 className={className} />
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <Icon37 className={className} />
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <Icon2 className={className} />
);

export default function OurVisionPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-gray-900 dark:text-white font-sans transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-36 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-1/6 right-1/5 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-50 dark:via-[#050505] to-slate-50 dark:to-[#050505]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-5xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md mb-8 text-orange-600 dark:text-orange-400 font-bold text-xs tracking-[0.25em] uppercase">
            🚀 Our Vision Statement
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-12 text-gray-900 dark:text-white">
            Rising Above <br />
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              The Ordinary
            </span>
          </h1>

          {/* Quote Block */}
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-55 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white dark:bg-[#0b0b0b] shadow-xl dark:shadow-none border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
              <p className="text-xl md:text-3xl text-gray-800 dark:text-gray-100 font-light leading-relaxed italic">
                &ldquo;To rise above the ordinary by transforming every idea into an extraordinary reality—setting new global benchmarks in event innovation, talent curation, and unforgettable entertainment.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="container mx-auto px-6 md:px-12 py-24 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-2">Core Foundations</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">Vision & Mission</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-none p-8 md:p-12 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-gray-50 dark:hover:bg-white/[0.07] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-black text-xl">
                👁️
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed text-base">
                To become the world&apos;s most trusted and dynamic entertainment & event management powerhouse—where creativity knows no bounds, and every event rises to leave a lasting legacy.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-widest">
              Limitless Creativity
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-none p-8 md:p-12 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-50 dark:hover:bg-white/[0.07] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-xl">
                🎯
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed text-base">
                To provide end-to-end, tailor-made event production and premier artist management with unmatched passion, transparency, and operational excellence—turning every client&apos;s dream into a vibrant reality.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest">
              Flawless Execution
            </div>
          </div>
        </div>
      </section>

      {/* Driving Forces Grid */}
      <section className="container mx-auto px-6 md:px-12 py-24 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-2">Driving Forces</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">What Drives Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-light max-w-lg mx-auto">
            Our vision is sustained by four fundamental values, ensuring absolute focus and premium service for every experience we shape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Force 1 */}
          <div className="p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-lg dark:shadow-none rounded-2xl flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 hover:translate-y-[-4px] relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Creative Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                Pioneering innovative themes, world-class stagecraft, and cutting-edge production for corporate events, grand weddings, and entertainment nights.
              </p>
            </div>
          </div>

          {/* Force 2 */}
          <div className="p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-lg dark:shadow-none rounded-2xl flex flex-col justify-between hover:border-rose-500/40 transition-all duration-300 hover:translate-y-[-4px] relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <UsersIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Bridging Art & Audiences</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                Connecting extraordinary talent—musicians, artists, comedians, and performers—with audiences across the globe to deliver magical cultural experiences.
              </p>
            </div>
          </div>

          {/* Force 3 */}
          <div className="p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-lg dark:shadow-none rounded-2xl flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 hover:translate-y-[-4px] relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Flawless Execution</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                Setting industry standards for reliability, seamless 360° planning, and delivering beyond expectations, every single time.
              </p>
            </div>
          </div>

          {/* Force 4 */}
          <div className="p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-lg dark:shadow-none rounded-2xl flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 hover:translate-y-[-4px] relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <GlobeIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Global Reach, Personal Touch</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                Expanding our footprint pan-India and internationally while maintaining a bespoke, detail-driven approach for every client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA / Summary */}
      <section className="container mx-auto px-6 md:px-12 py-24 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 shadow-2xl dark:shadow-none rounded-3xl p-8 md:p-16 backdrop-blur-md relative overflow-hidden">
          {/* Decorative Gradients */}
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tr from-rose-500/20 to-purple-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-8">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">About Phoenix Infotainment</span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-gray-900 dark:text-white">
              Seamless. Effortless. Chaos-Free. Smart Luxury.
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed text-lg max-w-3xl mx-auto">
              We create elevated, luxurious experiences without unnecessary excess. Backed by years of industry expertise and long-standing production partnerships, we deliver premium events with seamless execution, thoughtful budgets, and exceptional value.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/book-consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white font-bold rounded-full transition-all shadow-xl hover:scale-105"
              >
                Book a Consultation
                <ArrowUpRightIcon className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 font-bold rounded-full transition-all hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
