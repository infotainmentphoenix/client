'use client';

import { useState, useEffect, useMemo } from 'react';
import { projectApi } from '@/features/client-projects/api';
import { ClientProject } from '@/features/client-projects/types';

import { ProjectsHeader } from '@/components/portal/projects/ProjectsHeader';
import { ProjectsFilter } from '@/components/portal/projects/ProjectsFilter';
import { ProjectsList } from '@/components/portal/projects/ProjectsList';

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
      <ProjectsHeader />

      <ProjectsFilter 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        totalCount={projects.length}
      />

      <ProjectsList 
        isLoading={isLoading}
        projects={filteredProjects}
      />
    </div>
  );
}
