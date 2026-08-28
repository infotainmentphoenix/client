import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = constructMetadata({
  title: 'Event Gallery | Phoenix Infotainment',
  description: 'View spectacular photos and videos from our premium live events, concerts, and luxury weddings.',
  canonicalUrl: 'https://phoenixinfotainment.com/gallery',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Event Gallery - Phoenix Infotainment',
  description: 'View spectacular photos and videos from our premium live events, concerts, and luxury weddings.',
  url: 'https://phoenixinfotainment.com/gallery',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
