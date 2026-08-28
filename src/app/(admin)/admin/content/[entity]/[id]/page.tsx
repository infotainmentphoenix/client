import { notFound } from 'next/navigation';
import { getEntityConfig } from '@/config/cms';

interface PageProps {
  params: Promise<{
    entity: string;
    id: string;
  }>;
}

export default async function CMSEditPage({ params }: PageProps) {
  const { entity, id } = await params;
  const config = getEntityConfig(entity);

  if (!config) {
    notFound();
  }

  // In a real app, fetch existing data using id
  // const existingData = await fetchEntity(config.apiEndpoint, id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit {config.singular} #{id}
        </h1>
        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
          Delete {config.singular}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-3xl">
        <form className="space-y-6">
          {/* Reusing the same generic form generation logic */}
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'textarea' || field.type === 'rich-text' ? (
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  rows={4}
                  defaultValue={`Mock existing ${field.name}`}
                />
              ) : field.type === 'boolean' ? (
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked={true}
                />
              ) : (
                <input
                  type={field.type === 'date' ? 'date' : 'text'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                  defaultValue={`Mock existing ${field.name}`}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Update {config.singular}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
