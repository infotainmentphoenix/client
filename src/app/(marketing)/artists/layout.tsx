import { constructMetadata } from '@/lib/utils/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { artistApi } from '@/features/artists/api';

export const metadata = constructMetadata({
  title: 'Our Artists | Phoenix Infotainment',
  description: 'Discover our world-class roster of exclusive celebrities, performers, and international artists available for your next event.',
  canonicalUrl: 'https://phoenixinfotainment.com/artists',
});

export default async function ArtistsLayout({ children }: { children: React.ReactNode }) {
  const artists = await artistApi.getArtists();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Phoenix Infotainment Artist Roster',
    description: 'Roster of world-class performers, celebrities, and live acts managed by Phoenix Infotainment.',
    numberOfItems: artists.length,
    itemListElement: artists.map((artist, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'PerformingGroup',
        name: artist.name,
        description: artist.shortBio || artist.bio || 'Professional performing artist managed by Phoenix Infotainment.',
        image: artist.profileImage || 'https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png',
        url: `https://phoenixinfotainment.com/artists/${artist.slug}`,
        genre: artist.genre
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
