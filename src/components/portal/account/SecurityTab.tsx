type PasswordData = {
  current: string;
  newPass: string;
  confirmPass: string;
};

type SecurityTabProps = {
  passwordData: PasswordData;
  setPasswordData: (data: PasswordData) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  onSave: (e: React.FormEvent) => void;
};

export function SecurityTab({ passwordData, setPasswordData, twoFactorEnabled, setTwoFactorEnabled, onSave }: SecurityTabProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <form onSubmit={onSave} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold">Change Password</h2>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordData.newPass}
              onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordData.confirmPass}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPass: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm"
        >
          Update Password
        </button>
      </form>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-sm">
        <div>
          <h3 className="text-base font-bold">Two-Factor Authentication (2FA)</h3>
          <p className="text-gray-500 text-xs mt-1">Add an additional layer of security to your client portal account.</p>
        </div>
        <button
          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            twoFactorEnabled
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white'
          }`}
        >
          {twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
        </button>
      </div>
    </div>
  );
}
