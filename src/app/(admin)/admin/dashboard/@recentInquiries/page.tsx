'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inquiryApi } from '@/features/inquiries/api';
import { Inquiry } from '@/features/inquiries/types';

export default function RecentInquiriesSlot() {
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

  const recent = inquiries.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'QUALIFIED': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'PROPOSAL_SENT': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'NEGOTIATION': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      case 'WON': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'LOST': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold text-lg">Recent Inquiries</h3>
        <Link href="/admin/crm/inquiries" className="text-sm text-blue-500 hover:underline">View All</Link>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-background/50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Event Type</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : recent.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-500">No inquiries found.</td>
              </tr>
            ) : (
              recent.map((inq) => (
                <tr key={inq.id} className="hover:bg-foreground/[0.02]">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/crm/inquiries/${inq.id}`} className="hover:text-blue-500 transition-colors">
                      {inq.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{inq.eventType?.replace('_', ' ') || 'N/A'}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${getStatusColor(inq.status)}`}>
                      {inq.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
