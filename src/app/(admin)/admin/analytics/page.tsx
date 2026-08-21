import React from 'react';
import { AnalyticsDashboard } from '@/features/analytics/components/AnalyticsDashboard';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Analytics & Insights</h1>
          <p className="text-gray-500">Track your platform's performance, lead conversions, and bookings.</p>
        </div>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
