import { Outlet, Navigate } from 'react-router-dom';
import { useAdminStore } from '@/store/admin-store';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const { isAdminAuthenticated } = useAdminStore();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
