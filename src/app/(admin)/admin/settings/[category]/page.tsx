import { notFound } from 'next/navigation';
import { getSettingsConfig } from '@/config/settings';

// Import custom components that were placed in settings
import { CarouselList } from '@/features/carousel/components/CarouselList';
import { SettingsForm } from './SettingsForm';
import { ClientLogosManager } from '@/features/site-settings/components/ClientLogosManager';
import { SocialLinksManager } from '@/features/site-settings/components/SocialLinksManager';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function SettingsCategoryPage({ params }: PageProps) {
  const { category } = await params;

  // Render Custom UI for specific modules placed in settings
  switch (category) {
    case 'carousels':
      return <CarouselList />;
    case 'client-logos':
      return <ClientLogosManager />;
    case 'social-links':
      return <SocialLinksManager />;
  }

  const config = getSettingsConfig(category);

  if (!config) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {config.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {config.description}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-3xl">
        <SettingsForm config={config} category={category} />
      </div>
    </div>
  );
}
