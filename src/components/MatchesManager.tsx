'use client';

import { useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';

interface Match {
  id: string;
  expand?: {
    homeTeam?: { name: string };
    awayTeam?: { name: string };
    game?: { name: string };
    winner?: { name: string };
  };
  homeTeam?: string;
  awayTeam?: string;
  game?: string;
  winner?: string;
  start_date: string;
  status: 'scheduled' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

export default function MatchesManager() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'live' | 'completed'>('all');

  useEffect(() => {
    fetchMatches();
  }, [filter]);

  const fetchMatches = async () => {
    try {
      let filterQuery = '';
      if (filter !== 'all') {
        filterQuery = `status = "${filter}"`;
      }

      const records = await pb.collection('matches').getFullList({
        expand: 'homeTeam,awayTeam,game,winner',
        filter: filterQuery,
        sort: '-start_date',
      });
      setMatches(records);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMatchStatus = async (matchId: string, status: string, winnerId?: string) => {
    try {
      await pb.collection('matches').update(matchId, {
        status,
        winner: winnerId || null,
      });
      fetchMatches();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl heading-clash font-bold mb-4">Gestion des matchs</h2>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'scheduled', 'live', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                filter === status
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {status === 'all' && 'Tous'}
              {status === 'scheduled' && 'Programmés'}
              {status === 'live' && 'En direct'}
              {status === 'completed' && 'Terminés'}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Table */}
      {loading ? (
        <div className="text-center text-gray-400">Chargement...</div>
      ) : (
        <div className="card-glass overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Jeu</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Match</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                  Statut
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                  Gagnant
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr
                  key={match.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">{match.expand?.game?.name}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {match.expand?.homeTeam?.name} vs {match.expand?.awayTeam?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{formatDate(match.start_date)}</td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={match.status}
                      onChange={(e) => updateMatchStatus(match.id, e.target.value)}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-[var(--accent)]"
                    >
                      <option value="scheduled">Programmé</option>
                      <option value="live">En direct</option>
                      <option value="completed">Terminé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {match.status === 'completed' ? (
                      <select
                        value={match.winner || ''}
                        onChange={(e) => updateMatchStatus(match.id, 'completed', e.target.value)}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-[var(--accent)]"
                      >
                        <option value="">Sélectionner</option>
                        <option value={match.homeTeam}>{match.expand?.homeTeam?.name}</option>
                        <option value={match.awayTeam}>{match.expand?.awayTeam?.name}</option>
                      </select>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                      Éditer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
