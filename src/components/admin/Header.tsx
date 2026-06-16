// src/components/admin/Header.tsx
'use client';

import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  user: { id: string; email: string; name: string | null } | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="bg-white border-b border-gray-100 h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Titre page - visible sur mobile */}
      <div className="lg:hidden flex items-center gap-2 ml-12">
        <img src="/logo/kja-studio-labs.jpg" alt="KJA" className="h-6 w-auto rounded" />
        <span className="font-heading font-bold text-gray-900 text-sm">Admin</span>
      </div>

      {/* Espace vide à gauche sur desktop */}
      <div className="hidden lg:block" />

      {/* Infos utilisateur */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user && (
          <>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <div className="w-7 h-7 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-heading font-bold text-xs">
                {user.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="hidden md:inline">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 font-medium transition-colors"
              title="Déconnexion"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}