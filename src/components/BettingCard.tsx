'use client';

import { useState } from 'react';
import BetModal from './BetModal';

interface BettingCardProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  game: string;
  startDate: string;
  status: string;
  homeTeamId: string;
  awayTeamId: string;
}

export default function BettingCard({
  matchId,
  homeTeam,
  awayTeam,
  game,
  startDate,
  status,
  homeTeamId,
  awayTeamId,
}: BettingCardProps) {
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleBetClick = (teamId: string, teamName: string) => {
    setSelectedTeam(teamId);
    setIsBetModalOpen(true);
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
    <>
      <div className="card-glass-hover p-6">
        {/* Game & Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold rounded-full">
            {game}
          </span>
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              status === 'live'
                ? 'text-red-400 flex items-center gap-1'
                : 'text-gray-400'
            }`}
          >
            {status === 'live' && <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />}
            {status === 'live' ? 'EN DIRECT' : formatDate(startDate)}
          </span>
        </div>

        {/* Teams & Odds */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Home Team */}
          <button
            onClick={() => handleBetClick(homeTeamId, homeTeam)}
            disabled={status === 'completed'}
            className="group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="card-glass p-4 text-center group-hover:bg-white/10 transition-all">
              <p className="font-semibold group-hover:gradient-text transition-all mb-2">
                {homeTeam}
              </p>
              <div className="text-2xl heading-clash font-bold text-emerald-400">
                1.85
              </div>
              <p className="text-xs text-gray-400 mt-2">Cote</p>
            </div>
          </button>

          {/* Away Team */}
          <button
            onClick={() => handleBetClick(awayTeamId, awayTeam)}
            disabled={status === 'completed'}
            className="group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="card-glass p-4 text-center group-hover:bg-white/10 transition-all">
              <p className="font-semibold group-hover:gradient-text transition-all mb-2">
                {awayTeam}
              </p>
              <div className="text-2xl heading-clash font-bold text-emerald-400">
                2.10
              </div>
              <p className="text-xs text-gray-400 mt-2">Cote</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        {status === 'completed' && (
          <div className="text-center py-2 px-4 bg-gray-500/20 rounded-lg">
            <p className="text-sm text-gray-400">Ce match est terminé</p>
          </div>
        )}
      </div>

      {/* Bet Modal */}
      <BetModal
        isOpen={isBetModalOpen}
        onClose={() => setIsBetModalOpen(false)}
        matchId={matchId}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        selectedTeamId={selectedTeam}
      />
    </>
  );
}
