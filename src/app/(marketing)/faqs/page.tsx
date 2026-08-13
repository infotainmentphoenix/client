'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { faqApi } from '@/features/faqs/api';
import { Faq, FaqCategory } from '@/features/faqs/types';

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const HelpCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [faqData, catData] = await Promise.all([
        faqApi.getFaqs(),
        faqApi.getCategories(),
      ]);
      setFaqs(faqData.filter(f => f.isActive !== false));
      setCategories(catData.filter(c => c.isActive !== false));
      if (faqData.length > 0) {
        setOpenFaqId(faqData[0].id);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = selectedCategory === null || faq.categoryId === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-gray-50 dark:from-orange-950/20 dark:via-black dark:to-black pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-orange-500/10 to-rose-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            <HelpCircleIcon className="w-4 h-4" /> Help Center & Knowledge Base
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Got Questions? <br />
            <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              We Have Answers.
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Everything you need to know about booking artists, event logistics, custom production, and working with Phoenix Infotainment.
          </p>

          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for questions (e.g. artist booking, pricing, staging)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            All Questions ({faqs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Grid */}
      <section className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 p-8">
            <HelpCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No matching questions found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              We couldn't find any FAQs matching your query &quot;{searchQuery}&quot;. Feel free to contact our team directly!
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
              className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-sm rounded-xl hover:bg-orange-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const catName = categories.find(c => c.id === faq.categoryId)?.name || 'General';

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-white dark:bg-white/10 border-orange-500/30 shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                      : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:border-orange-500/20'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-lg shrink-0">
                        {catName}
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-500/10 text-orange-500' : 'text-gray-400'}`}>
                      <ChevronDownIcon className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed border-t border-gray-100 dark:border-white/5 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl md:text-4xl font-black mb-4">Still Have Unanswered Questions?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Our event specialists and artist curators are ready to assist you with custom quotes, date availability, and technical setup.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              Contact Support Team <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/book-consultation"
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl hover:opacity-95 transition-all"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
