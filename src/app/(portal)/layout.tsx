import { Metadata } from 'next';
import { PortalNav } from '@/components/layout/portal-nav';
import { PortalHeader } from '@/components/layout/portal-header';

export const metadata: Metadata = {
  title: 'Client Portal | Phoenix Infotainment',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <PortalNav />

      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader />
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
