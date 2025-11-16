'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth-context';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!username) {
          setError('Le nom d\'utilisateur est requis');
          setLoading(false);
          return;
        }
        await register(email, password, username);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card-glass max-w-md w-full p-8 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl heading-clash font-bold">
            {isLogin ? 'Connexion' : 'S\'inscrire'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-4 mb-6 border-b border-white/10">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            className={`pb-3 px-2 font-semibold transition-colors ${
              isLogin
                ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                : 'text-gray-400'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            className={`pb-3 px-2 font-semibold transition-colors ${
              !isLogin
                ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                : 'text-gray-400'
            }`}
          >
            S'inscrire
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="pro_player"
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          {isLogin ? "Pas de compte ?" : "Déjà inscrit ?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="ml-2 text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors font-semibold"
          >
            {isLogin ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
}
