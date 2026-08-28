import Link from 'next/link';

type ProjectDocumentsTabsProps = {
  projectId: string | number;
  milestonesCount: number;
  documentsCount: number;
};

export function ProjectDocumentsTabs({ projectId, milestonesCount, documentsCount }: ProjectDocumentsTabsProps) {
  return (
    <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 pb-px">
      <Link
        href={`/projects/${projectId}`}
        className="px-5 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm"
      >
        Project Overview
      </Link>
      <Link
        href={`/projects/${projectId}/milestones`}
        className="px-5 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm"
      >
        Milestones Roadmap ({milestonesCount})
      </Link>
      <Link
        href={`/projects/${projectId}/documents`}
        className="px-5 py-3 border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold text-sm"
      >
        Document Vault ({documentsCount})
      </Link>
    </div>
  );
}
