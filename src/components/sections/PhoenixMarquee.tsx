'use client';

function MarqueeItem({ text, outline = false }: { text: string; outline?: boolean }) {
  return (
    <div className="flex items-center gap-4 md:gap-8 mx-4">
      <span 
        className={`text-[10px] md:text-[12px] font-bold tracking-[0.3em] uppercase whitespace-nowrap 
          ${outline 
            ? 'text-transparent' 
            : 'text-gray-300 drop-shadow-sm'
          }`}
        style={outline ? { WebkitTextStroke: '1px rgba(255,255,255,0.4)' } : {}}
      >
        {text}
      </span>
      {/* Delicate Sparkle Icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 md:w-4 md:h-4 ${outline ? 'text-white/20' : 'text-purple-400/70'}`}>
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
      </svg>
    </div>
  );
}

export function PhoenixMarquee() {
  const items = [
    "Stadium Concerts", 
    "Celebrity Bookings", 
    "Corporate Galas", 
    "Royal Weddings", 
    "World Class Production",
    "Global Talent"
  ];

  return (
    <div className="w-full relative py-6 md:py-10 overflow-hidden flex flex-col justify-center bg-gray-950 dark:bg-transparent z-20">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 max-w-4xl bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-2 -rotate-1 scale-[1.01] transform-gpu">
        
        {/* Row 1 - Glassmorphic Dark Ribbon */}
        <div className="flex w-full overflow-hidden bg-white/[0.05] dark:bg-white/[0.02] py-2.5 border-y border-white/[0.05] backdrop-blur-md shadow-xl group">
          <div className="flex animate-marquee min-w-full shrink-0 items-center group-hover:[animation-play-state:paused] transition-all duration-300">
            {items.map((item, i) => <MarqueeItem key={i} text={item} />)}
            {items.map((item, i) => <MarqueeItem key={`dup-${i}`} text={item} />)}
          </div>
          <div className="flex animate-marquee min-w-full shrink-0 items-center group-hover:[animation-play-state:paused] transition-all duration-300" aria-hidden="true">
            {items.map((item, i) => <MarqueeItem key={`dup2-${i}`} text={item} />)}
            {items.map((item, i) => <MarqueeItem key={`dup3-${i}`} text={item} />)}
          </div>
        </div>

        {/* Row 2 - Very faint reverse ribbon */}
        <div className="flex w-full overflow-hidden bg-black/60 dark:bg-black/40 py-2.5 border-b border-white/[0.02] backdrop-blur-sm group -mt-[1px]">
          <div 
            className="flex animate-marquee min-w-full shrink-0 items-center group-hover:[animation-play-state:paused] transition-all duration-300 opacity-60" 
            style={{ animationDirection: 'reverse' }}
          >
            {[...items].reverse().map((item, i) => <MarqueeItem key={i} text={item} outline={true} />)}
            {[...items].reverse().map((item, i) => <MarqueeItem key={`dup-${i}`} text={item} outline={true} />)}
          </div>
          <div 
            className="flex animate-marquee min-w-full shrink-0 items-center group-hover:[animation-play-state:paused] transition-all duration-300 opacity-60" 
            aria-hidden="true"
            style={{ animationDirection: 'reverse' }}
          >
            {[...items].reverse().map((item, i) => <MarqueeItem key={`dup2-${i}`} text={item} outline={true} />)}
            {[...items].reverse().map((item, i) => <MarqueeItem key={`dup3-${i}`} text={item} outline={true} />)}
          </div>
        </div>

      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-950 dark:from-background via-gray-950/50 dark:via-background/50 to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-950 dark:from-background via-gray-950/50 dark:via-background/50 to-transparent z-30 pointer-events-none" />
    </div>
  );
}
