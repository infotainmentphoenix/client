import { ArtistBooking } from '@/features/artist-bookings/types';
import { XIcon, CheckCircleIcon } from '@/components/icons/PortalIcons';

type BookingDetailModalProps = {
  booking: ArtistBooking | null;
  onClose: () => void;
};

export function BookingDetailModal({ booking, onClose }: BookingDetailModalProps) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-white/5">
          <img
            src={booking.artistImage}
            alt={booking.artistName}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase">{booking.artistCategory}</span>
            <h3 className="text-2xl font-black">{booking.artistName}</h3>
            <p className="text-xs text-gray-400">{booking.eventType}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
            <span className="font-bold text-gray-400 uppercase tracking-wider">Tech Rider Status</span>
            <p className="font-semibold text-gray-900 dark:text-white mt-1 flex items-center gap-1">
              <CheckCircleIcon className="w-4 h-4 text-green-500" /> Line Array & Sound Approved
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
            <span className="font-bold text-gray-400 uppercase tracking-wider">Green Room Rider</span>
            <p className="font-semibold text-gray-900 dark:text-white mt-1 flex items-center gap-1">
              <CheckCircleIcon className="w-4 h-4 text-green-500" /> VIP Suite & Hospitality Secured
            </p>
          </div>
        </div>

        <div className="p-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-200 dark:border-orange-500/20">
          <span className="text-xs font-bold uppercase text-orange-600 dark:text-orange-400">Assigned On-Site Coordinator</span>
          <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{booking.coordinatorName}</p>
          <p className="text-xs text-gray-500 mt-0.5">Direct Line: {booking.coordinatorPhone}</p>
        </div>

        {booking.notes && (
          <div>
            <span className="text-xs font-bold uppercase text-gray-400">Performance Notes & Instructions</span>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{booking.notes}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
          <button
            onClick={() => alert(`Downloading contract for ${booking.artistName}...`)}
            className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs"
          >
            Download Signed Contract (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
