/*  UsersPage.tsx  –  MOCK  –  ZERO DEPENDENCY  */
import { useState } from 'react';

const mockUsers = [
  { id: '1', username: 'Ali_123', telegram_id: '123456', coin_balance: 1250, referrals: 5, join_date: '2024-01-15', status: 'active' },
  { id: '2', username: 'Mehmet_77', telegram_id: '234567', coin_balance: 850, referrals: 3, join_date: '2024-01-18', status: 'active' },
  { id: '3', username: 'Ayşe_99', telegram_id: '345678', coin_balance: 2100, referrals: 8, join_date: '2024-01-10', status: 'active' },
  { id: '4', username: 'Fatma_55', telegram_id: '456789', coin_balance: 650, referrals: 2, join_date: '2024-01-22', status: 'active' },
  { id: '5', username: 'Can_88', telegram_id: '567890', coin_balance: 1500, referrals: 6, join_date: '2024-01-12', status: 'active' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.telegram_id.includes(search)
  );

  return (
    <div className="p-8 space-y-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-2">Kullanıcı Yönetimi</h1>
      <input
        placeholder="Ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 text-white border border-emerald-500/30"
      />
      <ul className="space-y-2">
        {filtered.map((u) => (
          <li key={u.id} className="flex items-center justify-between p-3 rounded bg-gray-900 border border-emerald-500/20">
            <span>{u.username}</span>
            <span className="text-emerald-400">{u.coin_balance} coin</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
