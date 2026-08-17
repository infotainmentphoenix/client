'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inquiryApi } from '@/features/inquiries/api';
import { Inquiry } from '@/features/inquiries/types';

export default function UpcomingFollowUpsSlot() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setIsLoading(true);
    const data = await inquiryApi.getInquiries();
    
    
    
    const followUps = data.filter(inq => 
      (inq.priority === 'HIGH' || inq.priority === 'URGENT') && 
      inq.status !== 'WON' && 
      inq.status !== 'LOST' && 
      inq.status !== 'ARCHIVED'
    ).slice(0, 5); 
    
    setInquiries(followUps);
    setIsLoading(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400">Action Required</h3>
      </div>
      <div className="p-5 flex-1 space-y-4">
        {isLoading ? (
           <div className="text-center text-gray-500 py-8">
             <p className="text-sm">Loading...</p>
           </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">No urgent follow-ups needed today.</p>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="flex gap-4 items-start p-3 rounded-lg border border-border hover:border-orange-500/50 transition-colors">
              <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 ${inq.priority === 'URGENT' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20'}`}>
                <span className="text-lg leading-none">⚠️</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{inq.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${inq.priority === 'URGENT' ? 'text-red-600' : 'text-orange-500'}`}>
                    {inq.priority}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{inq.status.replace('_', ' ')}</span>
                </div>
              </div>
              <Link href={`/admin/crm/inquiries/${inq.id}`} className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
                View
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
