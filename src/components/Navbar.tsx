'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 card-glass border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl heading-clash font-bold">
            <span className="gradient-text">SPAWN</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#matches"
            className="text-gray-300 hover:accent-text transition-colors duration-200"
          >
            Matchs
          </Link>
          <Link
            href="#rankings"
            className="text-gray-300 hover:accent-text transition-colors duration-200"
          >
            Classement
          </Link>
          <Link
            href="#about"
            className="text-gray-300 hover:accent-text transition-colors duration-200"
          >
            À propos
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
            Connexion
          </button>
          <button className="btn-accent">
            S'inscrire
          </button>
        </div>
      </div>
    </nav>
  );
}
