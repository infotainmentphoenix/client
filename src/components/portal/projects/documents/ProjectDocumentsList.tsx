import { ClientProject } from '@/features/client-projects/types';
import { FileTextIcon, DownloadIcon } from '@/components/icons/PortalIcons';

export function ProjectDocumentsList({ project }: { project: ClientProject }) {
  return (
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
  );
}
