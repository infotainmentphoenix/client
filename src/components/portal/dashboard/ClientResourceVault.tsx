'use client';

export function ClientResourceVault() {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
      <h2 className="text-xl font-black pb-4 border-b border-gray-100 dark:border-white/5">Client Resource Vault</h2>

      <div className="space-y-3">
        <button
          onClick={() => alert('Downloading all signed contracts (PDF package)')}
          className="w-full p-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl border border-gray-100 dark:border-white/5 text-left flex items-center justify-between transition-colors group"
        >
          <div>
            <h3 className="text-xs font-bold">📄 Download Signed Contracts</h3>
            <p className="text-[11px] text-gray-400">PDF agreements & artist riders</p>
          </div>
        </button>
        <button
          onClick={() => alert('Accessing Marketing Assets')}
          className="w-full p-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl border border-gray-100 dark:border-white/5 text-left flex items-center justify-between transition-colors group"
        >
          <div>
            <h3 className="text-xs font-bold">🎨 Marketing Assets & Media</h3>
            <p className="text-[11px] text-gray-400">Hi-Res artist photos, logos</p>
          </div>
        </button>
        <button
          onClick={() => alert('Opening Financial Statements')}
          className="w-full p-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl border border-gray-100 dark:border-white/5 text-left flex items-center justify-between transition-colors group"
        >
          <div>
            <h3 className="text-xs font-bold">💰 Financial Statements</h3>
            <p className="text-[11px] text-gray-400">Invoices & Payment receipts</p>
          </div>
        </button>
      </div>
    </div>
  );
}
