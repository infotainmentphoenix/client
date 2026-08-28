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
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end md:justify-center overflow-hidden pb-12 md:pb-0 pt-24 md:pt-20 px-5 md:px-0">
      <div className="hidden md:block">
        <AuroraBackground />
      </div>
      
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id || idx}
            className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] ease-out transform-gpu ${
              idx === currentIndex 
                ? 'opacity-100 scale-105' 
                : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url("${slide.imageUrl}")`,
            }}
          />
        ))}

        {/* Gradient Overlays for perfect text readability on all devices */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 md:opacity-80"></div>
        <div className="hidden md:block absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-90"></div>
        <div className="hidden md:block absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent mix-blend-screen"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto md:px-12 lg:px-24 flex-1 flex flex-col justify-end md:justify-center w-full">
        <div key={currentIndex} className="max-w-3xl md:border-l-4 md:border-orange-500 md:pl-8 lg:pl-12 py-2 animate-fadeIn transition-all duration-500">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
            </span>
            <span className="text-white font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
              Phoenix Premium <span className="hidden md:inline">&bull; Slide {currentIndex + 1} of {slides.length || 1}</span>
            </span>
          </div>
          
          <h1 className="text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400 mb-5 drop-shadow-2xl tracking-tight">
            {activeSlide.title}
          </h1>
          
          <p className="text-gray-300 text-lg md:text-2xl mb-8 md:mb-12 font-medium md:font-light drop-shadow-md max-w-2xl leading-relaxed">
            {activeSlide.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full sm:w-auto">
            <Link 
              href={activeSlide.linkUrl || '/events'}
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white bg-white/10 border border-white/20 backdrop-blur-lg rounded-full group hover:bg-white/20 hover:border-white/40 transition-all duration-300 w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center tracking-wide text-sm md:text-base">
                {activeSlide.buttonText || 'Explore Events'}
                <ArrowUpRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link href="/about" className="inline-flex justify-center sm:justify-start items-center text-white/80 hover:text-white font-medium transition-colors group text-sm md:text-base py-2 sm:py-0">
              Watch Highlight Reel
              <div className="ml-3 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:border-white/70 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Pagination */}
      {slides.length > 1 && (
        <div className="absolute top-24 right-5 z-20 flex md:hidden gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-5 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Desktop Pagination (Arrows & Dots) */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 right-10 z-20 hidden md:flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all shadow-lg"
          >
            &larr;
          </button>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all shadow-lg"
          >
            &rarr;
          </button>
        </div>
      )}
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce text-white/60 pointer-events-none">
        <span className="text-[10px] tracking-[0.3em] font-medium uppercase mb-2">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </div>
    </section>
  );
}
