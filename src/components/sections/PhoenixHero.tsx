'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { carouselApi } from '@/features/carousel/api';
import { Carousel } from '@/features/carousel/types';

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}



export function PhoenixHero() {
  const [slides, setSlides] = useState<Partial<Carousel>[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchSlides = async () => {
      const data = await carouselApi.getCarousels({ isActive: true });
      if (isMounted) {
        if (data && data.length > 0) {
          setSlides(data);
        }
      }
    };
    fetchSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentIndex];

  if (!activeSlide) {
    return (
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-black pt-20 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-500 tracking-tighter">
            Welcome to Phoenix
          </h1>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    if (slides.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row md:items-center justify-start overflow-hidden pt-24 md:pt-20 px-4 md:px-0">
      <div className="hidden md:block">
        <AuroraBackground />
      </div>
      
      {/* Mobile Slider Card / Desktop Background Images */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-auto md:absolute md:inset-0 rounded-[2rem] md:rounded-none overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] md:shadow-none ring-1 ring-white/10 md:ring-0 mb-8 md:mb-0 shrink-0 transform-gpu transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id || idx}
            className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] ease-out transform-gpu ${
              idx === currentIndex 
                ? 'opacity-100 scale-105 md:scale-110' 
                : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url("${slide.imageUrl}")`,
            }}
          />
        ))}

        {/* Mobile Overlay for pagination contrast & premium feel */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 md:hidden opacity-100 pointer-events-none"></div>

        {/* Mobile Pagination (inside card) */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden flex items-center justify-center bg-black/40 backdrop-blur-xl px-4 py-2.5 rounded-full gap-2 border border-white/10 shadow-lg">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  idx === currentIndex ? 'w-7 bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Desktop Overlays */}
      <div className="hidden md:block absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-90"></div>
      <div className="hidden md:block absolute inset-0 z-0 bg-gradient-to-t from-gray-950 dark:from-background via-gray-950/20 dark:via-background/20 to-transparent opacity-100"></div>
      <div className="hidden md:block absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent mix-blend-screen"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto md:px-12 lg:px-24 flex-1 flex flex-col justify-center pb-8 md:pb-0">
        <div key={currentIndex} className="max-w-3xl md:border-l-4 md:border-blue-500 md:pl-8 lg:pl-12 py-2 animate-fadeIn transition-all duration-500">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-5 md:mb-6 rounded-full bg-blue-500/10 md:bg-white/10 border border-blue-500/20 md:border-white/20 backdrop-blur-xl animate-float shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            </span>
            <span className="text-blue-500 md:text-blue-300 font-bold text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.25em] uppercase">
              Phoenix Premium <span className="hidden md:inline">&bull; Slide {currentIndex + 1} of {slides.length || 1}</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground md:from-white via-foreground/90 md:via-gray-100 to-foreground/60 md:to-gray-400 leading-[1.05] mb-5 md:mb-6 drop-shadow-sm md:drop-shadow-2xl tracking-[-0.02em]">
            {activeSlide.title}
          </h1>
          
          <p className="text-muted-foreground md:text-gray-200 text-lg md:text-2xl mb-8 md:mb-12 font-medium md:font-light drop-shadow-none md:drop-shadow-md max-w-2xl leading-relaxed">
            {activeSlide.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
            <Link 
              href={activeSlide.linkUrl || '/events'}
              className="relative inline-flex items-center justify-center px-8 py-3.5 md:px-10 md:py-4 overflow-hidden font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full group hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-sm md:text-base"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
              <span className="relative flex items-center transition-colors duration-300">
                {activeSlide.buttonText || 'Explore Events'}
                <ArrowUpRightIcon className="ml-2.5 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link href="/about" className="inline-flex justify-center sm:justify-start items-center text-foreground md:text-white hover:text-blue-500 md:hover:text-blue-300 font-semibold md:font-medium transition-colors group text-sm md:text-base py-3 sm:py-0">
              Watch Highlight Reel
              <div className="ml-3 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-border md:border-white/30 flex items-center justify-center backdrop-blur-md group-hover:border-blue-500 md:group-hover:border-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 md:group-hover:bg-blue-400/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-foreground md:text-white group-hover:text-blue-500 md:group-hover:text-blue-300 transition-colors"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Pagination (Arrows & Dots) */}
      {slides.length > 1 && (
        <div className="absolute bottom-24 right-6 md:bottom-12 md:right-10 z-20 hidden md:flex items-center gap-2 md:gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
          >
            &larr;
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
          >
            &rarr;
          </button>
        </div>
      )}
      
      {}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce text-gray-500 dark:text-white/50 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </div>
    </section>
  );
}

