import { CameraIcon } from '@/components/icons/PortalIcons';

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  country: string;
};

type ProfileTabProps = {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  onSave: (e: React.FormEvent) => void;
};

export function ProfileTab({ profileData, setProfileData, onSave }: ProfileTabProps) {
  return (
    <form onSubmit={onSave} className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold">Profile Details</h2>

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
  );
}
