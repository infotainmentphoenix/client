import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = constructMetadata({
  title: 'Press & Media | Phoenix Infotainment',
  description: 'Latest news, press releases, and media coverage of Phoenix Infotainment.',
  canonicalUrl: 'https://phoenixinfotainment.com/press',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Press & Media - Phoenix Infotainment',
  description: 'Latest news, press releases, and media coverage of Phoenix Infotainment.',
  url: 'https://phoenixinfotainment.com/press',
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
