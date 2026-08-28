import { notFound } from 'next/navigation';
import { getSettingsConfig } from '@/config/settings';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function SettingsCategoryPage({ params }: PageProps) {
  const { category } = await params;
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
        <form className="space-y-6">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              {field.description && (
                <p className="text-xs text-gray-500 mb-2">{field.description}</p>
              )}
              
              {field.type === 'textarea' ? (
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
                  type={field.type === 'color' ? 'color' : 'text'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
