'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

import { ProjectDetailHero } from '@/components/portal/projects/ProjectDetailHero';
import { ProjectDetailTabs } from '@/components/portal/projects/ProjectDetailTabs';
import { ProjectMilestones } from '@/components/portal/projects/ProjectMilestones';
import { ProjectDocuments } from '@/components/portal/projects/ProjectDocuments';
import { ProjectLead } from '@/components/portal/projects/ProjectLead';

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
      <ProjectDetailHero project={project} />

      <ProjectDetailTabs 
        projectId={project.id}
        milestonesCount={project.milestones?.length || 0}
        documentsCount={project.documents?.length || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProjectMilestones project={project} />
          <ProjectDocuments project={project} />
        </div>

        <div className="space-y-6">
          <ProjectLead project={project} />
        </div>
      </div>
    </div>
  );
}
