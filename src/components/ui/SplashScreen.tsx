"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/banquet-hall-weddings-banquet-hall-decoration-atmospheric-decor.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/glance-path-lies-garlands-made-threads-with-chrysanthemum-buds.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/glance-path-lies-garlands-made-threads-with-chrysanthemum-buds.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/people-having-fun-club.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/photorealistic-wedding-venue-with-intricate-decor-ornaments.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/view-futuristic-concert.jpg", // Replaced broken 'generative-ai' link
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/view-futuristic-concert.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/close-up-recording-video-with-smartphone-concert.jpg",
  "https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/close-up-recording-video-with-smartphone-concert.jpg",
];

const COL_1 = [PHOTOS[0], PHOTOS[1], PHOTOS[2], PHOTOS[0], PHOTOS[1], PHOTOS[2]];
const COL_2 = [PHOTOS[3], PHOTOS[4], PHOTOS[5], PHOTOS[3], PHOTOS[4], PHOTOS[5]];
const COL_3 = [PHOTOS[6], PHOTOS[7], PHOTOS[8], PHOTOS[6], PHOTOS[7], PHOTOS[8]];

const ScrollingColumn = ({ images, direction }: { images: string[], direction: "up" | "down" }) => {
  return (
    <motion.div
      className="flex flex-col gap-2 md:gap-4 w-full h-[300vh]"
      style={{ 
        willChange: "transform", 
        transform: "translateZ(0)",
        backfaceVisibility: "hidden" // Ultimate strict hardware compositing
      }} 
      initial={{ y: direction === "up" ? "0vh" : "-150vh" }}
      animate={{ 
        y: direction === "up" 
          ? ["0vh", "-45vh", "-300vh"] 
          : ["-150vh", "-105vh", "150vh"] 
      }}
      transition={{
        duration: 2.5, 
        times: [0, 0.65, 1], // 0 to 1.6s (scroll), 1.6s to 2.5s (fly off)
        ease: ["linear", "circIn"], // Accelerates smoothly off screen
      }}
    >
      {images.map((src, i) => (
        <div 
          key={i} 
          className="flex-1 w-full relative rounded-lg md:rounded-2xl overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }} 
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${src})`,
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-black/50"
            style={{ willChange: "opacity", backfaceVisibility: "hidden" }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.5 }}
          />
        </div>
      ))}
    </motion.div>
  );
};

// Crackers / Firework Particles Component
const FireworkParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate 60 random particles on client side only to ensure purity
    const generated = Array.from({ length: 60 }).map((_, i) => {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const distance = 100 + Math.random() * 500; // Explode far out
      const size = 2 + Math.random() * 6;
      const duration = 0.8 + Math.random() * 1.5;
      // Luxurious event colors: Gold, Silver, Electric Blue, Purple
      const colors = ["#fbbf24", "#fcd34d", "#f8fafc", "#60a5fa", "#c084fc", "#e879f9"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size,
        duration,
        color
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 1, 0], scale: [0, 1, 0.5] }}
          transition={{
            duration: p.duration,
            ease: "easeOut",
            delay: 1.6, // Synced to explode right when the columns fly off
          }}
        />
      ))}
    </div>
  );
};

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("splashSeen") === "true") {
      setShowSplash(false);
    } else {
      // Mark as seen IMMEDIATELY
      sessionStorage.setItem("splashSeen", "true");
      
      // Auto-hide the splash screen after the cinematic sequence
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 4500); 
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showSplash && mounted) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (sessionStorage.getItem('splashSeen') === 'true') {
              document.documentElement.classList.add('hide-splash');
            }
          `,
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-splash #phoenix-splash-wrapper {
            display: none !important;
          }
        `
      }} />

      <div id="phoenix-splash-wrapper">
        {!mounted ? (
          <div className="fixed inset-0 z-[9999] bg-black" />
        ) : (
          <AnimatePresence>
            {showSplash && (
              <motion.div
                key="splash"
                className="fixed inset-0 z-[9999] bg-white dark:bg-black overflow-hidden"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              >
                {/* 3 Scrolling Columns */}
                <div className="absolute inset-0 flex gap-2 md:gap-4 p-2 md:p-4 z-10 overflow-hidden">
                  <div className="flex-1 overflow-hidden">
                    <ScrollingColumn images={COL_1} direction="up" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <ScrollingColumn images={COL_2} direction="down" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <ScrollingColumn images={COL_3} direction="up" />
                  </div>
                </div>

                {/* Crackers (Fireworks) */}
                <FireworkParticles />

                {/* Glorious Logo Reveal */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 1.7, // Reveal exactly as the columns fly out
                    }}
                  >
                    <img 
                      src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png" 
                      alt="Phoenix" 
                      className="hidden dark:block w-48 sm:w-64 md:w-80 lg:w-96 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] mb-4" 
                    />
                    <img 
                      src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20Black.png" 
                      alt="Phoenix" 
                      className="block dark:hidden w-48 sm:w-64 md:w-80 lg:w-96 drop-shadow-[0_0_40px_rgba(0,0,0,0.4)] mb-4" 
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
