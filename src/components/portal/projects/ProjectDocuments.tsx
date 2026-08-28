import Link from 'next/link';
import { ClientProject } from '@/features/client-projects/types';
import { FileTextIcon, ArrowRightIcon } from '@/components/icons/PortalIcons';

export function ProjectDocuments({ project }: { project: ClientProject }) {
  return (
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
  );
}
