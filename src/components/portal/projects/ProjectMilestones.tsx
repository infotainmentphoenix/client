import Link from 'next/link';
import { ClientProject } from '@/features/client-projects/types';
import { CheckCircleIcon, ArrowRightIcon } from '@/components/icons/PortalIcons';

export function ProjectMilestones({ project }: { project: ClientProject }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
      <h2 className="text-xl font-bold">Execution Milestone Progress</h2>
      
      <div className="w-full bg-gray-200 dark:bg-white/10 h-3 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" style={{ width: `${project.progress}%` }} />
      </div>

      <div className="space-y-3 pt-4">
        {project.milestones?.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className={`w-4 h-4 ${m.status === 'COMPLETED' ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="font-semibold text-gray-900 dark:text-white">{m.title}</span>
            </div>
            <span className="text-gray-400">{m.dueDate}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/projects/${project.id}/milestones`}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:underline pt-2"
      >
        View Detailed Execution Roadmap <ArrowRightIcon className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
