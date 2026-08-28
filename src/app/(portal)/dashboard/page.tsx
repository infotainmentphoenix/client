'use client';

import { useState, useEffect } from 'react';
import { WelcomeBanner } from '@/components/portal/dashboard/WelcomeBanner';
import { DashboardMetrics } from '@/components/portal/dashboard/DashboardMetrics';
import { LiveEventProgress } from '@/components/portal/dashboard/LiveEventProgress';
import { UpcomingSchedule } from '@/components/portal/dashboard/UpcomingSchedule';
import { ClientResourceVault } from '@/components/portal/dashboard/ClientResourceVault';

export default function PortalDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <WelcomeBanner />
      <DashboardMetrics />
      <LiveEventProgress />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <UpcomingSchedule />
        <ClientResourceVault />
      </div>
    </div>
  );
}
