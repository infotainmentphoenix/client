import Link from 'next/link';
import { CalendarIcon, MapPinIcon, PhoneIcon } from '@/components/icons/PortalIcons';

const mockUpcomingEvents = [
  {
    title: 'Royal Wedding Sangeet',
    artist: 'Armaan Malik',
    date: 'Nov 20, 2026',
    time: '07:00 PM IST',
    venue: 'City Palace Grounds, Udaipur',
    coordinator: 'Ananya Deshmukh',
    phone: '+91 98765 11223',
  },
  {
    title: 'Corporate Gala & Awards',
    artist: 'DJ Chetas',
    date: 'Dec 05, 2026',
    time: '08:00 PM IST',
    venue: 'St. Regis Ballrooms, Mumbai',
    coordinator: 'Siddharth Mehta',
    phone: '+91 98765 44332',
  },
];

export function UpcomingSchedule() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
        <h2 className="text-xl font-black">Upcoming Event Schedule</h2>
        <Link href="/bookings" className="text-xs font-bold text-orange-500 hover:underline">View Bookings</Link>
      </div>

      <div className="space-y-4">
        {mockUpcomingEvents.map((event, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">Scheduled Show</span>
              <h3 className="text-base font-bold">{event.title} — {event.artist}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {event.date} at {event.time}</span>
                <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5" /> {event.venue}</span>
              </div>
            </div>

            <a
              href={`tel:${event.phone}`}
              className="px-4 py-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-center shrink-0 hover:bg-orange-200 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5" /> Call Lead Director
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
