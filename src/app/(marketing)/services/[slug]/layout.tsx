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
    title: `${title} | Services | Phoenix Infotainment`,
    description: `Explore our premium ${title} service. Professional event management and production by Phoenix Infotainment.`,
    canonicalUrl: `https://phoenixinfotainment.com/services/${slug}`,
  });
}

export default async function ServiceDetailLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    provider: {
      '@type': 'Organization',
      name: 'Phoenix Infotainment'
    },
    url: `https://phoenixinfotainment.com/services/${slug}`,
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
