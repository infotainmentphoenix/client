'use client';

import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your platform today.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
          Export Data
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          Generate Report
        </button>
      </div>
    </div>
  );
}
