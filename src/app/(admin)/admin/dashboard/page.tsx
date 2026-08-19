'use client';

import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your platform today.</p>
      </div>
    </div>
  );
}
