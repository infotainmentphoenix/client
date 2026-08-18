'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);

const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h6"/><path d="M3 18h6"/></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const CrmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: DashboardIcon },
  { name: 'CRM & Inquiries', href: '/admin/crm', icon: CrmIcon },
  { name: 'Events & Content', href: '/admin/content', icon: ContentIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: AnalyticsIcon },
  { name: 'Users & Roles', href: '/admin/users', icon: UsersIcon },
  { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} flex-shrink-0 h-screen sticky top-0 bg-white dark:bg-[#0a0a0a] border-r border-gray-100 dark:border-white/5 shadow-[4px_0_24px_rgb(0,0,0,0.02)] z-50 flex flex-col transition-all duration-300 relative`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-6 w-8 h-8 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all hover:scale-105 z-50 shadow-md flex items-center justify-center text-gray-500 dark:text-gray-400 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      {/* Header / Logo */}
      <div className="h-20 flex items-center justify-center px-4 border-b border-gray-100 dark:border-white/5 overflow-hidden shrink-0">
        {isCollapsed ? (
          <Link href="/admin/dashboard" className="flex items-center justify-center w-full transition-transform hover:scale-105">
            <img 
              src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png" 
              alt="Phoenix Infotainment Logo" 
              className="hidden dark:block h-10 w-auto object-contain shrink-0" 
            />
            <img 
              src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20Black.png" 
              alt="Phoenix Infotainment Logo" 
              className="block dark:hidden h-10 w-auto object-contain shrink-0" 
            />
          </Link>
        ) : (
          <Link href="/admin/dashboard" className="flex items-center justify-center w-full group transition-transform hover:scale-[1.02]">
            <img 
              src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png" 
              alt="Phoenix Infotainment Logo (Dark Mode)" 
              className="hidden dark:block h-[50px] sm:h-[60px] w-auto object-contain shrink-0" 
            />
            <img 
              src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20Black.png" 
              alt="Phoenix Infotainment Logo (Light Mode)" 
              className="block dark:hidden h-[50px] sm:h-[60px] w-auto object-contain shrink-0" 
            />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2 scrollbar-hide">
        {!isCollapsed && (
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </div>
        )}
        
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive 
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              {isActive && !isCollapsed && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-r-full" />
              )}
              <div className="shrink-0 flex items-center justify-center">
                <Icon />
              </div>
              {!isCollapsed && <span className="text-sm truncate">{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer / Return Link */}
      <div className="p-4 border-t border-gray-100 dark:border-white/5">
        <Link 
          href="/" 
          title={isCollapsed ? "Return to Site" : undefined}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${!isCollapsed ? 'px-4' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          {!isCollapsed && <span className="truncate">Return to Site</span>}
        </Link>
      </div>
    </aside>
  );
}
