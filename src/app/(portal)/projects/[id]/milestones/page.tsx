'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default function PortalProjectMilestonesPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<ClientProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setIsLoading(true);
      const data = await projectApi.getProjectById(id);
      setProject(data);
      setIsLoading(false);
    };
    load();
  }, [id]);

  if (isLoading || !project) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Breadcrumb Header */}
      <div>
        <Link href={`/projects/${project.id}`} className="text-xs text-orange-500 font-bold hover:underline mb-2 inline-block">&larr; Back to Project Overview</Link>
        <h1 className="text-3xl font-black">{project.title} — Milestones Roadmap</h1>
        <p className="text-gray-500 text-sm mt-1">Step-by-step event execution timeline and producer delivery milestones.</p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 pb-px">
        <Link
          href={`/projects/${project.id}`}
          className="px-5 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm"
        >
          Project Overview
        </Link>
        <Link
          href={`/projects/${project.id}/milestones`}
          className="px-5 py-3 border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold text-sm"
        >
          Milestones Roadmap ({project.milestones?.length || 0})
        </Link>
        <Link
          href={`/projects/${project.id}/documents`}
          className="px-5 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm"
        >
          Document Vault ({project.documents?.length || 0})
        </Link>
      </div>

      {/* Milestones Roadmap List */}
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
    </div>
  );
}
