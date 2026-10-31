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
    <header className="bg-[#05020a]/90 backdrop-blur-xl border-b border-white/10 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40 sticky top-0 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      {/* Titre page - visible sur mobile */}
      <div className="lg:hidden flex items-center gap-3 ml-12 group">
        <img src="/logo/kja-studio-labs.webp" alt="KJA" className="h-7 w-auto rounded-lg drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]" />
        <span className="font-heading font-bold text-white text-sm tracking-tight">Admin</span>
      </div>

      {/* Espace vide à gauche sur desktop */}
      <div className="hidden lg:block" />

      {/* Infos utilisateur */}
      <div className="flex items-center gap-4 sm:gap-6">
        {user && (
          <>
            <div className="hidden sm:flex items-center gap-3 text-sm text-gray-300">
              <div className="w-8 h-8 bg-violet-600/20 text-violet-300 border border-violet-500/40 rounded-full flex items-center justify-center font-heading font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                {user.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="hidden md:inline font-light text-gray-300">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 font-medium transition-colors p-2 rounded-xl hover:bg-white/5"
              title="Déconnexion"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline font-light">Déconnexion</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}