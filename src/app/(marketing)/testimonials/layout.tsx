import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = constructMetadata({
  title: 'Client Testimonials | Phoenix Infotainment',
  description: 'Read reviews and testimonials from our esteemed corporate clients, royal families, and partners.',
  canonicalUrl: 'https://phoenixinfotainment.com/testimonials',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Client Testimonials - Phoenix Infotainment',
  description: 'Read reviews and testimonials from our esteemed corporate clients, royal families, and partners.',
  url: 'https://phoenixinfotainment.com/testimonials',
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
