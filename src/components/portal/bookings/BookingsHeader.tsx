import { PlusIcon } from '@/components/icons/PortalIcons';

export function BookingsHeader({ onNewBooking }: { onNewBooking: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Artist & Event Bookings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Track celebrity artist rosters, rider specs, deposit status, and dedicated coordinator contacts.
        </p>
      </div>

      <button
        onClick={onNewBooking}
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm flex items-center gap-2"
      >
        <PlusIcon className="w-4 h-4" /> Request New Artist Booking
      </button>
    </div>
  );
}
