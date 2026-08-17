'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { teamApi } from '@/features/team/api';
import { TeamMember } from '@/features/team/types';

const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const loadTeam = async () => {
      setIsLoading(true);
      const data = await teamApi.getMembers();
      setMembers(data);
      setIsLoading(false);
    };
    loadTeam();
  }, []);

  const filteredMembers = useMemo(() => {
    if (selectedDept === 'ALL') return members;
    return members.filter(m => m.department === selectedDept);
  }, [members, selectedDept]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-gray-50 dark:from-purple-950/20 dark:via-black dark:to-black pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-purple-500/10 to-rose-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
            <UsersIcon className="w-4 h-4" /> Leadership & Execution Experts
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Meet The Visionaries Behind <br />
            <span className="bg-gradient-to-r from-purple-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              Phoenix Infotainment
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A passionate collective of event producers, sound engineers, artist managers, and creative directors dedicated to making every event an unforgettable spectacle.
          </p>
        </div>
      </section>

      {}
      <section className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'All Departments' },
            { id: 'Leadership', label: 'Executive Leadership' },
            { id: 'Artist Curation', label: 'Artist Curation' },
            { id: 'Production & Sound', label: 'Production & Sound' },
            { id: 'Event Operations', label: 'Event Operations' },
            { id: 'PR & Marketing', label: 'PR & Communications' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedDept === tab.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-white/5 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setActiveModalMember(member)}
                className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {}
                  <div className="relative h-72 overflow-hidden bg-gray-900">
                    <img
                      src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-white text-xs font-semibold rounded-full border border-white/20">
                      {member.department}
                    </span>

                    {member.experience && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-purple-600/90 text-white text-xs font-bold rounded-full shadow">
                        {member.experience}
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-black group-hover:text-purple-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-purple-200 font-medium mt-0.5">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  {}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-white/5 mt-auto">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                    View Full Profile &rarr;
                  </span>
                  <div className="flex items-center gap-2 text-gray-400">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:text-blue-500 transition-colors"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.instagramUrl && (
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:text-pink-500 transition-colors"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setActiveModalMember(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full bg-gray-900">
                <img
                  src={activeModalMember.image}
                  alt={activeModalMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full mb-3 inline-block">
                    {activeModalMember.department}
                  </span>
                  <h3 className="text-2xl font-black mb-1">{activeModalMember.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-4">
                    {activeModalMember.designation}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {activeModalMember.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-gray-500">
                  <span>Contact: {activeModalMember.email}</span>
                  <div className="flex gap-2 text-gray-400">
                    {activeModalMember.linkedinUrl && <a href={activeModalMember.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-500"><LinkedinIcon className="w-4 h-4" /></a>}
                    {activeModalMember.instagramUrl && <a href={activeModalMember.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-pink-500"><InstagramIcon className="w-4 h-4" /></a>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <section className="bg-white dark:bg-white/5 border-y border-gray-200 dark:border-white/5 py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h2 className="text-3xl font-black mb-4">Our Core Directives & Standards</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">The principles that guide every stadium concert, wedding gala, and corporate summit we produce.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">Uncompromising Safety</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">100% structural stability, crowd safety gates, and certified electrical infrastructure for every stage.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
              <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">Direct Artist Access</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Transparent contracts directly with artist managers, eliminating unnecessary agent markups.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
              <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">Technical Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Deploying state-of-the-art Line Array acoustics, 4K LED walls, and intelligent lighting systems.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-700 via-rose-600 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Want To Join The Phoenix Team?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg mb-8">
            We are constantly seeking talented event managers, sound engineers, lighting designers, and artist managers.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-purple-700 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl"
          >
            Explore Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}
