'use client';

import { useState } from 'react';

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
);
const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const CameraIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default function PortalAccountPage() {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'SECURITY' | 'BILLING' | 'NOTIFICATIONS'>('PROFILE');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form State
  const [profileData, setProfileData] = useState({
    name: 'Client User',
    email: 'client@phoenixinfotainment.com',
    phone: '+91 98765 43210',
    company: 'Phoenix Global Ventures',
    city: 'Mumbai',
    country: 'India',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    newPass: '',
    confirmPass: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [billingData, setBillingData] = useState({
    gstin: '27AAAAA0000A1Z5',
    businessName: 'Phoenix Global Ventures Pvt Ltd',
    address: '401 Phoenix Towers, BKC, Mumbai',
    pincode: '400051',
    currency: 'INR',
  });

  const [notifData, setNotifData] = useState({
    whatsapp: true,
    email: true,
    sms: false,
    promotional: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Account & Profile Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage your personal profile, authentication, billing address, and event notification channels.
          </p>
        </div>
        {saveStatus && (
          <div className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircleIcon className="w-4 h-4" /> {saveStatus}
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto no-scrollbar pb-px">
        {[
          { id: 'PROFILE', label: 'Personal Profile', icon: UserIcon },
          { id: 'SECURITY', label: 'Security & Password', icon: LockIcon },
          { id: 'BILLING', label: 'Billing & Invoicing', icon: CreditCardIcon },
          { id: 'NOTIFICATIONS', label: 'Notification Preferences', icon: BellIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE */}
      {activeTab === 'PROFILE' && (
        <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold">Profile Details</h2>

            {/* Avatar Section */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-100 dark:border-white/5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500 to-purple-600 text-white font-bold flex items-center justify-center text-2xl shadow-xl">
                  CU
                </div>
                <button
                  type="button"
                  onClick={() => alert('Profile picture upload dialog')}
                  className="absolute -bottom-2 -right-2 p-2 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-colors"
                >
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-base font-bold">{profileData.name}</h3>
                <p className="text-xs text-gray-400">{profileData.email}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-full uppercase">
                  Verified Client Account
                </span>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-200/50 dark:bg-white/5 text-sm text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">City</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Country</label>
                <input
                  type="text"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SECURITY */}
      {activeTab === 'SECURITY' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Change Password */}
          <form onSubmit={handleSave} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
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

          {/* Two Factor Auth */}
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
      )}

      {/* TAB 3: BILLING */}
      {activeTab === 'BILLING' && (
        <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
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
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'NOTIFICATIONS' && (
        <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold">Event Updates & Notification Preferences</h2>

            <div className="space-y-4">
              {[
                { key: 'whatsapp', label: 'WhatsApp Event Alerts', desc: 'Receive real-time WhatsApp updates on artist confirmations & stage timelines.' },
                { key: 'email', label: 'Email Confirmations & Invoices', desc: 'Get itemized event quotes and payment receipts delivered to your inbox.' },
                { key: 'sms', label: 'SMS Reminders', desc: 'Urgent SMS notifications prior to concert sound checks & artist arrivals.' },
                { key: 'promotional', label: 'New Celebrity Roster Alerts', desc: 'Exclusive notifications when top Bollywood artists join Phoenix lineup.' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div>
                    <h3 className="text-sm font-bold">{item.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={(notifData as any)[item.key]}
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
      )}
    </div>
  );
}
