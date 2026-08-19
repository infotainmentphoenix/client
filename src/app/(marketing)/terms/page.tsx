'use client';

import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'about-company', title: '2. About the Company' },
  { id: 'services-offered', title: '3. Services Offered' },
  { id: 'eligibility', title: '4. Eligibility' },
  { id: 'booking-engagement', title: '5. Booking & Engagement' },
  { id: 'payment-terms', title: '6. Payment Terms' },
  { id: 'cancellation-refund', title: '7. Cancellation & Refunds' },
  { id: 'artist-booking', title: '8. Artist Booking Rules' },
  { id: 'intellectual-property', title: '9. Intellectual Property' },
  { id: 'website-use', title: '10. Website Usage Rules' },
  { id: 'privacy-protection', title: '11. Privacy & Consent' },
  { id: 'limitation-liability', title: '12. Liability Limits' },
  { id: 'force-majeure', title: '13. Force Majeure' },
  { id: 'indemnification', title: '14. Indemnification' },
  { id: 'third-party-links', title: '15. Third-Party Links' },
  { id: 'media-rights', title: '16. Media & Photos Rights' },
  { id: 'confidentiality', title: '17. Confidentiality' },
  { id: 'governing-law', title: '18. Governing Law & Arbitration' },
  { id: 'amendments', title: '19. Policy Changes' },
  { id: 'severability', title: '20. Severability' },
  { id: 'waiver', title: '21. Waiver' },
  { id: 'entire-agreement', title: '22. Entire Agreement' },
  { id: 'contact-info', title: '23. Contact Details' },
];

