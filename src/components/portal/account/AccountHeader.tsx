import { CheckCircleIcon } from '@/components/icons/PortalIcons';

export function AccountHeader({ saveStatus }: { saveStatus: string | null }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Account & Profile Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Manage your personal profile, authentication, billing address, and event notification channels.
        </p>
      </div>
      {saveStatus && (
        <div className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircleIcon className="w-4 h-4" /> {saveStatus}
        </div>
      )}
    </div>
  );
}
