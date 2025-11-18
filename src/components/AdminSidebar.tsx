import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  ListTodo, 
  CheckSquare, 
  Gamepad2, 
  Store, 
  Megaphone, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAdminStore } from '@/store/admin-store';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Kullanıcılar', path: '/admin/users' },
  { icon: Bell, label: 'Bildirimler', path: '/admin/notifications' },
  { icon: ListTodo, label: 'Görev Yönetimi', path: '/admin/tasks' },
  { icon: CheckSquare, label: 'Görev Onay', path: '/admin/task-approvals' },
  { icon: Gamepad2, label: 'Oyun Ayarları', path: '/admin/game-settings' },
  { icon: Store, label: 'Mağaza Yönetimi', path: '/admin/store' },
  { icon: Megaphone, label: 'Sponsor Yönetimi', path: '/admin/sponsors' },
  { icon: Settings, label: 'Ayarlar', path: '/admin/settings' },
];

export default function AdminSidebar() {
  const { logout } = useAdminStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-black/40 border-r border-emerald-500/30 flex flex-col">
      <div className="p-6 border-b border-emerald-500/30">
        <h1 className="text-2xl font-bold text-white">Karaeski</h1>
        <p className="text-sm text-emerald-400">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'text-emerald-300 hover:bg-emerald-500/10 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-emerald-500/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
