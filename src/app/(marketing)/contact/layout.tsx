import { constructMetadata } from '@/lib/utils/seo';

export const metadata = constructMetadata({
  title: 'Contact Us | Phoenix Infotainment',
  description: 'Get in touch with Phoenix Infotainment for premium event management, artist bookings, and corporate entertainment solutions.',
  canonicalUrl: 'https://phoenixinfotainment.com/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
