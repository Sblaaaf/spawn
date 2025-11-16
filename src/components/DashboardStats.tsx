'use client';

import { useAuth } from '../lib/auth-context';

export default function DashboardStats() {
  const { user } = useAuth();

  const stats = [
    { label: 'Balance', value: `$${(Number(user?.balance) || 0).toLocaleString('fr-FR')}`, color: 'text-green-400' },
    { label: 'Paris ce mois', value: '12', color: 'text-blue-400' },
    { label: 'Taux de victoire', value: '58%', color: 'text-purple-400' },
    { label: 'Gain net', value: '+$340', color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="card-glass-hover p-6 text-center">
          <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
          <p className={`text-3xl font-clash font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
