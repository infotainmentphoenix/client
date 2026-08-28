import { ClientProject } from '@/features/client-projects/types';
import { PhoneIcon } from '@/components/icons/PortalIcons';

export function ProjectLead({ project }: { project: ClientProject }) {
  return (
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
  );
}
