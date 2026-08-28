import { BriefcaseIcon, CalendarIcon, VideoIcon, CheckCircleIcon } from '@/components/icons/PortalIcons';

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-gray-400">Active Projects</span>
          <div className="p-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
            <BriefcaseIcon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-3xl font-black text-gray-900 dark:text-white">3</p>
        <span className="text-xs text-green-500 font-semibold mt-1 inline-block">● All 3 On Schedule</span>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-gray-400">Confirmed Artists</span>
          <div className="p-2.5 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-3xl font-black text-gray-900 dark:text-white">4</p>
        <span className="text-xs text-rose-500 font-semibold mt-1 inline-block">Riders & Suites Confirmed</span>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-gray-400">Upcoming Strategy Calls</span>
          <div className="p-2.5 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <VideoIcon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-3xl font-black text-gray-900 dark:text-white">2</p>
        <span className="text-xs text-purple-500 font-semibold mt-1 inline-block">Google Meet Links Ready</span>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-gray-400">Total Contract Value</span>
          <div className="p-2.5 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl">
            <CheckCircleIcon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-3xl font-black text-gray-900 dark:text-white">₹48.5L</p>
        <span className="text-xs text-green-500 font-semibold mt-1 inline-block">Milestone Payment 75% Complete</span>
      </div>
    </div>
  );
}
