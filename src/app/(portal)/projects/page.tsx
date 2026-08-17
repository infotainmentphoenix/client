'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

export default function PortalProjectsPage() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await projectApi.getProjects();
      setProjects(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    return projects.filter(p => p.status === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Client Event Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Track live execution progress, milestone roadmaps, contract vaults, and lead producer updates.
          </p>
        </div>
      </div>

      {}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: `All Projects (${projects.length})` },
          { id: 'IN_PROGRESS', label: 'In Progress' },
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

      {}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 p-8">
          <BriefcaseIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold">No projects found</h3>
          <p className="text-gray-500 text-xs mt-1">Select another filter tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={`${project.id}-${project.slug}-${idx}`}
              className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {}
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

                {}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-orange-500" /> {project.eventDate}</span>
                    <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5 text-orange-500" /> {project.city}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(project.budget)}</span>
                  </div>

                  {}
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

              {}
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
      )}
    </div>
  );
}
