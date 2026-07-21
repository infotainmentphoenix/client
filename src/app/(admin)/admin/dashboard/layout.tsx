export default function AdminDashboardLayout({
  children,
  analytics,
  recentInquiries,
  upcomingConsultations,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  recentInquiries: React.ReactNode;
  upcomingConsultations: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {children}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analytics}
        {recentInquiries}
        {upcomingConsultations}
      </div>
    </div>
  );
}
