import { constructMetadata } from '@/lib/utils/seo';

export const metadata = constructMetadata({
  title: 'Privacy Policy | Phoenix Infotainment',
  description: 'Our commitment to protecting your privacy and personal data at Phoenix Infotainment.',
  canonicalUrl: 'https://phoenixinfotainment.com/privacy',
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
