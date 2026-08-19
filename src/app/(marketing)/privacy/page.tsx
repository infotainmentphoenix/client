'use client';

import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-collected', title: '2. Information We Collect' },
  { id: 'use-information', title: '3. How We Use Your Information' },
  { id: 'sharing-disclosure', title: '4. Data Sharing & Third Parties' },
  { id: 'data-security', title: '5. Data Security Measures' },
  { id: 'data-retention', title: '6. Data Retention Policies' },
  { id: 'user-rights', title: '7. Your Rights (DPDP Act 2023)' },
  { id: 'cookies-tracking', title: '8. Cookies & Tracking' },
  { id: 'children-privacy', title: '9. Children\'s Privacy' },
  { id: 'policy-updates', title: '10. Changes to This Policy' },
  { id: 'grievance-contact', title: '11. Grievance Redressal & Contact' },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120; // offset for headers
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#080808] text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      
      {/* Sleek Minimalist Header */}
      <header className="pt-36 pb-12 border-b border-zinc-150 dark:border-zinc-900 bg-[#fefefe]/40 dark:bg-[#090909]/40 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-400 dark:text-zinc-500 uppercase block mb-3">
            Company Policies (Summary Format)
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            <span>Phoenix Infotainment</span>
            <span>•</span>
            <span>Last Updated: August 19, 2026</span>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Table of Contents */}
          <nav className="hidden lg:block lg:col-span-1 sticky top-28 max-h-[75vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
            <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mb-6 pl-2">
              On this page
            </h3>
            <ul className="space-y-1 text-xs">
              {SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-all font-medium truncate ${
                      activeSection === sec.id
                        ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-950'
                    }`}
                  >
                    {sec.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Privacy Policy Text */}
          <main className="lg:col-span-3 space-y-16 text-sm md:text-base leading-relaxed font-light text-zinc-600 dark:text-zinc-300 max-w-3xl">
            
            {/* 1. Introduction */}
            <article id="introduction" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                1. Introduction
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>We are committed to securing your private information when you use our website <span className="font-semibold text-zinc-900 dark:text-white">www.phoenixinfotainment.com</span> or contract our services.</li>
                <li>Data processing practices strictly align with statutory Indian compliance guidelines, including the DPDP Act 2023.</li>
              </ul>
            </article>

            {/* 2. Information We Collect */}
            <article id="information-collected" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                2. Information We Collect
              </h2>
              <p>We gather data directly or automatically through specific categories:</p>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li><span className="font-semibold text-zinc-900 dark:text-white">Profile Data:</span> Names, emails, company details, titles, and telephone numbers.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Event Specifics:</span> Target dates, budgets, venue parameters, guest counts, and coordination notes.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Financial Logs:</span> Bank accounts, receipts, tax logs (GST/PAN), and billing coordinates.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Web Activity:</span> IP logs, configurations, tracking cookies, and usage session data.</li>
              </ul>
            </article>

            {/* 3. How We Use Your Information */}
            <article id="use-information" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                3. How We Use Your Information
              </h2>
              <p>We utilize information for target operations, outlined below:</p>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>To execute event operations, talent coordination, and technical setups.</li>
                <li>To handle invoicing, process billing logs, and compile taxation reports.</li>
                <li>To send proposals, quotations, updates, and handle helpdesk support.</li>
                <li>To highlight event portfolios (photos/videos) on our media feeds (unless requested otherwise).</li>
                <li>To debug site performance and protect servers from security threats.</li>
              </ul>
            </article>

            {/* 4. Data Sharing & Third Parties */}
            <article id="sharing-disclosure" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                4. Data Sharing & Third Parties
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>We do not sell, rent, or trade your personal information.</li>
                <li>Necessary event information is shared with booked artists, caterers, and production crews on a need-to-know basis.</li>
                <li>Details will be disclosed if legally mandated by government investigations or judicial subpoenas.</li>
              </ul>
            </article>

            {/* 5. Data Security Measures */}
            <article id="data-security" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                5. Data Security Measures
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>We host data on secure database environments with restricted access.</li>
                <li>Encrypted channel protocols are used for handling transaction logs.</li>
                <li>Please note that internet transmissions are not entirely risk-free.</li>
              </ul>
            </article>

            {/* 6. Data Retention Policies */}
            <article id="data-retention" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                6. Data Retention Policies
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Records are retained only for the duration required to deliver services and satisfy statutory Indian tax requirements.</li>
                <li>Inquiry records that do not proceed to contracting status are cleared from databases periodically.</li>
              </ul>
            </article>

            {/* 7. Your Rights (DPDP Act 2023) */}
            <article id="user-rights" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                7. Your Rights (DPDP Act 2023)
              </h2>
              <p>Under statutory DPDP provisions, you retain full rights to:</p>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Request access to lists of personal details currently hosted in our databases.</li>
                <li>Request updates to inaccurate records, or demand the absolute erasure of your personal data.</li>
                <li>Withdraw consent for data processing at any point.</li>
                <li>Submit grievances directly to our compliance officer or file issues with the Data Protection Board of India.</li>
              </ul>
            </article>

            {/* 8. Cookies & Tracking */}
            <article id="cookies-tracking" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                8. Cookies & Tracking
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Cookies and site beacons are used to analyze web traffic, track page hits, and save interface configurations.</li>
                <li>Cookies can be disabled through browser settings without blocking core site navigation.</li>
              </ul>
            </article>

            {/* 9. Children's Privacy */}
            <article id="children-privacy" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                9. Children&apos;s Privacy
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>We do not target services towards individuals under 18.</li>
                <li>Accidental collection of minor data will be purged immediately from active databases upon detection.</li>
              </ul>
            </article>

            {/* 10. Changes to This Policy */}
            <article id="policy-updates" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                10. Changes to This Policy
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>This policy will be modified to maintain alignment with legal updates. Changes apply immediately upon upload.</li>
              </ul>
            </article>

            {/* 11. Grievance Redressal & Contact */}
            <article id="grievance-contact" className="space-y-6 scroll-mt-28 border-t border-zinc-150 dark:border-zinc-900 pt-12">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                11. Grievance Redressal & Contact
              </h2>
              <p>For inquiries, updates, or to exercise data rights:</p>

              <div className="space-y-2 mt-4 text-xs md:text-sm font-semibold text-zinc-900 dark:text-white">
                <p className="font-extrabold text-sm md:text-base">Phoenix Infotainment</p>
                <p className="text-zinc-400 font-medium text-[11px] mb-2 uppercase font-mono">Grievance Officer: Ms. Preeti Talreja (Diya Makhija)</p>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 font-light">
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Address:</span> A R Avenue, Opposite Country Club, Veera Desai Road, Andheri West, Mumbai – 400053, Maharashtra, India</p>
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Phone:</span> <a href="tel:+919822775922" className="hover:underline text-zinc-900 dark:text-white font-medium">+91 98227 75922</a></p>
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Email:</span> <a href="mailto:events@phoenixinfotainment.com" className="hover:underline text-zinc-900 dark:text-white font-medium">events@phoenixinfotainment.com</a></p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wide mt-10 pt-4 border-t border-dashed border-zinc-150 dark:border-zinc-900">
                &copy; 2025–2026 Phoenix Infotainment. All Rights Reserved.
              </p>
            </article>

          </main>

        </div>
      </section>
    </div>
  );
}
