'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { serviceApi } from '@/features/services/api';
import { Service } from '@/features/services/types';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetched = await serviceApi.getServices();
        setServices(fetched.filter(s => s.isActive));
      } catch (err) {
        console.error('Failed to load navbar services:', err);
      } finally {
        setIsLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled 
            ? 'w-full max-w-6xl bg-white/80 dark:bg-black/75 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-full px-5 py-3 border border-gray-200/50 dark:border-white/10' 
            : 'w-full max-w-7xl bg-transparent px-2 py-4'
          }
        `}
      >
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-black text-xl italic tracking-tighter">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 dark:text-white font-black tracking-[0.2em] uppercase text-sm leading-none">
              PHOENIX
            </span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-orange-500 leading-tight">
              INFOTAINMENT
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-all duration-500
          ${isScrolled ? 'bg-gray-100/60 dark:bg-white/5' : 'bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10'}
        `}>
          {/* Services with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link 
              href="/services"
              className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              Services <ChevronDownIcon className="w-3.5 h-3.5" />
            </Link>

            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 pt-1 w-64 z-50">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-3 shadow-2xl animate-fadeIn space-y-1">
                  {isLoadingServices ? (
                    <div className="px-3 py-2 text-xs text-gray-500 flex items-center gap-2">
                      <svg className="animate-spin h-3.5 w-3.5 text-orange-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading services...
                    </div>
                  ) : services.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-gray-500 italic">No services available</div>
                  ) : (
                    services.map(service => (
                      <Link 
                        key={service.id} 
                        href={`/services/${service.slug}`}
                        className="block px-3 py-2 rounded-xl text-xs font-bold hover:bg-orange-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 hover:text-orange-600 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link href="/artists" className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Artists
          </Link>

          <Link href="/events" className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Events
          </Link>

          <Link href="/gallery" className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Gallery
          </Link>

          <Link href="/press" className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Press
          </Link>

          <Link href="/contact" className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            Contact Us
          </Link>

          {/* Company Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('company')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1">
              Company <ChevronDownIcon className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'company' && (
              <div className="absolute top-full left-0 pt-1 w-52 z-50">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-3 shadow-2xl animate-fadeIn space-y-1">
                  <Link href="/about" className="block px-3 py-2 rounded-xl text-xs font-bold hover:bg-orange-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 hover:text-orange-600">
                    About Us
                  </Link>
                  <Link href="/team" className="block px-3 py-2 rounded-xl text-xs font-bold hover:bg-orange-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 hover:text-orange-600">
                    Our Leadership Team
                  </Link>
                  <Link href="/testimonials" className="block px-3 py-2 rounded-xl text-xs font-bold hover:bg-orange-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 hover:text-orange-600">
                    Client Reviews & Stories
                  </Link>
                  <Link href="/faqs" className="block px-3 py-2 rounded-xl text-xs font-bold hover:bg-orange-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 hover:text-orange-600">
                    FAQs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href="/login"
            className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 font-bold text-xs transition-all"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="hidden sm:flex items-center justify-center px-4.5 py-2 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
          >
            Sign Up
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 bg-gray-100 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-0 top-20 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl p-6 flex flex-col justify-between animate-fadeIn lg:hidden overflow-y-auto">
          <div className="space-y-6 pt-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Navigation</span>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/services" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">🛠️ Services</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/artists" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">🎤 Artists</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/events" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">🎉 Events</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/gallery" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">🖼️ Gallery</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/press" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">📰 Press</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">ℹ️ About Us</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/team" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">👥 Team</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/testimonials" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">⭐ Reviews</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/faqs" className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold text-sm">❓ FAQs</Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-white/10 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/login"
                  className="py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold rounded-2xl text-sm flex items-center justify-center border border-gray-200 dark:border-white/10"
                >
                  🔐 Sign In
                </Link>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/register"
                  className="py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-2xl text-sm flex items-center justify-center shadow-lg"
                >
                  ✨ Sign Up
                </Link>
              </div>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/contact"
                className="w-full py-3 bg-gray-100/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-xs flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
