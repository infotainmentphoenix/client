import { UserIcon, LockIcon, CreditCardIcon, BellIcon } from '@/components/icons/PortalIcons';

type TabType = 'PROFILE' | 'SECURITY' | 'BILLING' | 'NOTIFICATIONS';

type AccountTabsProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

export function AccountTabs({ activeTab, setActiveTab }: AccountTabsProps) {
  const tabs = [
    { id: 'PROFILE', label: 'Personal Profile', icon: UserIcon },
    { id: 'SECURITY', label: 'Security & Password', icon: LockIcon },
    { id: 'BILLING', label: 'Billing & Invoicing', icon: CreditCardIcon },
    { id: 'NOTIFICATIONS', label: 'Notification Preferences', icon: BellIcon },
  ] as const;

  return (
    <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto no-scrollbar pb-px">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold whitespace-nowrap transition-all ${
              isActive
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" /> {tab.label}
          </button>
        );
      })}
    </div>
  );
}
