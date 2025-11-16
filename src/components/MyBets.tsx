'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { pb } from '../lib/pocketbase';

interface Bet {
  id: string;
  expand?: {
    match?: {
      expand?: {
        homeTeam?: { name: string };
        awayTeam?: { name: string };
        game?: { name: string };
      };
      homeTeam?: string;
      awayTeam?: string;
      game?: string;
    };
    team?: { name: string };
  };
  match?: string;
  team?: string;
  amount: number;
  odds: number;
  potential_payout: number;
  status: 'pending' | 'won' | 'lost';
  created: string;
}

export default function MyBets() {
  const { user } = useAuth();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'won' | 'lost'>('all');

  useEffect(() => {
    const fetchBets = async () => {
      if (!user?.id) return;
      try {
        let filterQuery = `user = "${user.id}"`;
        if (filter !== 'all') {
          filterQuery += ` && status = "${filter}"`;
        }

        const records = await pb.collection('bets').getFullList({
          filter: filterQuery,
          expand: 'match.homeTeam,match.awayTeam,match.game,team',
          sort: '-created',
          limit: 10,
        });
        setBets(records);
      } catch (error) {
        console.error('Erreur lors du chargement des paris:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [user?.id, filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'lost':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'won':
        return '✓ Gagné';
      case 'lost':
        return '✗ Perdu';
      default:
        return '⏱ En attente';
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
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl heading-clash font-bold mb-4">Mes paris</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'pending', 'won', 'lost'] as const).map((status) => (
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
              {status === 'pending' && 'En attente'}
              {status === 'won' && 'Gagnés'}
              {status === 'lost' && 'Perdus'}
            </button>
          ))}
        </div>
      </div>

      {/* Bets List */}
      {loading ? (
        <div className="text-center text-gray-400">Chargement...</div>
      ) : bets.length > 0 ? (
        <div className="space-y-4">
          {bets.map((bet) => (
            <div key={bet.id} className="card-glass-hover p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Match Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 mb-1">
                    {bet.expand?.match?.expand?.game?.name || 'Jeu'}
                  </p>
                  <p className="font-semibold">
                    {bet.expand?.match?.expand?.homeTeam?.name || 'Équipe'} vs{' '}
                    {bet.expand?.match?.expand?.awayTeam?.name || 'Équipe'}
                  </p>
                  <p className="text-sm text-[var(--accent)]">
                    Paris sur: {bet.expand?.team?.name || 'Équipe'}
                  </p>
                </div>

                {/* Bet Details */}
                <div className="text-right">
                  <p className="text-sm text-gray-400">Mise</p>
                  <p className="font-mono font-bold">${bet.amount.toLocaleString('fr-FR')}</p>
                </div>

                {/* Odds */}
                <div className="text-right">
                  <p className="text-sm text-gray-400">Cote</p>
                  <p className="font-mono font-bold">{bet.odds.toFixed(2)}</p>
                </div>

                {/* Potential Payout */}
                <div className="text-right">
                  <p className="text-sm text-gray-400">Gain potentiel</p>
                  <p className="font-mono font-bold text-green-400">
                    ${bet.potential_payout.toLocaleString('fr-FR')}
                  </p>
                </div>

                {/* Status */}
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      bet.status
                    )}`}
                  >
                    {getStatusLabel(bet.status)}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(bet.created)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-glass p-12 text-center">
          <p className="text-gray-400 mb-4">Tu n'as pas de paris pour le moment</p>
          <button className="btn-accent">Créer un nouveau pari</button>
        </div>
      )}
    </section>
  );
}