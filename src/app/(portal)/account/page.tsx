'use client';

import { useState } from 'react';

import { AccountHeader } from '@/components/portal/account/AccountHeader';
import { AccountTabs } from '@/components/portal/account/AccountTabs';
import { ProfileTab } from '@/components/portal/account/ProfileTab';
import { SecurityTab } from '@/components/portal/account/SecurityTab';
import { BillingTab } from '@/components/portal/account/BillingTab';
import { NotificationsTab } from '@/components/portal/account/NotificationsTab';

type TabType = 'PROFILE' | 'SECURITY' | 'BILLING' | 'NOTIFICATIONS';

export default function PortalAccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>('PROFILE');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

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
      <AccountHeader saveStatus={saveStatus} />

      <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'PROFILE' && (
        <ProfileTab 
          profileData={profileData} 
          setProfileData={setProfileData} 
          onSave={handleSave} 
        />
      )}

      {activeTab === 'SECURITY' && (
        <SecurityTab 
          passwordData={passwordData} 
          setPasswordData={setPasswordData} 
          twoFactorEnabled={twoFactorEnabled} 
          setTwoFactorEnabled={setTwoFactorEnabled} 
          onSave={handleSave} 
        />
      )}

      {activeTab === 'BILLING' && (
        <BillingTab 
          billingData={billingData} 
          setBillingData={setBillingData} 
          onSave={handleSave} 
        />
      )}

      {activeTab === 'NOTIFICATIONS' && (
        <NotificationsTab 
          notifData={notifData} 
          setNotifData={setNotifData} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
}
