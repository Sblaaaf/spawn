'use client';

import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Liste des admins (à mettre dans une vraie DB plus tard)
const ADMIN_EMAILS = ['reno@test.com'];

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !ADMIN_EMAILS.includes(user.email))) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return null;
  }

  return <>{children}</>;
}