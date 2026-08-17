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

const DEFAULT_SLIDE: Partial<Carousel> = {
  title: 'Elevate Your Experience',
  subtitle: 'Discover the life, energy, and unyielding purpose of Phoenix Infotainment. Where moments become legendary.',
  imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c090be5c560?q=80&w=2000&auto=format&fit=crop',
  buttonText: 'Explore Events',
  linkUrl: '/events',
};

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
        } else {
          setSlides([DEFAULT_SLIDE]);
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

  const activeSlide = slides[currentIndex] || DEFAULT_SLIDE;

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
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-start overflow-hidden pt-32">
      <AuroraBackground />
      
      {}
      <div 
        key={activeSlide.imageUrl || currentIndex}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-[1000ms] ease-in-out scale-105 hover:scale-110"
        style={{
          backgroundImage: `url("${activeSlide.imageUrl || DEFAULT_SLIDE.imageUrl}")`,
        }}
      >
        {}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 dark:from-black dark:via-black/75 to-transparent opacity-90 transition-opacity duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050505] via-transparent to-transparent opacity-100"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 dark:from-blue-900/30 via-transparent to-transparent mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      {}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl border-l-[3px] border-blue-500 pl-8 md:pl-12 py-2 animate-fadeIn">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-[0.2em] uppercase">
              Phoenix Premium &bull; Slide {currentIndex + 1} of {slides.length || 1}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500 leading-[1.1] mb-6 drop-shadow-sm dark:drop-shadow-2xl tracking-tighter">
            {activeSlide.title || DEFAULT_SLIDE.title}
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-2xl mb-10 font-light drop-shadow-sm dark:drop-shadow-md max-w-xl leading-relaxed">
            {activeSlide.subtitle || DEFAULT_SLIDE.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <Link 
              href={activeSlide.linkUrl || '/events'}
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full group animate-pulse-glow hover:scale-105 transition-all duration-300"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-black dark:bg-white rounded-full group-hover:w-64 group-hover:h-56"></span>
              <span className="relative flex items-center group-hover:text-white dark:group-hover:text-blue-600 transition-colors duration-300">
                {activeSlide.buttonText || 'Explore Events'}
                <ArrowUpRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link href="/about" className="inline-flex items-center text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors group">
              Watch Highlight Reel
              <div className="ml-3 w-12 h-12 rounded-full border border-gray-300 dark:border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:bg-blue-600/10 dark:group-hover:bg-blue-400/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {}
      {slides.length > 1 && (
        <div className="absolute bottom-10 right-10 z-20 flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all"
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
                  idx === currentIndex ? 'w-8 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-gray-300 dark:bg-white/30'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all"
          >
            &rarr;
          </button>
        </div>
      )}
      
      {}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-gray-500 dark:text-white/50 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase mb-2">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </div>
    </section>
  );
}

