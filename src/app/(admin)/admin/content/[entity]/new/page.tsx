import { notFound } from 'next/navigation';
import { getEntityConfig } from '@/config/cms';

// Import custom Form components
import { ArtistForm } from '@/features/artists/components/ArtistForm';
import { EventForm } from '@/features/events/components/EventForm';
import { ServiceForm } from '@/features/services/components/ServiceForm';
import { FaqForm } from '@/features/faqs/components/FaqForm';
import { CarouselForm } from '@/features/carousel/components/CarouselForm';
import { GalleryForm } from '@/features/gallery/components/GalleryForm';
import { PageForm } from '@/features/pages/components/PageForm';
import { PressForm } from '@/features/press/components/PressForm';
import { TeamForm } from '@/features/team/components/TeamForm';
import { TestimonialForm } from '@/features/testimonials/components/TestimonialForm';

interface PageProps {
  params: Promise<{
    entity: string;
  }>;
}

export default async function CMSCreatePage({ params }: PageProps) {
  const { entity } = await params;
  const config = getEntityConfig(entity);

  if (!config) {
    notFound();
  }

  // Render Custom UI if available
  switch (entity) {
    case 'artists':
      return <ArtistForm />;
    case 'events':
      return <EventForm />;
    case 'services':
      return <ServiceForm />;
    case 'faqs':
      return <FaqForm />;
    case 'carousels':
      return <CarouselForm />;
    case 'gallery':
      return <GalleryForm />;
    case 'pages':
      return <PageForm />;
    case 'press':
      return <PressForm />;
    case 'team':
      return <TeamForm />;
    case 'testimonials':
      return <TestimonialForm />;
    default:
      break; // Fallback to generic mock UI
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Create New {config.singular}
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-3xl">
        <form className="space-y-6">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'textarea' || field.type === 'rich-text' ? (
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  rows={4}
                />
              ) : field.type === 'boolean' ? (
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              ) : (
                <input
                  type={field.type === 'date' ? 'date' : 'text'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Save {config.singular}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
