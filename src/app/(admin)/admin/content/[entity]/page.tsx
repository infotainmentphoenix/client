import { notFound } from 'next/navigation';
import { getEntityConfig } from '@/config/cms';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    entity: string;
  }>;
}

export default async function CMSListingPage({ params }: PageProps) {
  const { entity } = await params;
  const config = getEntityConfig(entity);

  if (!config) {
    notFound();
  }

  // In a real app, fetch the data using config.apiEndpoint
  const mockData = [
    { id: '1', name: 'Sample Data 1', title: 'Sample Data 1' },
    { id: '2', name: 'Sample Data 2', title: 'Sample Data 2' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {config.plural} Management
        </h1>
        <Link
          href={`/admin/content/${entity}/new`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Add New {config.singular}
        </Link>
      </div>

      {/* Generic Data Table Component */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Identifier
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {mockData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.name || row.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/content/${entity}/${row.id}`}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
