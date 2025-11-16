'use client';

import { useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';

interface User {
  id: string;
  username: string;
  balance: number;
}

export default function RankingsSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        /* const records = await pb.collection('users').getFullList({
          sort: '-balance',
          limit: 10,
        });
        setUsers(records); */
        const records: User[] = await pb.collection('users').getFullList({
          sort: '-balance',
          $autoCancel: false, // Ajouté pour la robustesse, évite l'annulation auto
        });
        // Convertit les RecordModel en objets simples pour l'état React
        const plainRecords = records.map((record) => ({ ...record }));
        setUsers(plainRecords.slice(0, 10)); // Limite les résultats après la récupération
      } catch (error) {
        console.error('Erreur lors du chargement du classement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section id="rankings" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-clash font-bold mb-4">
            Meilleurs parieurs
          </h2>
          <p className="text-gray-400 text-lg">
            Défie les top joueurs et escalade le classement
          </p>
        </div>

        {/* Rankings Table */}
        {loading ? (
          <div className="text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="card-glass overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Joueur
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                    Balance
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
                  >
                    {/* Rank */}
                    <td className="px-6 py-4">
                      <span className="font-clash font-bold text-lg">
                        {index < 3 ? (
                          <span
                            className={
                              index === 0
                                ? 'text-yellow-400'
                                : index === 1
                                  ? 'text-gray-300'
                                  : 'text-orange-600'
                            }
                          >
                            {['🥇', '🥈', '🥉'][index]}
                          </span>
                        ) : (
                          <span className="text-gray-400">#{index + 1}</span>
                        )}
                      </span>
                    </td>

                    {/* Username */}
                    <td className="px-6 py-4">
                      <span className="font-semibold group-hover:gradient-text transition-all">
                        {user.username}
                      </span>
                    </td>

                    {/* Balance */}
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-[var(--accent)] font-bold">
                        ${user.balance.toLocaleString('fr-FR')}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                        Actif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="card-glass p-12 text-center">
            <p className="text-gray-400">Aucun classement disponible</p>
          </div>
        )}
      </div>
    </section>
  );
}
