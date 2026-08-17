'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

export default function PortalProjectDocumentsPage() {
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
      {}
      <div>
        <Link href={`/projects/${project.id}`} className="text-xs text-orange-500 font-bold hover:underline mb-2 inline-block">&larr; Back to Project Overview</Link>
        <h1 className="text-3xl font-black">{project.title} — Document Vault</h1>
        <p className="text-gray-500 text-sm mt-1">Digital repository for contracts, technical riders, 3D CAD stage blueprints, and tax invoices.</p>
      </div>

      {}
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 pb-px">
        <Link
          href={`/projects/${project.id}`}
          className="px-5 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm"
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
          className="px-5 py-3 border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold text-sm"
        >
          Document Vault ({project.documents?.length || 0})
        </Link>
      </div>

      {}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
          <h2 className="text-xl font-bold">All Project Files ({project.documents?.length || 0})</h2>
        </div>

        <div className="space-y-4">
          {project.documents?.map((doc) => (
            <div key={doc.id} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
                  <FileTextIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{doc.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span className="px-2 py-0.5 bg-gray-200 dark:bg-white/10 rounded text-[10px] font-bold text-gray-700 dark:text-gray-300">{doc.type}</span>
                    <span>File Size: {doc.size}</span>
                    <span>Last Updated: {doc.updatedAt}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Downloading ${doc.title}`)}
                className="px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                <DownloadIcon className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
