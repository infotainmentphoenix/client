import { Consultation } from '@/features/consultations/types';
import { CalendarIcon, MapPinIcon, ClockIcon, VideoIcon, ExternalLinkIcon } from '@/components/icons/PortalIcons';

const statusBadges: Record<string, { label: string; style: string }> = {
  SCHEDULED: { label: 'Scheduled', style: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  COMPLETED: { label: 'Completed', style: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20' },
  RESCHEDULED: { label: 'Rescheduled', style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  CANCELLED: { label: 'Cancelled', style: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
};

type ConsultationsListProps = {
  isLoading: boolean;
  consultations: Consultation[];
  onViewNotes: (consultation: Consultation) => void;
  onSchedule: () => void;
};

export function ConsultationsList({ isLoading, consultations, onViewNotes, onSchedule }: ConsultationsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-44 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
        ))}
      </div>
    );
  }

  if (consultations.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 p-8">
        <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold">No consultations found</h3>
        <p className="text-gray-500 text-xs mt-1 mb-6">Schedule a 1-on-1 strategy call with our lead event producers.</p>
        <button
          onClick={onSchedule}
          className="px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl"
        >
          Schedule Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {consultations.map((item) => {
        const badge = statusBadges[item.status] || statusBadges.SCHEDULED;

        return (
          <div
            key={item.id}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${badge.style}`}>
                  ● {badge.label}
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full border border-purple-500/20 flex items-center gap-1">
                  {item.mode === 'VIRTUAL_MEET' ? <VideoIcon className="w-3.5 h-3.5" /> : item.mode === 'IN_PERSON' ? <MapPinIcon className="w-3.5 h-3.5" /> : '📞 Phone Call'}
                  {item.mode.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">🎉 {item.eventType}</span>
                <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-orange-500" /> {item.date}</span>
                <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5 text-orange-500" /> {item.timeSlot}</span>
              </div>

              {item.agenda && (
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                  <strong className="text-orange-500 font-bold">Agenda:</strong> {item.agenda}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <img
                  src={item.consultantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={item.consultantName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10"
                />
                <div className="text-left lg:text-right">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.consultantName}</h4>
                  <p className="text-[11px] text-gray-500">{item.consultantRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.meetingUrl && item.status === 'SCHEDULED' && (
                  <a
                    href={item.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-1.5"
                  >
                    <VideoIcon className="w-3.5 h-3.5" /> Join Google Meet <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={() => onViewNotes(item)}
                  className="px-4 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  View Notes & Reschedule
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
