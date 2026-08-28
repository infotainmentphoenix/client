import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { eventApi } from '@/features/events/api';

export const metadata = constructMetadata({
  title: 'Live Events | Phoenix Infotainment',
  description: 'Explore our breathtaking portfolio of successful corporate events, luxury weddings, and international concerts.',
  canonicalUrl: 'https://phoenixinfotainment.com/events',
});

export default async function EventsLayout({ children }: { children: React.ReactNode }) {
  const events = await eventApi.getEvents();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Phoenix Infotainment Portfolio',
    description: 'Breathtaking portfolio of corporate events, destination weddings, and international concerts.',
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        description: event.description || event.brief || 'Premium live event production by Phoenix Infotainment.',
        startDate: event.eventDate || event.createdAt,
        location: {
          '@type': 'Place',
          name: event.venue || event.location || 'TBA',
          address: {
            '@type': 'PostalAddress',
            addressLocality: event.city || 'TBA',
            addressRegion: event.state || 'India'
          }
        },
        image: event.coverImage || 'https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png',
        url: `https://phoenixinfotainment.com/events/${event.slug}`
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
