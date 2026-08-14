'use client';

import Link from 'next/link';

// Custom SVG Icons matching the theme
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans transition-colors duration-300">
      
      {/* 1. Top Section — About Phoenix Infotainment */}
      <section className="relative w-full min-h-[55vh] flex items-center justify-center pt-36 pb-20 overflow-hidden">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505] to-[#050505]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-orange-400 font-bold text-xs tracking-[0.2em] uppercase">
            About Us
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] mb-8">
            Constructing Seamless <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Event Spectacles
            </span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            <p>
              At Phoenix Infotainment, we are powered by a passionate team of creative professionals, strategists, and production experts who work together to deliver seamless experiences across Pune and Maharashtra.
            </p>
            <p className="text-gray-400">
              Our strength lies in combining artistic vision with operational excellence — ensuring every event, campaign, and production is executed with precision.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Middle Section — Founder & Creative Director */}
      <section className="container mx-auto px-6 md:px-12 py-20 border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle design gradient accent inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Founder Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <img 
                  src="/images/Diya.jpeg" 
                  alt="Preeti (Diya Makhija) - Founder & Creative Director" 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
            </div>

            {/* Founder Details & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Leadership Profile</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Preeti (Diya Makhija)</h2>
                <p className="text-sm font-semibold tracking-wider text-rose-400 uppercase mt-0.5">
                  Founder & Creative Director | Actor | Entrepreneur
                </p>
              </div>

              <p className="text-gray-300 font-light leading-relaxed text-base">
                With professional experience in the Indian television and entertainment industry, Preeti brings creative direction, artist relationships, and industry expertise to every project. Her deep connections within the entertainment ecosystem enable Phoenix Infotainment to work directly with artists and performers — ensuring authentic talent, transparent pricing, and premium execution.
              </p>

              {/* Highlights Grid */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                {[
                  'TV Industry Exp.',
                  'Artist Network',
                  'Creative Vision',
                  'Transparency'
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-gray-200">{highlight}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. The Powerhouse — Our Departments */}
      <section className="container mx-auto px-6 md:px-12 py-20 border-t border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-2">Our Operations</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">The Powerhouse</h2>
          <p className="text-lg text-gray-400 font-light uppercase tracking-wider">Our Departments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Social Media & Digital */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Social Media & Digital</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Our dedicated Social Media Team manages digital storytelling, content creation, and online brand presence.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                {[
                  'Instagram & FB Content Strategy',
                  'Reels, Posts & BTS Coverage',
                  'Event Highlights & Creatives',
                  'Digital Engagement & Growth'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Marketing & Strategy */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-rose-500/50 transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Marketing & Strategy</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Our Marketing Head leads brand partnerships and sponsorship collaborations for visibility.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                {[
                  'Brand Tie-ups & Sponsorships',
                  'Corporate Client Acquisition',
                  'Campaign Planning & Execution',
                  'Business Dev (Pune/Maharashtra)'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Production & Operations */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 relative group">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Production & Operations</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  The backbone of Phoenix Infotainment, managing on-ground execution and technical delivery.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                {[
                  'Event Production & Logistics',
                  'Stage, Sound & Lighting Setup',
                  'Artist Management & Hospitality',
                  'Shoot & Post-production'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Final Section — Together, We Deliver Excellence */}
      <section className="container mx-auto px-6 md:px-12 py-20 border-t border-white/5 relative z-10 text-center">
        <div className="relative bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
              Together, We Deliver Excellence
            </h2>
            <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
              With leadership-driven creativity, a strategic marketing team, a strong digital presence, and a reliable production crew, Phoenix Infotainment offers complete end-to-end event solutions — ensuring every celebration is professionally managed and beautifully delivered.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-full transition-all shadow-xl hover:scale-105"
              >
                Contact Us
                <ArrowUpRightIcon className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