export default function TermsAndConditionsPage() {
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
      
      {/* Header Banner */}
      <header className="pt-36 pb-12 border-b border-zinc-150 dark:border-zinc-900 bg-[#fefefe]/40 dark:bg-[#090909]/40 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-400 dark:text-zinc-500 uppercase block mb-3">
            Company Policies (Summary Format)
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
            Terms & Conditions
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

          {/* Content Pane */}
          <main className="lg:col-span-3 space-y-16 text-sm md:text-base leading-relaxed font-light text-zinc-600 dark:text-zinc-300 max-w-3xl">
            
            {/* 1. Introduction */}
            <article id="introduction" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                1. Introduction
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>These terms govern your access and use of the website <span className="font-semibold text-zinc-900 dark:text-white">www.phoenixinfotainment.com</span> and all related services.</li>
                <li>By accessing this website or engaging our services, you agree to be bound by these terms in full.</li>
              </ul>
            </article>

            {/* 2. About the Company */}
            <article id="about-company" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                2. About the Company
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Phoenix Infotainment is an event management powerhouse based in Mumbai, Maharashtra, India.</li>
                <li>Founded by <span className="font-semibold text-zinc-900 dark:text-white">Ms. Preeti Talreja</span> (Diya Makhija), operating across Mumbai, Pune, and international destinations.</li>
              </ul>
              <div className="mt-6 border border-zinc-150 dark:border-zinc-900 rounded-2xl p-6 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 uppercase font-mono text-[10px] block mb-1">Registered Address</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    A R Avenue, Opposite Country Club, Veera Desai Road, Andheri West, Mumbai – 400053, Maharashtra, India
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-zinc-400 uppercase font-mono text-[10px] block mb-1">Contact Number</span>
                    <a href="tel:+919822775922" className="font-bold text-zinc-900 dark:text-white hover:underline">+91 98227 75922</a>
                  </div>
                  <div>
                    <span className="text-zinc-400 uppercase font-mono text-[10px] block mb-1">Email Support</span>
                    <a href="mailto:events@phoenixinfotainment.com" className="font-bold text-zinc-900 dark:text-white hover:underline">events@phoenixinfotainment.com</a>
                  </div>
                </div>
              </div>
            </article>

            {/* 3. Services Offered */}
            <article id="services-offered" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                3. Services Offered
              </h2>
              <p>We provide end-to-end event and booking solutions, summarized as follows:</p>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li><span className="font-semibold text-zinc-900 dark:text-white">Corporate Events:</span> AGM meetings, launches, conferences, seminars, and corporate team building.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Social Celebrations:</span> Custom destination weddings, anniversaries, and personal gatherings.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Entertainment Nights:</span> Live music shows, comedians, poets, ghazals, and DJ lineups.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Talent Management:</span> Direct coordination and management of artists, performers, and creators.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">360° Production:</span> Rigging, audio, lights, event layouts, decorations, and logistics.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">Media Collaborations:</span> Influencer photography shoots, brand promotions, and advertising events.</li>
              </ul>
            </article>

            {/* 4. Eligibility */}
            <article id="eligibility" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                4. Eligibility
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>You must be at least 18 years of age or possess legal capacity to enter into agreements to book services.</li>
                <li>Entities booking services represent they have legal authority to bind their respective organizations.</li>
              </ul>
            </article>

            {/* 5. Booking and Service Engagement */}
            <article id="booking-engagement" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                5. Booking & Engagement
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>All bookings require a formalized written Service Agreement detailing the scope of work and payments.</li>
                <li>A booking is officially confirmed only after a signed agreement and booking deposit are received.</li>
                <li>Alterations or scope changes require mutual written consent and may accrue extra fees.</li>
              </ul>
            </article>

            {/* 6. Payment Terms */}
            <article id="payment-terms" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                6. Payment Terms
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>A non-refundable advance payment (40%–50% of quotation) is required to secure any booking.</li>
                <li>Balance payments must follow the schedule outlined inside the executed Service Agreement.</li>
                <li>Payments are processed in INR via bank transfer (NEFT/RTGS), UPI, or cheque. Taxes (GST) apply.</li>
                <li>Late balances carry a 2% monthly interest charge, and we reserve rights to pause services for delays.</li>
              </ul>
            </article>

            {/* 7. Cancellation and Refund Policy */}
            <article id="cancellation-refund" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                7. Cancellation & Refunds
              </h2>
              <div className="space-y-2">
                <p className="font-semibold text-zinc-900 dark:text-white">7.1 Cancellation by Client:</p>
                <ul className="list-disc list-outside pl-5 space-y-2">
                  <li><span className="font-semibold text-zinc-900 dark:text-white">&gt; 30 Days before event:</span> Deposit forfeited plus costs incurred by the Company.</li>
                  <li><span className="font-semibold text-zinc-900 dark:text-white">15 to 29 Days before event:</span> 50% of the contracted amount is payable.</li>
                  <li><span className="font-semibold text-zinc-900 dark:text-white">&lt; 15 Days before event:</span> 100% of the contracted amount is payable.</li>
                </ul>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li><span className="font-semibold text-zinc-900 dark:text-white">7.2 Cancellation by Company:</span> A full refund or alternative artist/setup options will be provided in writing.</li>
                <li><span className="font-semibold text-zinc-900 dark:text-white">7.3 Day-of Changes:</span> Day-of event cancelations or client no-shows do not entitle the client to refunds.</li>
              </ul>
            </article>

            {/* 8. Artist and Talent Booking Terms */}
            <article id="artist-booking" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                8. Artist Booking Rules
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Confirmed artist booking deposits are non-refundable. Re-scheduling is subject to artist availability.</li>
                <li>Clients must comply with technical riders (green rooms, AV requirements, hospitality) provided.</li>
                <li>Clients are prohibited from bypassing the Company to negotiate or book introduced artists directly.</li>
              </ul>
            </article>

            {/* 9. Intellectual Property Rights */}
            <article id="intellectual-property" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                9. Intellectual Property
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>All website design, branding, and event material content are our exclusive properties.</li>
                <li>Event photos/videos taken by us during services are reserved for portfolio and promotional usage.</li>
              </ul>
            </article>

            {/* 10. Use of the Website */}
            <article id="website-use" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                10. Website Usage Rules
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>The website must not be used for fraudulent activities, data crawling, or distributing malware.</li>
                <li>Interfering with website performance or attempts at unauthorized server access is illegal.</li>
              </ul>
            </article>

            {/* 11. Privacy and Data Protection */}
            <article id="privacy-protection" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                11. Privacy & Consent
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Personal data is processed in compliance with the DPDP Act 2023 of India.</li>
                <li>We share details with execution vendors only on a need-to-know basis. No third-party data sale.</li>
              </ul>
            </article>

            {/* 12. Limitation of Liability */}
            <article id="limitation-liability" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                12. Liability Limits
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>The Company is not liable for indirect or consequential losses.</li>
                <li>Total legal liability in any event is strictly capped at the fees paid for that specific service.</li>
              </ul>
            </article>

            {/* 13. Force Majeure */}
            <article id="force-majeure" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                13. Force Majeure
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Performance delays caused by natural disasters, strikes, war, or epidemics are legally excused.</li>
                <li>Parties will cooperate in good faith to coordinate event rescheduling or proportional refunds.</li>
              </ul>
            </article>

            {/* 14. Indemnification */}
            <article id="indemnification" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                14. Indemnification
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Clients agree to protect the Company against liabilities resulting from client breach, negligence, or unlawful acts.</li>
              </ul>
            </article>

            {/* 15. Third-Party Links and Services */}
            <article id="third-party-links" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                15. Third-Party Links
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Links to external platforms are accessed at your own discretion; we assume no control over their policies.</li>
              </ul>
            </article>

            {/* 16. Event Photography, Videography, and Media Rights */}
            <article id="media-rights" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                16. Media & Photos Rights
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>We document and shoot event footage for promotional distributions.</li>
                <li>Requests to restrict specific media rights must be submitted in writing at least 7 days before events.</li>
              </ul>
            </article>

            {/* 17. Confidentiality */}
            <article id="confidentiality" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                17. Confidentiality
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Both parties must protect event pricing, creative layouts, and proprietary data exchanged.</li>
              </ul>
            </article>

            {/* 18. Dispute Resolution and Governing Law */}
            <article id="governing-law" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                18. Governing Law & Arbitration
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Terms are governed by Indian law. Disputes will be negotiated for 30 days.</li>
                <li>Unresolved disputes go to arbitration in Mumbai under the Arbitration Act 1996.</li>
                <li>Exclusive territorial jurisdiction rests in the courts of Mumbai.</li>
              </ul>
            </article>

            {/* 19. Amendments and Modifications */}
            <article id="amendments" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                19. Policy Changes
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>We reserve the right to revise policies. Revisions are effective immediately upon web upload.</li>
              </ul>
            </article>

            {/* 20. Severability */}
            <article id="severability" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                20. Severability
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>If any term is found invalid or unenforceable, the rest of the terms remain fully operational.</li>
              </ul>
            </article>

            {/* 21. Waiver */}
            <article id="waiver" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                21. Waiver
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>Failure to immediately enforce a right does not constitute a waiver of future enforcement.</li>
              </ul>
            </article>

            {/* 22. Entire Agreement */}
            <article id="entire-agreement" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                22. Entire Agreement
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2">
                <li>These terms, along with the signed booking agreement, constitute the full contract between the parties.</li>
              </ul>
            </article>

            {/* 23. Contact Information */}
            <article id="contact-info" className="space-y-6 scroll-mt-28 border-t border-zinc-150 dark:border-zinc-900 pt-12">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                23. Contact Details
              </h2>
              <p>For legal, policy, or service inquiries:</p>
              <div className="space-y-2 mt-4 text-xs md:text-sm font-semibold text-zinc-900 dark:text-white">
                <p className="font-extrabold text-sm md:text-base">Phoenix Infotainment</p>
                <p className="text-zinc-400 font-medium text-[11px] mb-2 uppercase font-mono">Founder: Ms. Preeti Talreja (Diya Makhija)</p>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400 font-light">
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Address:</span> A R Avenue, Opposite Country Club, Veera Desai Road, Andheri West, Mumbai – 400053, Maharashtra, India</p>
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Phone:</span> <a href="tel:+919822775922" className="hover:underline text-zinc-900 dark:text-white font-medium">+91 98227 75922</a></p>
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Email:</span> <a href="mailto:events@phoenixinfotainment.com" className="hover:underline text-zinc-900 dark:text-white font-medium">events@phoenixinfotainment.com</a></p>
                  <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Website:</span> <a href="https://www.phoenixinfotainment.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-900 dark:text-white font-medium">www.phoenixinfotainment.com</a></p>
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
