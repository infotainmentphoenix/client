'use client';

import { useEffect, useRef, useState } from 'react';

function Counter({ end, duration, suffix = '' }: { end: number, duration: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 tracking-tighter drop-shadow-sm dark:drop-shadow-lg">
      {count}{suffix}
    </div>
  );
}

export function PhoenixStats() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-24 relative z-10 my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 dark:via-blue-500/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center">
        <div className="flex flex-col items-center">
          <Counter end={500} duration={2500} suffix="+" />
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase mt-4 text-sm">Exclusive Artists</span>
        </div>
        <div className="flex flex-col items-center">
          <Counter end={10} duration={2500} suffix="K+" />
          <span className="text-purple-600 dark:text-purple-400 font-bold tracking-[0.2em] uppercase mt-4 text-sm">Monthly Attendees</span>
        </div>
        <div className="flex flex-col items-center">
          <Counter end={50} duration={2500} suffix="+" />
          <span className="text-pink-600 dark:text-pink-400 font-bold tracking-[0.2em] uppercase mt-4 text-sm">Premium Venues</span>
        </div>
      </div>
    </section>
  );
}
