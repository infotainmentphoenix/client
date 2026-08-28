import { ArtistBooking } from '@/features/artist-bookings/types';
import { CalendarIcon, MapPinIcon, FileTextIcon, PhoneIcon } from '@/components/icons/PortalIcons';

const statusBadges: Record<string, { label: string; style: string }> = {
  CONFIRMED: { label: 'Confirmed', style: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  PENDING_DEPOSIT: { label: 'Pending Deposit', style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  PROPOSAL_SENT: { label: 'Proposal Sent', style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  COMPLETED: { label: 'Completed', style: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20' },
  CANCELLED: { label: 'Cancelled', style: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
};

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

type BookingsListProps = {
  isLoading: boolean;
  bookings: ArtistBooking[];
  onViewDetails: (booking: ArtistBooking) => void;
  onClearFilter: () => void;
};

export function BookingsList({ isLoading, bookings, onViewDetails, onClearFilter }: BookingsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-44 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 p-8">
        <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold">No bookings found for this filter</h3>
        <p className="text-gray-500 text-xs mt-1 mb-6">Select another filter or request a new celebrity booking.</p>
        <button
          onClick={onClearFilter}
          className="px-5 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl"
        >
          Show All Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => {
        const badge = statusBadges[booking.status] || statusBadges.CONFIRMED;

        return (
          <div
            key={booking.id}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-5">
              <img
                src={booking.artistImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80'}
                alt={booking.artistName}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-gray-200 dark:border-white/10 shadow"
              />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${badge.style}`}>
                    ● {badge.label}
                  </span>
                  <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded-md">
                    {booking.artistCategory}
                  </span>
                </div>

                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  {booking.artistName}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">🎉 {booking.eventType}</span>
                  <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-orange-500" /> {booking.eventDate}</span>
                  <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5 text-orange-500" /> {booking.venue}, {booking.city}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 dark:border-white/5">
              <div className="text-left lg:text-right">
                <p className="text-xs text-gray-400 font-semibold">Contract Amount</p>
                <p className="text-lg font-black text-orange-600 dark:text-orange-400">
                  {formatCurrency(booking.contractValue)}
                </p>
                <span className="text-[11px] text-gray-500">
                  Deposit Status: <strong className={booking.depositPaid ? 'text-green-500' : 'text-amber-500'}>{booking.depositPaid ? 'Paid ✅' : 'Pending ⏳'}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewDetails(booking)}
                  className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  <FileTextIcon className="w-3.5 h-3.5" /> View Rider & Specs
                </button>
                <a
                  href={`tel:${booking.coordinatorPhone}`}
                  className="p-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-200 transition-colors"
                  title={`Call Coordinator (${booking.coordinatorName})`}
                >
                  <PhoneIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
