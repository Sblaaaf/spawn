'use client';

import { useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';

interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
  created: string;
}

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const records = await pb.collection('users').getFullList({
        sort: '-created',
      });
      setUsers(records);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl heading-clash font-bold mb-4">Utilisateurs</h2>
        <p className="text-gray-400">Total: {users.length} utilisateurs</p>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="text-center text-gray-400">Chargement...</div>
      ) : (
        <div className="card-glass overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Utilisateur
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  Balance
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Inscrit le
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-semibold">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-right text-sm font-mono text-emerald-400">
                    ${user.balance.toLocaleString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{formatDate(user.created)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
