import Link from 'next/link';
import { CheckCircleIcon } from '@/components/icons/PortalIcons';

const mockProjects = [
  {
    title: 'Royal Udaipur Destination Wedding Sangeet',
    date: 'Nov 20, 2026',
    progress: 85,
    statusText: 'Stage Staging & Sound Check Underway',
    artist: 'Armaan Malik & Band',
    color: 'from-orange-500 to-rose-500',
  },
  {
    title: 'Annual Fortune 500 Corporate Gala & Awards Night',
    date: 'Dec 05, 2026',
    progress: 60,
    statusText: '3D Curved LED Trussing & Security Licensing',
    artist: 'DJ Chetas',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'National Tech Leadership Summit 2026',
    date: 'Jan 15, 2027',
    progress: 35,
    statusText: 'Delegate Registration & Keynote Speaker Alignment',
    artist: 'Zakir Khan & Anchors',
    color: 'from-emerald-500 to-teal-500',
  },
];

export function LiveEventProgress() {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
        <div>
          <h2 className="text-xl font-black">Live Event Execution Progress</h2>
          <p className="text-gray-500 text-xs mt-0.5">Real-time status of your active event productions.</p>
        </div>
        <Link href="/projects" className="text-xs font-bold text-orange-500 hover:underline">
          View All Projects &rarr;
        </Link>
      </div>

      <div className="space-y-6">
        {mockProjects.map((project, idx) => (
          <div key={idx} className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>📅 Date: {project.date}</span>
                  <span>🎤 Artist: {project.artist}</span>
                </div>
              </div>
              <span className="text-xs font-black text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 px-3 py-1 rounded-full">
                {project.progress}% Completed
              </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-1000`} style={{ width: `${project.progress}%` }} />
            </div>

            <p className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
              <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" /> Currently: {project.statusText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
