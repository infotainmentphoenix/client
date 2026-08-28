import { Metadata } from 'next';
import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return constructMetadata({
    title: `${title} Artists | Phoenix Infotainment`,
    description: `Browse our curated selection of ${title} artists. Book top talent for your exclusive events.`,
    canonicalUrl: `https://phoenixinfotainment.com/artists/categories/${slug}`,
  });
}

export default async function ArtistCategoryLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${title} Artists - Phoenix Infotainment`,
    url: `https://phoenixinfotainment.com/artists/categories/${slug}`,
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
