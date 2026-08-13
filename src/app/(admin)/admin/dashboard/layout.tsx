import React from 'react';

export default function DashboardLayout({
  children,
  analytics,
  recentInquiries,
  upcomingFollowUps,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  recentInquiries: React.ReactNode;
  upcomingFollowUps: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Main Dashboard Header & Quick Actions */}
      {children}
      
      {/* Parallel Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          {analytics}
        </div>
        <div className="lg:col-span-2">
          {recentInquiries}
        </div>
        <div className="lg:col-span-1">
          {upcomingFollowUps}
        </div>
      </div>
    </div>
  );
}
