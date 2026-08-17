'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inquiryApi } from '@/features/inquiries/api';
import { Inquiry, InquiryStatus } from '@/features/inquiries/types';


const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const MoreHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);

export default function CRMPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setIsLoading(true);
    const data = await inquiryApi.getInquiries();
    setInquiries(data);
    setIsLoading(false);
  };

  const newLeadsCount = inquiries.filter(i => i.status === 'NEW').length;
  const highPriorityCount = inquiries.filter(i => i.priority === 'HIGH' || i.priority === 'URGENT').length;
  const wonCount = inquiries.filter(i => i.status === 'WON').length;
  
  const recentInquiries = inquiries.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 'CONTACTED': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20';
      case 'QUALIFIED': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
      case 'PROPOSAL_SENT': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20';
      case 'WON': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 'LOST': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">CRM Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of all customer inquiries and leads.</p>
        </div>
        <Link href="/admin/crm/inquiries" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          View All Inquiries
        </Link>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-black/40 p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Leads</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">
            {isLoading ? '...' : inquiries.length}
          </p>
        </div>
        <div className="bg-white dark:bg-black/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">New Leads</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">
            {isLoading ? '...' : newLeadsCount}
          </p>
        </div>
        <div className="bg-white dark:bg-black/40 p-6 rounded-2xl border border-orange-200 dark:border-orange-500/20 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">High Priority</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">
            {isLoading ? '...' : highPriorityCount}
          </p>
        </div>
        <div className="bg-white dark:bg-black/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">Won Bookings</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">
            {isLoading ? '...' : wonCount}
          </p>
        </div>
      </div>

      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex items-center justify-between">
          <h2 className="font-bold">Recent Inquiries</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 dark:bg-white/[0.02] text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200/50 dark:border-white/5">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Event Type</th>
                <th className="px-6 py-4">Date Received</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading recent inquiries...</td>
                </tr>
              ) : recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No recent inquiries found.</td>
                </tr>
              ) : (
                recentInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.eventType?.replace('_', ' ') || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${item.priority === 'URGENT' ? 'text-red-600' : item.priority === 'HIGH' ? 'text-orange-500' : 'text-gray-500'}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/crm/inquiries/${item.id}`} className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 inline-block">
                        <MoreHorizontalIcon />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
