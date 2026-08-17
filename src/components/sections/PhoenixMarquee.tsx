'use client';

export function PhoenixMarquee() {
  const words = [
    { text: "LIVE STADIUM CONCERTS", icon: "🔥", color: "from-amber-500 to-rose-500" },
    { text: "CELEBRITY BOOKINGS", icon: "🎤", color: "from-purple-500 to-indigo-500" },
    { text: "CORPORATE LEADERSHIP GALAS", icon: "🏆", color: "from-blue-500 to-cyan-500" },
    { text: "ROYAL DESTINATION WEDDINGS", icon: "💍", color: "from-pink-500 to-rose-500" },
    { text: "WORLD CLASS LIGHT & SOUND", icon: "🔊", color: "from-emerald-500 to-teal-500" },
    { text: "EXCLUSIVE ARTISTS ROSTER", icon: "🎧", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="w-full py-4 bg-gray-900/90 dark:bg-black/90 text-white border-y border-white/10 overflow-hidden flex whitespace-nowrap relative z-10 my-8 shadow-2xl backdrop-blur-xl">
      {}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-gray-900 dark:from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-gray-900 dark:from-[#050505] to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-12 px-6">
        {words.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-xl">{item.icon}</span>
            <span 
              className={`text-sm md:text-base font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r ${item.color} drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]`}
            >
              {item.text}
            </span>
            <span className="text-xs text-blue-400/60 font-bold ml-4">&bull;</span>
          </div>
        ))}
      </div>
      <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-12 px-6" aria-hidden="true">
        {words.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-4">
            <span className="text-xl">{item.icon}</span>
            <span 
              className={`text-sm md:text-base font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r ${item.color} drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]`}
            >
              {item.text}
            </span>
            <span className="text-xs text-blue-400/60 font-bold ml-4">&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
