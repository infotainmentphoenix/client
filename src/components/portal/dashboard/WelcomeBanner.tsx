import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/PortalIcons';

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-white/10 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold rounded-full">
            👑 VIP Client Command Hub
          </span>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Welcome back, Client User! 👋
          </h1>

          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Your next event <strong className="text-white font-bold">&quot;Royal Udaipur Destination Wedding&quot;</strong> is scheduled in <span className="text-orange-400 font-bold">14 days</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/bookings"
            className="px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            Manage Artist Bookings <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/consultations"
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs backdrop-blur transition-all"
          >
            Schedule Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
