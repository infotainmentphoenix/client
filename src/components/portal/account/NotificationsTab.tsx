type NotifData = {
  whatsapp: boolean;
  email: boolean;
  sms: boolean;
  promotional: boolean;
};

type NotificationsTabProps = {
  notifData: NotifData;
  setNotifData: (data: NotifData) => void;
  onSave: (e: React.FormEvent) => void;
};

export function NotificationsTab({ notifData, setNotifData, onSave }: NotificationsTabProps) {
  const options = [
    { key: 'whatsapp', label: 'WhatsApp Event Alerts', desc: 'Receive real-time WhatsApp updates on artist confirmations & stage timelines.' },
    { key: 'email', label: 'Email Confirmations & Invoices', desc: 'Get itemized event quotes and payment receipts delivered to your inbox.' },
    { key: 'sms', label: 'SMS Reminders', desc: 'Urgent SMS notifications prior to concert sound checks & artist arrivals.' },
    { key: 'promotional', label: 'New Celebrity Roster Alerts', desc: 'Exclusive notifications when top Bollywood artists join Phoenix lineup.' },
  ] as const;

  return (
    <form onSubmit={onSave} className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold">Event Updates & Notification Preferences</h2>

        <div className="space-y-4">
          {options.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <div>
                <h3 className="text-sm font-bold">{item.label}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={notifData[item.key as keyof NotifData]}
                onChange={(e) => setNotifData({ ...notifData, [item.key]: e.target.checked })}
                className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl shadow-lg text-sm"
        >
          Save Notification Preferences
        </button>
      </div>
    </form>
  );
}
