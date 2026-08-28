import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { ShareButton } from './ShareButton';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const mockPost = {
    title: `Amazing ${category.replace('-', ' ')} Content`,
    description: `Learn everything about ${slug} in this comprehensive article.`,
    image: `https://phoenixinfotainment.com/images/og-${category}-${slug}.jpg`,
  };

  return constructMetadata({
    title: mockPost.title,
    description: mockPost.description,
    image: mockPost.image,
    canonicalUrl: `https://phoenixinfotainment.com/articles/${category}/${slug}`,
  });
}

export default async function DynamicCategorySlugPage({ params }: PageProps) {
  const { category, slug } = await params;

  const mockPost = {
    title: `Amazing ${category.replace('-', ' ')} Content`,
    description: `Learn everything about ${slug} in this comprehensive article.`,
    author: 'Phoenix Team',
    publishedAt: new Date().toISOString(),
    image: `https://phoenixinfotainment.com/images/og-${category}-${slug}.jpg`,
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: mockPost.title,
    image: [mockPost.image],
    datePublished: mockPost.publishedAt,
    dateModified: mockPost.publishedAt,
    author: [{ '@type': 'Organization', name: mockPost.author, url: 'https://phoenixinfotainment.com' }],
  };

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <main className="max-w-4xl mx-auto py-16 px-4">
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                {category}
              </span>
              <ShareButton 
                title={mockPost.title} 
                text={mockPost.description} 
                url={`https://phoenixinfotainment.com/articles/${category}/${slug}`} 
              />
            </div>
            <h1 className="text-4xl font-extrabold">{mockPost.title}</h1>
            <p className="mt-4 text-xl">{mockPost.description}</p>
          </header>
        </article>
      </main>
    </>
  );
}
