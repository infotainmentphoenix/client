import { XIcon } from '@/components/icons/PortalIcons';

type NewBookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NewBookingModal({ isOpen, onClose }: NewBookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-black">Request Artist Booking</h3>
        <p className="text-xs text-gray-500">Submit your event requirements and our artist manager will send a quote within 24 hours.</p>

        <form onSubmit={(e) => { e.preventDefault(); alert('Booking request submitted! An artist coordinator will contact you shortly.'); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Artist / Celebrity Name or Category</label>
            <input
              type="text"
              required
              placeholder="e.g. Armaan Malik, DJ Chetas, Playback Singer"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Event Type</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Wedding Sangeet / Reception</option>
              <option>Corporate Gala / Award Night</option>
              <option>Live Music Concert / Festival</option>
              <option>Private Birthday / VIP Party</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Event Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City & Venue</label>
            <input
              type="text"
              required
              placeholder="e.g. Mumbai, Taj Lands End"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl text-sm shadow-lg hover:opacity-95 transition-all mt-2"
          >
            Submit Booking Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
