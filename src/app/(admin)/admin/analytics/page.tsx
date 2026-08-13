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
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-background border border-border hover:bg-foreground/5 rounded-lg text-sm font-medium transition-colors">
            Download PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Share Report
          </button>
        </div>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
