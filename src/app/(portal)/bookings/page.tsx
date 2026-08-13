'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { bookingApi } from '@/features/artist-bookings/api';
import { ArtistBooking } from '@/features/artist-bookings/types';

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

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

export default function PortalBookingsPage() {
  const [bookings, setBookings] = useState<ArtistBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeDetailModal, setActiveDetailModal] = useState<ArtistBooking | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await bookingApi.getClientBookings();
      setBookings(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredBookings = useMemo(() => {
    if (activeFilter === 'ALL') return bookings;
    return bookings.filter(b => b.status === activeFilter);
  }, [bookings, activeFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Artist & Event Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Track celebrity artist rosters, rider specs, deposit status, and dedicated coordinator contacts.
          </p>
        </div>

        <button
          onClick={() => setShowNewBookingModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" /> Request New Artist Booking
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: `All Bookings (${bookings.length})` },
          { id: 'CONFIRMED', label: 'Confirmed' },
          { id: 'PENDING_DEPOSIT', label: 'Pending Deposit' },
          { id: 'PROPOSAL_SENT', label: 'Proposals Sent' },
          { id: 'COMPLETED', label: 'Completed' },
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

      {/* Bookings List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 p-8">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold">No bookings found for this filter</h3>
          <p className="text-gray-500 text-xs mt-1 mb-6">Select another filter or request a new celebrity booking.</p>
          <button
            onClick={() => setActiveFilter('ALL')}
            className="px-5 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl"
          >
            Show All Bookings
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            const badge = statusBadges[booking.status] || statusBadges.CONFIRMED;

            return (
              <div
                key={booking.id}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Info: Artist & Event */}
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

                {/* Right Specs & Actions */}
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
                      onClick={() => setActiveDetailModal(booking)}
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
      )}

      {/* DETAIL MODAL */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
            <button
              onClick={() => setActiveDetailModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-white/5">
              <img
                src={activeDetailModal.artistImage}
                alt={activeDetailModal.artistName}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase">{activeDetailModal.artistCategory}</span>
                <h3 className="text-2xl font-black">{activeDetailModal.artistName}</h3>
                <p className="text-xs text-gray-400">{activeDetailModal.eventType}</p>
              </div>
            </div>

            {/* Logistics & Rider Grid */}
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

            {/* Coordinator Info */}
            <div className="p-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-200 dark:border-orange-500/20">
              <span className="text-xs font-bold uppercase text-orange-600 dark:text-orange-400">Assigned On-Site Coordinator</span>
              <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{activeDetailModal.coordinatorName}</p>
              <p className="text-xs text-gray-500 mt-0.5">Direct Line: {activeDetailModal.coordinatorPhone}</p>
            </div>

            {activeDetailModal.notes && (
              <div>
                <span className="text-xs font-bold uppercase text-gray-400">Performance Notes & Instructions</span>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{activeDetailModal.notes}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
              <button
                onClick={() => alert(`Downloading contract for ${activeDetailModal.artistName}...`)}
                className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs"
              >
                Download Signed Contract (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW BOOKING MODAL */}
      {showNewBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn space-y-6">
            <button
              onClick={() => setShowNewBookingModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black">Request Artist Booking</h3>
            <p className="text-xs text-gray-500">Submit your event requirements and our artist manager will send a quote within 24 hours.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Booking request submitted! An artist coordinator will contact you shortly.'); setShowNewBookingModal(false); }} className="space-y-4">
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
      )}
    </div>
  );
}
