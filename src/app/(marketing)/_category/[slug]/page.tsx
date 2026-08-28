import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { ShareButton } from '@/components/ui/ShareButton';

// Types
interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// 1. Dynamic Metadata Generation
// This perfectly crafts the <head> tags using the utility we created.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;

  // In a real app, you would fetch data from your CMS/Database here.
  // const post = await fetchPostData(category, slug);
  const mockPost = {
    title: `Amazing ${category.replace('-', ' ')} Content`,
    description: `Learn everything about ${slug} in this comprehensive, deeply researched article.`,
    image: `https://phoenixinfotainment.com/images/og-${category}-${slug}.jpg`,
  };

  if (!mockPost) {
    return constructMetadata({ title: 'Not Found', description: 'Page not found' });
  }

  return constructMetadata({
    title: mockPost.title,
    description: mockPost.description,
    image: mockPost.image,
    canonicalUrl: `https://phoenixinfotainment.com/${category}/${slug}`,
  });
}

// 2. Server Component
export default async function DynamicCategorySlugPage({ params }: PageProps) {
  const { category, slug } = await params;

  // Again, fetch real data here
  const mockPost = {
    title: `Amazing ${category.replace('-', ' ')} Content`,
    description: `Learn everything about ${slug} in this comprehensive, deeply researched article.`,
    author: 'Phoenix Team',
    publishedAt: new Date().toISOString(),
    image: `https://phoenixinfotainment.com/images/og-${category}-${slug}.jpg`,
  };

  if (!mockPost) notFound();

  // 3. JSON-LD Schema Generation
  // Dominating rich snippets with perfectly typed Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: mockPost.title,
    image: [mockPost.image],
    datePublished: mockPost.publishedAt,
    dateModified: mockPost.publishedAt,
    author: [
      {
        '@type': 'Organization',
        name: mockPost.author,
        url: 'https://phoenixinfotainment.com',
      },
    ],
  };

  return (
    <>
      {/* Injecting Schema silently in the background */}
      <SchemaMarkup schema={articleSchema} />

      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                {category}
              </span>
              <ShareButton 
                title={mockPost.title} 
                text={mockPost.description} 
                url={`https://phoenixinfotainment.com/${category}/${slug}`} 
              />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {mockPost.title}
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              {mockPost.description}
            </p>
          </header>
          
          <div className="mt-8">
            {/* Content goes here */}
            <p>
              This page programmatically handles metadata, rich snippets, and viral sharing mechanics.
              As a server component, it ensures perfectly rendered HTML for search engine crawlers.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
