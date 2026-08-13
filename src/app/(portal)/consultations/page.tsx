'use client';

import { useState, useEffect, useMemo } from 'react';
import { consultationApi } from '@/features/consultations/api';
import { Consultation } from '@/features/consultations/types';

const VideoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const statusBadges: Record<string, { label: string; style: string }> = {
  SCHEDULED: { label: 'Scheduled', style: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  COMPLETED: { label: 'Completed', style: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20' },
  RESCHEDULED: { label: 'Rescheduled', style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  CANCELLED: { label: 'Cancelled', style: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
};

export default function PortalConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeNotesModal, setActiveNotesModal] = useState<Consultation | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await consultationApi.getConsultations();
      setConsultations(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredConsultations = useMemo(() => {
    if (activeFilter === 'ALL') return consultations;
    return consultations.filter(c => c.status === activeFilter);
  }, [consultations, activeFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Strategy Calls & Consultations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage your 1-on-1 strategy sessions, video meet links, and director meeting notes.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" /> Schedule Strategy Session
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: `All Sessions (${consultations.length})` },
          { id: 'SCHEDULED', label: 'Upcoming Scheduled' },
          { id: 'COMPLETED', label: 'Completed' },
          { id: 'RESCHEDULED', label: 'Rescheduled' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow'
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Meetings Grid */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : filteredConsultations.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 p-8">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold">No consultations found</h3>
          <p className="text-gray-500 text-xs mt-1 mb-6">Schedule a 1-on-1 strategy call with our lead event producers.</p>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl"
          >
            Schedule Consultation
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredConsultations.map((item) => {
            const badge = statusBadges[item.status] || statusBadges.SCHEDULED;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Meeting Info */}
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

                {/* Right Consultant & Actions */}
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
                      onClick={() => setActiveNotesModal(item)}
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
      )}

      {/* NOTES & RESCHEDULE MODAL */}
      {activeNotesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
            <button
              onClick={() => setActiveNotesModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-orange-500 uppercase">{activeNotesModal.eventType}</span>
              <h3 className="text-2xl font-black mt-0.5">{activeNotesModal.title}</h3>
              <p className="text-xs text-gray-400 mt-1">📅 {activeNotesModal.date} • {activeNotesModal.timeSlot}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                <span className="font-bold text-gray-400 uppercase tracking-wider">Session Agenda</span>
                <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{activeNotesModal.agenda}</p>
              </div>

              {activeNotesModal.notes && (
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Producer Meeting Notes</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{activeNotesModal.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-3">
              <button
                onClick={() => alert(`Reschedule request sent for: ${activeNotesModal.title}. Our director will contact you.`)}
                className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-xs"
              >
                Request Date/Time Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW SCHEDULE MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black">Schedule Strategy Call</h3>
            <p className="text-xs text-gray-500">Select your preferred topic and date to book a 1-on-1 strategy call with Phoenix directors.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Strategy call booked successfully! Meeting link sent to your email.'); setShowScheduleModal(false); }} className="space-y-4">
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
      )}
    </div>
  );
}
