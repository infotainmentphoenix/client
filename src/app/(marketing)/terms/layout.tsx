import { constructMetadata } from '@/lib/utils/seo';

export const metadata = constructMetadata({
  title: 'Terms of Service | Phoenix Infotainment',
  description: 'Terms and conditions for using Phoenix Infotainment services and website.',
  canonicalUrl: 'https://phoenixinfotainment.com/terms',
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
