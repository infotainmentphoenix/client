import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { serviceApi } from '@/features/services/api';

export const metadata = constructMetadata({
  title: 'Our Services | Phoenix Infotainment',
  description: 'Explore our premium entertainment services, including artist management, event production, and corporate entertainment solutions.',
  canonicalUrl: 'https://phoenixinfotainment.com/services',
});

export default async function ServicesLayout({ children }: { children: React.ReactNode }) {
  const services = await serviceApi.getServices();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Phoenix Infotainment Services',
    description: 'List of event management, artist bookings, production, and custom entertainment solutions.',
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `https://phoenixinfotainment.com/services/${service.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'Phoenix Infotainment'
        }
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
