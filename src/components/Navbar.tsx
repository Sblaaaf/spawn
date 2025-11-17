'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import AuthModal from './AuthModal';
import { Trophy, BarChart3, User, LogOut, LogIn, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

const ADMIN_EMAILS = ['reno@test.com']; // à passer plus tard en env / helper partagé

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/#matches', label: 'Matchs', icon: Trophy },
    { href: '/#rankings', label: 'Classement', icon: BarChart3 },
    { href: '/betting', label: 'Parier', icon: Trophy },
    { href: '/dashboard', label: 'Dashboard', icon: User },
  ];

  const isAdmin = !!user && ADMIN_EMAILS.includes(user.email);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-sm font-bold">
              SP
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold tracking-tight">Spawn</span>
              <span className="text-[11px] text-gray-400 group-hover:text-gray-300 transition">
                Pariez sur l&apos;esport
              </span>
            </div>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href.startsWith('/#') && pathname === '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all',
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
              >
                <ShieldCheck size={16} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Right section (user / auth) */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xs font-semibold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{user.username}</p>
                    <p className="text-[11px] text-gray-400">
                      {(Number(user.balance) || 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs text-gray-200 hover:bg-white/10 transition"
                >
                  <LogOut size={14} />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500 text-xs font-medium text-white hover:bg-indigo-400 transition"
              >
                <LogIn size={14} />
                <span>Connexion / Inscription</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}