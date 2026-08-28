import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = constructMetadata({
  title: 'Our Vision | Phoenix Infotainment',
  description: 'Learn about our core vision, mission, and the creative philosophy that drives Phoenix Infotainment to excellence.',
  canonicalUrl: 'https://phoenixinfotainment.com/our-vision',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Our Vision - Phoenix Infotainment',
  description: 'Learn about our core vision, mission, and the creative philosophy that drives Phoenix Infotainment to excellence.',
  url: 'https://phoenixinfotainment.com/our-vision',
};

export default function OurVisionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
