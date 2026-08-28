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
    title: `${title} | Artist Profile | Phoenix Infotainment`,
    description: `Book ${title} for your next premium event. View their profile, videos, and availability at Phoenix Infotainment.`,
    canonicalUrl: `https://phoenixinfotainment.com/artists/${slug}`,
  });
}

export default async function ArtistDetailLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: title,
    url: `https://phoenixinfotainment.com/artists/${slug}`,
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
