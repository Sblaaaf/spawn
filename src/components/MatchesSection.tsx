'use client';

import { useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';
import type { RecordModel } from 'pocketbase';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  game: string;
  start_date: string;
  status: string;
  expand: {
    homeTeam: { name: string };
    awayTeam: { name: string };
    game: { name: string };
  };
}

export default function MatchesSection() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const records: Match[] = await pb.collection('matches').getFullList({
          expand: 'homeTeam,awayTeam,game',
          filter: 'status="scheduled" || status="live"',
          sort: 'start_date',
        });
        // Convert RecordModel to plain JS object for state
        const plainRecords = records.map((record) => ({ ...record }));
        setMatches(plainRecords);
      } catch (error) {
        console.error('Erreur lors du chargement des matchs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

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
    <section id="matches" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl heading-clash font-bold mb-4">
            Matchs en cours
          </h2>
          <p className="text-gray-400 text-lg">
            Rejoins les meilleures rencontres esport et remporte des gains
          </p>
        </div>

        {/* Matches Grid - Bento Layout */}
        {loading ? (
          <div className="text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="bento-grid">
            {matches.map((match) => (
              <div
                key={match.id}
                className="card-glass-hover p-6 flex flex-col justify-between group"
              >
                {/* Game Tag */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-sm font-semibold rounded-full">
                    {match.expand.game?.name || 'Jeu'}
                  </span>
                </div>

                {/* Teams */}
                <div className="flex-1 flex flex-col justify-center mb-6">
                  {/* Home Team */}
                  <div className="text-center mb-4">
                    <p className="font-semibold text-lg group-hover:gradient-text transition-all ">
                      {match.expand.homeTeam?.name || 'Équipe 1'}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="text-center mb-4">
                    <span className="text-gray-500 text-sm uppercase tracking-wider">vs</span>
                  </div>

                  {/* Away Team */}
                  <div className="text-center">
                    <p className="font-semibold text-lg group-hover:gradient-text transition-all ">
                      {match.expand.awayTeam?.name || 'Équipe 2'}
                    </p>
                  </div>
                </div>

                {/* Status & Date */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest text-gray-400">
                      {match.status === 'live' ? (
                        <span className="text-red-500 flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          EN DIRECT
                        </span>
                      ) : (
                        formatDate(match.start_date)
                      )}
                    </span>
                  </div>
                  <button className="w-full py-2 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent-dark)] transition-all duration-200 text-sm">
                    {match.status === 'live' ? 'Voir les cotes' : 'Parier maintenant'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && matches.length === 0 && (
          <div className="card-glass p-12 text-center">
            <p className="text-gray-400">Aucun match disponible pour le moment</p>
          </div>
        )}
      </div>
    </section>
  );
}
