import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { AdminNavbar } from '@/components/layout/admin-navbar';
import { AdminFooter } from '@/components/layout/admin-footer';
import { AdminAuthGuard } from '@/components/layout/admin-auth-guard';

export const metadata: Metadata = {
  title: 'Dashboard | Phoenix Admin',
  description: 'Phoenix Infotainment Administration Portal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50/50 dark:bg-[#050505] overflow-hidden">
        {}
        <AdminSidebar />
        
        {}
        <div className="flex flex-col flex-1 overflow-hidden relative">
          {}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
          </div>

          {}
          <AdminNavbar />
          
          {}
          <main className="flex-1 overflow-y-auto p-6 z-10">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
          
          {}
          <div className="z-10">
            <AdminFooter />
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
