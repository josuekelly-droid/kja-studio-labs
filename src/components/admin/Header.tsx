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
    <header className="bg-[#05020a]/80 backdrop-blur-2xl border-b border-white/10 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-40 sticky top-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Branding Mobile & Status Indicator Desktop */}
      <div className="flex items-center gap-4">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 ml-12 group">
          <img 
            src="/logo/kja-studio-labs.webp" 
            alt="KJA Studio Labs" 
            className="h-7 w-auto rounded-lg object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]" 
          />
          <span className="font-heading font-black text-white text-sm tracking-tight">KJA Studio</span>
        </div>

        {/* Desktop Status Badge */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300 font-medium">
            System Online
          </span>
        </div>
      </div>

      {/* Profil Administrateur & Actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        {user && (
          <>
            <div className="flex items-center gap-3">
              {/* Avatar Stylisé */}
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600/30 to-purple-600/10 text-violet-300 border border-violet-500/40 rounded-2xl flex items-center justify-center font-heading font-black text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                {user.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>

              {/* Infos Utilisateur */}
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-heading font-bold text-white tracking-wide">
                  {user.name || 'Administrateur'}
                </span>
                <span className="text-[10px] font-mono text-gray-400 font-light">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Séparateur Subtil */}
            <div className="hidden sm:block h-5 w-px bg-white/10" />

            {/* Bouton Déconnexion */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-medium text-red-400/80 hover:text-red-300 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] group"
              title="Déconnexion sécurisée"
            >
              <svg className="w-4 h-4 text-red-400 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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