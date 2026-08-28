import { ClientProject } from '@/features/client-projects/types';

export function ProjectMilestonesList({ project }: { project: ClientProject }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
        <h2 className="text-xl font-bold">Execution Steps ({project.milestones?.length || 0})</h2>
        <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-500/10 px-3 py-1 rounded-full">
          Overall Progress: {project.progress}%
        </span>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-gray-200 dark:before:bg-white/10">
        {project.milestones?.map((m, idx) => {
          const isDone = m.status === 'COMPLETED';
          const isInProgress = m.status === 'IN_PROGRESS';

          return (
            <div key={m.id} className="relative flex items-start gap-6 pl-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                isDone
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : isInProgress
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/20 animate-pulse'
                  : 'bg-gray-200 dark:bg-white/10 text-gray-500'
              }`}>
                {isDone ? '✓' : idx + 1}
              </div>

              <div className="flex-1 p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{m.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                    isDone ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : isInProgress ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-400'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500">Target Date: {m.dueDate}</p>

                {m.notes && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                    💡 {m.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
