type BillingData = {
  gstin: string;
  businessName: string;
  address: string;
  pincode: string;
  currency: string;
};

type BillingTabProps = {
  billingData: BillingData;
  setBillingData: (data: BillingData) => void;
  onSave: (e: React.FormEvent) => void;
};

export function BillingTab({ billingData, setBillingData, onSave }: BillingTabProps) {
  return (
    <form onSubmit={onSave} className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold">Billing & Invoicing Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Registered Business Name</label>
            <input
              type="text"
              value={billingData.businessName}
              onChange={(e) => setBillingData({ ...billingData, businessName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">GSTIN / Tax Registration ID</label>
            <input
              type="text"
              value={billingData.gstin}
              onChange={(e) => setBillingData({ ...billingData, gstin: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Billing Address</label>
            <input
              type="text"
              value={billingData.address}
              onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Pincode / Zip Code</label>
            <input
              type="text"
              value={billingData.pincode}
              onChange={(e) => setBillingData({ ...billingData, pincode: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Preferred Invoice Currency</label>
            <select
              value={billingData.currency}
              onChange={(e) => setBillingData({ ...billingData, currency: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="INR">Indian Rupee (INR ₹)</option>
              <option value="USD">US Dollar (USD $)</option>
              <option value="AED">UAE Dirham (AED)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl shadow-lg text-sm"
        >
          Save Billing Details
        </button>
      </div>
    </form>
  );
}
