import { Consultation } from '@/features/consultations/types';
import { XIcon } from '@/components/icons/PortalIcons';

type ConsultationNotesModalProps = {
  consultation: Consultation | null;
  onClose: () => void;
};

export function ConsultationNotesModal({ consultation, onClose }: ConsultationNotesModalProps) {
  if (!consultation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-orange-500 uppercase">{consultation.eventType}</span>
          <h3 className="text-2xl font-black mt-0.5">{consultation.title}</h3>
          <p className="text-xs text-gray-400 mt-1">📅 {consultation.date} • {consultation.timeSlot}</p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
            <span className="font-bold text-gray-400 uppercase tracking-wider">Session Agenda</span>
            <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{consultation.agenda}</p>
          </div>

          {consultation.notes && (
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <span className="font-bold text-gray-400 uppercase tracking-wider">Producer Meeting Notes</span>
              <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{consultation.notes}</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-3">
          <button
            onClick={() => alert(`Reschedule request sent for: ${consultation.title}. Our director will contact you.`)}
            className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-xs"
          >
            Request Date/Time Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}
