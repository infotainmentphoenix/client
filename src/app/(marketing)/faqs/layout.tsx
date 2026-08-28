import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { faqApi } from '@/features/faqs/api';

export const metadata = constructMetadata({
  title: 'FAQs | Phoenix Infotainment',
  description: 'Find answers to common questions about our event management, artist bookings, and technical production services.',
  canonicalUrl: 'https://phoenixinfotainment.com/faqs',
});

export default async function FaqsLayout({ children }: { children: React.ReactNode }) {
  // Fetch live FAQs server-side for AI Engine GEO optimization
  const faqs = await faqApi.getFaqs();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
