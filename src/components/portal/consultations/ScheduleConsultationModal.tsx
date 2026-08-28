import { XIcon } from '@/components/icons/PortalIcons';

type ScheduleConsultationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ScheduleConsultationModal({ isOpen, onClose }: ScheduleConsultationModalProps) {
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

        <h3 className="text-2xl font-black">Schedule Strategy Call</h3>
        <p className="text-xs text-gray-500">Select your preferred topic and date to book a 1-on-1 strategy call with Phoenix directors.</p>

        <form onSubmit={(e) => { e.preventDefault(); alert('Strategy call booked successfully! Meeting link sent to your email.'); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Consultation Topic</label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Wedding Decor Strategy, Celebrity Artist Booking"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Preferred Mode</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="VIRTUAL_MEET">Virtual Video Meet (Google Meet)</option>
              <option value="IN_PERSON">In-Person at Phoenix Corporate Office</option>
              <option value="PHONE_CALL">Direct Phone Call</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Preferred Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Preferred Time Slot</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>11:00 AM - 12:00 PM IST</option>
              <option>02:00 PM - 03:00 PM IST</option>
              <option>04:00 PM - 05:00 PM IST</option>
              <option>06:00 PM - 07:00 PM IST</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl text-sm shadow-lg hover:opacity-95 transition-all mt-2"
          >
            Confirm Consultation Booking
          </button>
        </form>
      </div>
    </div>
  );
}
