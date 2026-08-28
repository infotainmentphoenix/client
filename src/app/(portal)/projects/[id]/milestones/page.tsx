'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

import { ProjectMilestonesTabs } from '@/components/portal/projects/milestones/ProjectMilestonesTabs';
import { ProjectMilestonesList } from '@/components/portal/projects/milestones/ProjectMilestonesList';

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
      <div>
        <Link href={`/projects/${project.id}`} className="text-xs text-orange-500 font-bold hover:underline mb-2 inline-block">&larr; Back to Project Overview</Link>
        <h1 className="text-3xl font-black">{project.title} — Milestones Roadmap</h1>
        <p className="text-gray-500 text-sm mt-1">Step-by-step event execution timeline and producer delivery milestones.</p>
      </div>

      <ProjectMilestonesTabs 
        projectId={project.id}
        milestonesCount={project.milestones?.length || 0}
        documentsCount={project.documents?.length || 0}
      />

      <ProjectMilestonesList project={project} />
    </div>
  );
}
