type BookingsFilterProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  totalCount: number;
};

export function BookingsFilter({ activeFilter, setActiveFilter, totalCount }: BookingsFilterProps) {
  const tabs = [
    { id: 'ALL', label: `All Bookings (${totalCount})` },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'PENDING_DEPOSIT', label: 'Pending Deposit' },
    { id: 'PROPOSAL_SENT', label: 'Proposals Sent' },
    { id: 'COMPLETED', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveFilter(tab.id)}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeFilter === tab.id
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow'
              : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
