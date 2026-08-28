'use client';

import React, { useState, useEffect } from 'react';
import { inquiryApi } from '@/features/inquiries/api';
import { Inquiry } from '@/features/inquiries/types';

export default function AnalyticsSlot() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
    setIsLoading(true);
    const data = await inquiryApi.getInquiries();
    setInquiries(data);
    setIsLoading(false);
  };

  const activeLeads = inquiries.filter(i => i.status !== 'WON' && i.status !== 'LOST' && i.status !== 'ARCHIVED').length;
  const highPriority = inquiries.filter(i => i.priority === 'HIGH' || i.priority === 'URGENT').length;
  const wonDeals = inquiries.filter(i => i.status === 'WON').length;

  const stats = [
    { name: 'Total Inquiries', value: isLoading ? '...' : inquiries.length.toString(), change: 'Lifetime', isPositive: true },
    { name: 'Active Leads', value: isLoading ? '...' : activeLeads.toString(), change: 'In Pipeline', isPositive: true },
    { name: 'High Priority', value: isLoading ? '...' : highPriority.toString(), change: 'Requires Action', isPositive: false },
    { name: 'Won Deals', value: isLoading ? '...' : wonDeals.toString(), change: 'Converted', isPositive: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
            <span className={`text-xs font-semibold ${stat.isPositive ? 'text-green-500' : 'text-orange-500'}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
