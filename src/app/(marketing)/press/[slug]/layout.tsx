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
    title: `${title} | Press Release | Phoenix Infotainment`,
    description: `Read the latest press release: ${title}. Stay updated with Phoenix Infotainment.`,
    canonicalUrl: `https://phoenixinfotainment.com/press/${slug}`,
  });
}

export default async function PressDetailLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    url: `https://phoenixinfotainment.com/press/${slug}`,
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      {children}
    </>
  );
}
