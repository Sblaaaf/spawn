'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 card-glass border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-clash font-bold">
              <span className="gradient-text">SPAWN</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#matches"
              className="text-gray-300 hover:accent-text transition-colors duration-200"
            >
              Matchs
            </Link>
            <Link
              href="/#rankings"
              className="text-gray-300 hover:accent-text transition-colors duration-200"
            >
              Classement
            </Link>
            <Link
              href="/#about"
              className="text-gray-300 hover:accent-text transition-colors duration-200"
            >
              À propos
            </Link>
            <Link
              href="/dashboard"
              className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href="/betting"
              className="text-gray-300 hover:accent-text transition-colors duration-200"
            >
              Parier
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-gray-400">
                      ${(Number(user.balance) || 0).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full flex items-center justify-center text-white font-semibold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>

                <button
                  onClick={() => logout()}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Connexion
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-accent"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
