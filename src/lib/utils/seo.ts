import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  noIndex?: boolean;
}

const DEFAULT_SITE_NAME = 'Phoenix Infotainment';
const DEFAULT_DESCRIPTION = 'Experience the ultimate in entertainment and services with Phoenix Infotainment.';
const DEFAULT_IMAGE = 'https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png';

/**
 * Modular SEO & Viral Metadata Utility
 * Generates highly optimized Open Graph (OG) and Twitter Cards configurations
 * designed for psychological curiosity and maximum Click-Through Rate (CTR)
 */
export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SEOProps): Metadata {
  const finalTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_SITE_NAME;

  return {
    title: finalTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: finalTitle,
      description,
      type: 'website',
      siteName: DEFAULT_SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      images: [image],
      creator: '@phoenix_info', // Update with actual handle
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://phoenixinfotainment.com'),
  };
}
