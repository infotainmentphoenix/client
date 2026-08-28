import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = constructMetadata({
  title: 'Our Team | Phoenix Infotainment',
  description: 'Meet the passionate event directors, marketing experts, and production managers behind Phoenix Infotainment.',
  canonicalUrl: 'https://phoenixinfotainment.com/team',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Team - Phoenix Infotainment',
  description: 'Meet the passionate event directors, marketing experts, and production managers behind Phoenix Infotainment.',
  url: 'https://phoenixinfotainment.com/team',
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
