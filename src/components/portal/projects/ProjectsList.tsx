import Link from 'next/link';
import { ClientProject } from '@/features/client-projects/types';
import { BriefcaseIcon, CalendarIcon, MapPinIcon, ArrowRightIcon } from '@/components/icons/PortalIcons';

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

type ProjectsListProps = {
  isLoading: boolean;
  projects: ClientProject[];
};

export function ProjectsList({ isLoading, projects }: ProjectsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 p-8">
        <BriefcaseIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold">No projects found</h3>
        <p className="text-gray-500 text-xs mt-1">Select another filter tab.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, idx) => (
        <div
          key={`${project.id}-${project.slug}-${idx}`}
          className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="relative h-48 bg-gray-900 overflow-hidden">
              <img
                src={project.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-black/60 backdrop-blur text-white text-xs font-semibold rounded-full border border-white/20">
                  {project.eventType}
                </span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${project.status === 'COMPLETED' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                  {project.status === 'COMPLETED' ? '● Completed' : '● In Execution'}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-black line-clamp-1 group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-orange-500" /> {project.eventDate}</span>
                <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5 text-orange-500" /> {project.city}</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(project.budget)}</span>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-500 uppercase">Execution Progress</span>
                  <span className="text-orange-500">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {project.notes && (
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                  💡 {project.notes}
                </p>
              )}
            </div>
          </div>

          <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-white/5 mt-auto">
            <Link
              href={`/projects/${project.id}`}
              className="flex-1 text-center py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              Open Project Hub <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/projects/${project.id}/documents`}
              className="px-4 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors"
            >
              Vault ({project.documents?.length || 0})
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
