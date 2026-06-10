import { 
  fetchNotifications, 
  fetchEvents, 
  fetchJobs, 
  fetchComplianceDocs, 
  fetchInquiries 
} from '@/lib/actions';
import { getSession } from '@/lib/auth';
import AdminDashboard from '@/components/AdminDashboard';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Administration Workspace',
  description: 'Manage School Notices, Calendar, Careers Board, and Inquiries Inbox.',
};

export default async function AdminPage() {
  const session = await getSession();

  // Route guarding (secondary validation)
  if (!session) {
    redirect('/admin/login');
  }

  // Fetch all CMS feeds
  const [
    notifications,
    events,
    jobs,
    complianceDocs,
    inquiries
  ] = await Promise.all([
    fetchNotifications(),
    fetchEvents(),
    fetchJobs(),
    fetchComplianceDocs(),
    fetchInquiries()
  ]);

  return (
    <div className="flex-1 w-full bg-slate-55">
      <AdminDashboard
        notifications={notifications}
        events={events}
        jobs={jobs}
        complianceDocs={complianceDocs}
        inquiries={inquiries}
        session={session}
      />
    </div>
  );
}
