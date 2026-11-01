// src/components/admin/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    label: 'Projets',
    href: '/admin/projets',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: '/admin/blog',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    label: 'Offres d\'emploi',
    href: '/admin/jobs',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Logs SEO',
    href: '/admin/seo',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: 'Avis Clients',
    href: '/admin/avis',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    label: 'Messages',
    href: '/admin/messages',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <>
      {/* Bouton Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-[#0c0616]/90 text-white rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
        aria-label="Menu Mobile"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Backdrop Mobile Overlay */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[55] animate-fadeIn" 
          onClick={() => setOpen(false)} 
        />
      )}

      {/* Barre Latérale Luxueuse */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#05020a] border-r border-white/10 z-[55] transform transition-transform duration-300 lg:transform-none flex flex-col justify-between ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header & Brand Ident */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center gap-3.5 group">
              <div className="relative">
                <img 
                  src="/logo/kja-studio-labs.webp" 
                  alt="KJA Studio Labs" 
                  className="h-8 w-auto rounded-xl object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.4)] group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="font-heading font-black text-white text-sm tracking-tight block">KJA Studio</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-violet-400 font-semibold block">LABS v2.4</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
            <div className="px-3 pb-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
              Platform Modules
            </div>
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-heading font-semibold transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/10 text-white border border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.25)]'
                      : 'text-gray-400 hover:bg-white/[0.03] hover:text-white border border-transparent'
                  }`}
                >
                  {/* Indicateur de selection actif */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-violet-400 rounded-r-full shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                  )}

                  <span className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-violet-400' : 'text-gray-400 group-hover:text-violet-300'}`}>
                    {link.icon}
                  </span>
                  <span className="tracking-wide">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/20">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-heading font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Voir la vitrine</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-heading font-medium text-red-400/90 hover:text-red-300 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-red-400 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Déconnexion</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 group-hover:animate-ping" />
          </button>
        </div>
      </aside>
    </>
  );
}