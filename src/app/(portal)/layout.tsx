import { PortalNav } from '@/components/layout/portal-nav';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <PortalNav />

      <div className="flex-1 flex flex-col min-w-0">
        {}
        <header className="h-16 sticky top-0 z-40 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xs font-bold rounded-full shadow">
              VIP Client Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow">
                CU
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                  Client User
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                  client@phoenixinfotainment.com
                </span>
              </div>
            </div>
          </div>
        </header>

        {}
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
