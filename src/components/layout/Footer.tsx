'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-[#f5f5f5] dark:bg-[#020202] text-gray-900 dark:text-white pt-24 pb-12 overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <span className="text-white dark:text-black font-black text-2xl italic tracking-tighter">P</span>
              </div>
              <span className="text-gray-900 dark:text-white font-bold text-2xl tracking-[0.2em]">PHOENIX</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-8 max-w-sm leading-relaxed font-light">
              Discover the life, energy & purpose of Phoenix Infotainment. Premium events, top artists, and unforgettable, legendary experiences.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-lg">
                  {social.substring(0, 2)}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              {['About Us', 'Events', 'Artists', 'Gallery', 'Our Vision'].map((link) => (
                <li key={link}><Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Support</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              {['Contact Us', 'FAQs', 'Terms of Service', 'Privacy Policy'].map((link) => (
                <li key={link}><Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Get in Touch</h4>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex flex-col gap-4">
              <a href="mailto:info@phoenixinfotainment.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">info@phoenixinfotainment.com</a>
              <a href="tel:+919822775922" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block text-xl font-bold text-gray-900 dark:text-white">+91 9822775922</a>
              <p className="mt-4 text-gray-500 leading-relaxed font-light">123 Phoenix Tower, <br />Innovation District, <br />Global City 40001</p>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500">
          <p>&copy; {new Date().getFullYear()} Phoenix Infotainment. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-800 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-800 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-gray-800 dark:hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
