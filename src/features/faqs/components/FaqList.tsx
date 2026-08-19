'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { faqApi } from '../api';
import { Faq } from '../types';

export function FaqList() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setIsLoading(true);
    const data = await faqApi.getFaqs(undefined, true);
    setFaqs(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      await faqApi.deleteFaq(id);
      loadFaqs();
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500">Manage FAQs for services and general inquiries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search FAQs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <Link href="/admin/content/faqs/categories" className="flex items-center gap-2 border border-border hover:bg-foreground/5 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            Manage Categories
          </Link>
          <Link href="/admin/content/faqs/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add FAQ
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background/50 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Question</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="animate-spin w-8 h-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Loading FAQs...
                  </div>
                </td>
              </tr>
            ) : filteredFaqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">No FAQs found</h3>
                  <p className="text-gray-500 text-sm">Add a new FAQ to help your clients.</p>
                </td>
              </tr>
            ) : (
              filteredFaqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-foreground/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-normal min-w-[300px]">
                    <div className="font-semibold text-foreground">{faq.question}</div>
                    <div className="text-gray-500 text-xs mt-1 line-clamp-1">{faq.answer}</div>
                  </td>
                  <td className="px-6 py-4">
                    {faq.category?.name || 'General'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      faq.isActive ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300'
                    }`}>
                      {faq.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/content/faqs/${faq.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </Link>
                      <button onClick={() => handleDelete(faq.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
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
