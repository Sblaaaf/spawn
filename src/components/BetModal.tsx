'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { pb } from '../lib/pocketbase';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  selectedTeamId: string | null;
}

export default function BetModal({
  isOpen,
  onClose,
  matchId,
  homeTeam,
  awayTeam,
  selectedTeamId,
}: BetModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const odds = 1.85; // À récupérer depuis PocketBase en vrai
  const potentialPayout = amount ? (parseFloat(amount) * odds).toFixed(2) : '0.00';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user?.id || !selectedTeamId) {
        setError('Données manquantes');
        return;
      }

      if (parseFloat(amount) > user.balance) {
        setError('Solde insuffisant');
        setLoading(false);
        return;
      }

      // Créer le pari
      await pb.collection('bets').create({
        user: user.id,
        match: matchId,
        team: selectedTeamId,
        amount: parseFloat(amount),
        odds: odds,
        potential_payout: parseFloat(potentialPayout),
        status: 'pending',
      });

      // Mettre à jour la balance de l'utilisateur
      await pb.collection('users').update(user.id, {
        balance: user.balance - parseFloat(amount),
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setAmount('');
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du pari');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card-glass max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-clash font-bold">Placer un pari</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-green-400 font-semibold mb-2">Pari créé avec succès !</p>
            <p className="text-gray-400 text-sm">Bonne chance ! 🎯</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Match Info */}
            <div className="bg-white/5 p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-400 mb-1">Équipe sélectionnée</p>
              <p className="font-semibold">{homeTeam} vs {awayTeam}</p>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Montant à parier
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Montant"
                  min="1"
                  max={user?.balance || 0}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <span className="absolute right-4 top-2.5 text-gray-400">$</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Balance disponible: ${(Number(user?.balance) || 0).toLocaleString('fr-FR')}
              </p>
            </div>

            {/* Odds & Payout */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Cote</p>
                <p className="font-clash font-bold text-emerald-400">{odds}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Gain potentiel</p>
                <p className="font-clash font-bold text-purple-400">${potentialPayout}</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full btn-accent disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Traitement...' : 'Placer le pari'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
