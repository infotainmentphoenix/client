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
    title: `${title} | Event Details | Phoenix Infotainment`,
    description: `Discover the details of ${title}, a premium event managed by Phoenix Infotainment.`,
    canonicalUrl: `https://phoenixinfotainment.com/events/${slug}`,
  });
}

export default async function EventDetailLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    url: `https://phoenixinfotainment.com/events/${slug}`,
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
