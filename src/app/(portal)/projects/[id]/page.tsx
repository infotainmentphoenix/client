'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

export default function PortalProjectDetailPage() {
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

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Link href="/projects" className="text-orange-500 hover:underline mt-4 inline-block">&larr; Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
        <img
          src={project.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'}
          alt={project.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                {project.eventType}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full">
                {project.progress}% Execution Progress
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mt-2">
              <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-orange-400" /> {project.eventDate}</span>
              <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5 text-orange-400" /> {project.venue}, {project.city}</span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-gray-300">Contract Budget</span>
            <p className="text-2xl font-black text-orange-400">{formatCurrency(project.budget)}</p>
          </div>
        </div>
      </div>

      {}
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 pb-px">
        <Link
          href={`/projects/${project.id}`}
          className="px-5 py-3 border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold text-sm"
        >
          Project Overview
        </Link>
        <Link
          href={`/projects/${project.id}/milestones`}
          className="px-5 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm"
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

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 space-y-8">
          {}
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

          {}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold">Project Documents & Riders</h2>
            <div className="space-y-3">
              {project.documents?.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 text-xs">
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="w-5 h-5 text-orange-500" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{doc.title}</h3>
                      <p className="text-[10px] text-gray-400">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${doc.title}`)}
                    className="px-3.5 py-1.5 bg-orange-600 text-white font-bold rounded-lg text-[11px]"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>

            <Link
              href={`/projects/${project.id}/documents`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:underline pt-2"
            >
              Open Full Vault <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {}
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Assigned Lead Producer</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-rose-600 text-white font-bold flex items-center justify-center text-base shadow">
                {project.leadProducer.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-base">{project.leadProducer}</h4>
                <p className="text-xs text-orange-500 font-semibold">Lead Event Director</p>
              </div>
            </div>

            <a
              href={`tel:${project.leadProducerPhone}`}
              className="w-full py-3 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-xs rounded-xl hover:bg-orange-200 transition-colors flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-4 h-4" /> Call Lead Producer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
