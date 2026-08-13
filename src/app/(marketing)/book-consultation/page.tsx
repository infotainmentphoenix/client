'use client';

import { useState } from 'react';
import Link from 'next/link';

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);

const eventTypes = [
  'Corporate Event', 'Wedding', 'Concert', 'Festival', 'Product Launch',
  'Private Party', 'Awards Ceremony', 'Entertainment Show', 'Other'
];

const budgetRanges = [
  'Under ₹5 Lakhs', '₹5 - 15 Lakhs', '₹15 - 50 Lakhs', '₹50 Lakhs - 1 Crore', 'Above ₹1 Crore', 'Flexible / Not Sure'
];

export default function BookConsultationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [budget, setBudget] = useState('');
  const [city, setCity] = useState('');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock submission (no backend endpoint for consultations)
    await new Promise(r => setTimeout(r, 2000));
    setIsSuccess(true);
    setIsLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-[#0a0a0a] pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">Free Consultation</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Let's Plan Your{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">Dream Event</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Share your vision with us and our expert team will craft a personalized plan tailored to your needs — completely free.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Why Consult */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why Book a Consultation?</h2>
            <div className="space-y-6">
              {[
                { icon: '🎯', title: 'Personalized Planning', desc: 'We understand your vision and create a bespoke event plan.' },
                { icon: '💡', title: 'Expert Guidance', desc: 'Our experienced team will guide you through every decision.' },
                { icon: '🎨', title: 'Creative Concepts', desc: 'Unique themes, decor ideas, and entertainment concepts tailored for you.' },
                { icon: '💰', title: 'Budget Optimization', desc: 'Maximize your event experience within your preferred budget.' },
                { icon: '⏱️', title: 'Time-Saving', desc: 'We handle the complexities so you can enjoy the process.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-8">
              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="relative inline-block mb-6">
                    <CheckCircleIcon className="w-20 h-20 text-green-500" />
                    <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Consultation Booked!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">Our team will reach out to you within 24 hours to schedule your free consultation session.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/events" className="px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-sm">
                      Browse Our Events
                    </Link>
                    <Link href="/artists" className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors text-sm">
                      Explore Artists
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone *</label>
                      <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Type *</label>
                      <select required value={eventType} onChange={e => setEventType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white text-sm">
                        <option value="">Select event type</option>
                        {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Date</label>
                      <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Expected Guests</label>
                      <input type="number" value={guestCount} onChange={e => setGuestCount(e.target.value)} placeholder="e.g. 500" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Pune" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Range</label>
                    <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white text-sm">
                      <option value="">Select budget range</option>
                      {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tell Us More About Your Event</label>
                    <textarea rows={4} value={details} onChange={e => setDetails(e.target.value)} placeholder="Describe your dream event — themes, special requirements, artist preferences..." className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm resize-none" />
                  </div>

                  <button type="submit" disabled={isLoading} className="relative w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] disabled:opacity-70 overflow-hidden group">
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? <><LoaderIcon className="w-5 h-5 animate-spin" /><span>Submitting...</span></> : <><CalendarIcon className="w-5 h-5" /><span>Book Free Consultation</span></>}
                    </div>
                  </button>

                  <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    By submitting, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
