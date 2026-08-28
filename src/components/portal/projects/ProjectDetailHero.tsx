import { ClientProject } from '@/features/client-projects/types';
import { CalendarIcon, MapPinIcon } from '@/components/icons/PortalIcons';

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
}

export function ProjectDetailHero({ project }: { project: ClientProject }) {
  return (
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
  );
}
