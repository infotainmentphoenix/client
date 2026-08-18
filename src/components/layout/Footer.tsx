'use client';

import Link from 'next/link';

const socialLinks = [
  {
    name: 'X (Twitter)',
    url: 'https://x.com/phoenixinfotmnt',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com/infotainmentphoenix/?invite_code=ba450dffea5243a5a3de7b338e88b0be&sender=1138566486953610273',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.63 0 12-5.373 12-12 0-6.628-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@phoenixinfotainment',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/PhoenixInfotainmeint/61552606547359/',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/phoenix_infotainment_events',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#f5f5f5] dark:bg-[#020202] text-gray-900 dark:text-white pt-24 pb-12 overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png" 
                alt="Phoenix Infotainment Logo (Dark Mode)" 
                className="hidden dark:block h-[80px] sm:h-[110px] w-auto object-contain" 
              />
              <img 
                src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20Black.png" 
                alt="Phoenix Infotainment Logo (Light Mode)" 
                className="block dark:hidden h-[80px] sm:h-[110px] w-auto object-contain" 
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-8 max-w-sm leading-relaxed font-light">
              Discover the life, energy & purpose of Phoenix Infotainment. Premium events, top artists, and unforgettable, legendary experiences.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              {['About Us', 'Events', 'Artists', 'Gallery', 'Our Vision'].map((link) => (
                <li key={link}><Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">{link}</Link></li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Support</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              {['Contact Us', 'FAQs', 'Terms of Service', 'Privacy Policy'].map((link) => {
                const href = link === 'Contact Us' ? '/contact' : `/${link.toLowerCase().replace(/ /g, '-')}`;
                return (
                  <li key={link}>
                    <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {}
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
