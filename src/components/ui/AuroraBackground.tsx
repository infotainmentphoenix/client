'use client';

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-400/30 dark:bg-blue-600/30 blur-[100px] md:blur-[150px] rounded-full animate-blob mix-blend-screen dark:mix-blend-lighten"></div>
      <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-400/30 dark:bg-purple-600/30 blur-[100px] md:blur-[150px] rounded-full animate-blob animation-delay-2000 mix-blend-screen dark:mix-blend-lighten"></div>
      <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-pink-400/30 dark:bg-pink-600/30 blur-[100px] md:blur-[150px] rounded-full animate-blob animation-delay-4000 mix-blend-screen dark:mix-blend-lighten"></div>
    </div>
  );
}
