import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    module: string;
  }>;
}

const VALID_MODULES = ['inquiries', 'consultations'];

export default async function CRMModulePage({ params }: PageProps) {
  const { module } = await params;

  if (!VALID_MODULES.includes(module)) {
    notFound();
  }

  // Capitalize module name for display
  const title = module.charAt(0).toUpperCase() + module.slice(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          CRM: {title}
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
          Export Data
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Universal CRM Pipeline / Data Table rendering block */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <input 
            type="text" 
            placeholder={`Search ${module}...`} 
            className="border p-2 rounded w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex space-x-2">
            <select className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Status: All</option>
              <option>Status: Pending</option>
              <option>Status: Resolved</option>
            </select>
          </div>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Dynamic rendering based on the module pipeline */}
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                {title} data pipeline active. Connected to database...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
