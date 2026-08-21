'use client';
import React, { useState, useEffect } from 'react';
import { inquiryApi } from '../../inquiries/api';
import { eventApi } from '../../events/api';
import { Inquiry } from '../../inquiries/types';
import { Event } from '../../events/types';

export function AnalyticsDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [inqs, evts] = await Promise.all([
          inquiryApi.getInquiries(),
          eventApi.getEvents()
        ]);
        setInquiries(inqs);
        setEvents(evts);
      } catch (error) {
        console.error("Failed to load analytics data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  
  const totalInquiries = inquiries.length; 
  const closedWon = inquiries.filter(i => i.status === 'CLOSED_WON' || i.status === 'WON').length;
  const conversionRate = totalInquiries > 0 ? Math.round((closedWon / totalInquiries) * 100) : 0;
  
  const upcomingEvents = events.filter(e => e.eventDate && new Date(e.eventDate) > new Date()).length;
  const pastEvents = events.filter(e => e.eventDate && new Date(e.eventDate) <= new Date()).length;

  // Group real inquiries by month for the last 7 months
  const last7Months = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (6 - i));
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      monthNum: d.getMonth(),
      year: d.getFullYear()
    };
  });

  const monthlyData = last7Months.map(m => {
    const count = inquiries.filter(inq => {
      const date = new Date(inq.createdAt);
      return date.getMonth() === m.monthNum && date.getFullYear() === m.year;
    }).length;
    return { month: m.month, value: count };
  });

  const maxMonthlyValue = Math.max(...monthlyData.map(d => d.value), 1);

  const inquiryTypes = [
    { name: 'General', count: inquiries.filter(i => i.inquiryType === 'GENERAL').length, color: 'bg-blue-500' },
    { name: 'Artist Booking', count: inquiries.filter(i => i.inquiryType === 'ARTIST_BOOKING').length, color: 'bg-purple-500' },
    { name: 'Event Mgmt', count: inquiries.filter(i => i.inquiryType === 'EVENT_MANAGEMENT').length, color: 'bg-emerald-500' },
    { name: 'Services', count: inquiries.filter(i => i.inquiryType === 'SERVICE_INQUIRY').length, color: 'bg-orange-500' },
  ];
  const totalTypedInquiries = inquiryTypes.reduce((acc, curr) => acc + curr.count, 0);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const inquiriesLast30 = inquiries.filter(i => new Date(i.createdAt) >= thirtyDaysAgo);
  const inquiriesPrev30 = inquiries.filter(i => new Date(i.createdAt) >= sixtyDaysAgo && new Date(i.createdAt) < thirtyDaysAgo);

  const calcTrend = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100% from last month' : 'No change';
    const percent = Math.round(((current - previous) / previous) * 100);
    return percent >= 0 ? `+${percent}% from last month` : `${percent}% from last month`;
  };

  const leadVolumeTrend = calcTrend(inquiriesLast30.length, inquiriesPrev30.length);
  
  const closedLast30 = inquiriesLast30.filter(i => i.status === 'CLOSED_WON' || i.status === 'WON').length;
  const closedPrev30 = inquiriesPrev30.filter(i => i.status === 'CLOSED_WON' || i.status === 'WON').length;
  const convRateLast30 = inquiriesLast30.length > 0 ? (closedLast30 / inquiriesLast30.length) * 100 : 0;
  const convRatePrev30 = inquiriesPrev30.length > 0 ? (closedPrev30 / inquiriesPrev30.length) * 100 : 0;
  
  const convRateDiff = Math.round(convRateLast30 - convRatePrev30);
  const convRateTrend = convRatePrev30 === 0 && convRateLast30 > 0 ? '+100% from last month' : convRatePrev30 === 0 && convRateLast30 === 0 ? 'No change' : `${convRateDiff >= 0 ? '+' : ''}${convRateDiff}% from last month`;

  const bestCategory = inquiryTypes.reduce((prev, curr) => (prev.count > curr.count) ? prev : curr, inquiryTypes[0]);
  const aiInsightText = bestCategory && bestCategory.count > 0 
    ? `Your top inquiry category is "${bestCategory.name}" with ${bestCategory.count} leads. Consider tailoring your marketing to capitalize on this interest.`
    : `You haven't received enough categorized inquiries to generate insights yet. Keep engaging with your leads to gather more data.`;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <svg className="animate-spin w-8 h-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        Loading Analytics Engine...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Lead Volume', value: totalInquiries.toString(), trend: leadVolumeTrend, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, trend: convRateTrend, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Upcoming Events', value: upcomingEvents.toString(), trend: 'Next 30 days', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Total Successful Events', value: pastEvents.toString(), trend: 'All time', icon: 'M5 3v4M19 3v4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM15 11h2v2h-2v-2zM11 11h2v2h-2v-2zM7 11h2v2H7v-2z', color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-gray-500">
              <span className="text-emerald-500 mr-1 flex items-center">
                {stat.trend.startsWith('+') && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
              </span>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Inquiry Volume Growth</h3>
              <p className="text-sm text-gray-500">Monthly breakdown of incoming leads.</p>
            </div>
            <select className="bg-background border border-border text-sm rounded-lg px-3 py-1.5 outline-none text-foreground">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end gap-2 sm:gap-6 pt-4">
            {monthlyData.map((data, i) => {
              const heightPercent = (data.value / maxMonthlyValue) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full relative flex justify-center h-full items-end">
                    {}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs py-1 px-2 rounded font-medium transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {data.value} leads
                    </div>
                    {}
                    <div 
                      className="w-full max-w-[3rem] bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-500 dark:group-hover:bg-blue-500 rounded-t-md transition-all duration-500 ease-out"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="w-full bg-blue-500 dark:bg-blue-400 rounded-t-md transition-all" style={{ height: '4px' }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-1">Inquiry Distribution</h3>
          <p className="text-sm text-gray-500 mb-8">Breakdown by inquiry type.</p>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {inquiryTypes.map((type, i) => {
              const percentage = totalTypedInquiries > 0 ? Math.round((type.count / totalTypedInquiries) * 100) : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">{type.name}</span>
                    <span className="text-gray-500 font-medium">{percentage}% ({type.count})</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${type.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Performance Insight</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              {aiInsightText}
            </p>
          </div>
          {}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold mb-4">Recent Conversion Wins</h3>
          <div className="space-y-4">
            {(() => {
              const conversionWins = inquiries
                .filter(i => i.status === 'WON' || i.status === 'CLOSED_WON')
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 3)
                .map(win => {
                  let amountStr = 'N/A';
                  if (win.budgetMax) {
                    amountStr = `${win.currency || '₹'}${win.budgetMax >= 100000 ? `${(win.budgetMax / 100000).toFixed(1)}L` : win.budgetMax >= 1000 ? `${(win.budgetMax / 1000).toFixed(0)}K` : win.budgetMax}`;
                  } else if (win.budgetMin) {
                    amountStr = `${win.currency || '₹'}${win.budgetMin >= 100000 ? `${(win.budgetMin / 100000).toFixed(1)}L` : win.budgetMin >= 1000 ? `${(win.budgetMin / 1000).toFixed(0)}K` : win.budgetMin}`;
                  }
                  
                  const date = new Date(win.updatedAt);
                  const diffMs = new Date().getTime() - date.getTime();
                  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffDays = Math.floor(diffHrs / 24);
                  
                  let timeStr = '';
                  if (diffHrs < 1) {
                    timeStr = 'Just now';
                  } else if (diffHrs < 24) {
                    timeStr = `${diffHrs} ${diffHrs === 1 ? 'hour' : 'hours'} ago`;
                  } else if (diffDays === 1) {
                    timeStr = 'Yesterday';
                  } else {
                    timeStr = `${diffDays} days ago`;
                  }

                  return {
                    client: win.name,
                    amount: amountStr,
                    time: timeStr,
                    service: win.eventType?.replace('_', ' ') || 'Event Services'
                  };
                });

              if (conversionWins.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No conversion wins recorded yet.
                  </div>
                );
              }

              return conversionWins.map((win, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-foreground/[0.02] rounded-lg transition-colors border border-transparent hover:border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 flex items-center justify-center font-bold text-sm">
                      {win.client.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{win.client}</p>
                      <p className="text-xs text-gray-500">{win.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{win.amount}</p>
                    <p className="text-xs text-gray-500">{win.time}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
