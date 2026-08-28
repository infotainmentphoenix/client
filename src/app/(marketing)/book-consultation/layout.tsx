import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = constructMetadata({
  title: 'Book a Consultation | Phoenix Infotainment',
  description: 'Schedule a private consultation with our expert event directors to plan your next masterpiece.',
  canonicalUrl: 'https://phoenixinfotainment.com/book-consultation',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Book a Consultation - Phoenix Infotainment',
  description: 'Schedule a private consultation with our expert event directors to plan your next masterpiece.',
  url: 'https://phoenixinfotainment.com/book-consultation',
};

export default function BookConsultationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
