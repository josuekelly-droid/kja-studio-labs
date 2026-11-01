// src/app/admin/avis/AvisActions.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AvisActions({ avisId, estApprouve }: { avisId: string; estApprouve: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function approuver() {
    setLoading(true);
    await fetch(`/api/admin/avis/${avisId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estApprouve: true, estAffiché: true }),
    });
    router.refresh();
    setLoading(false);
  }

  async function desapprouver() {
    setLoading(true);
    await fetch(`/api/admin/avis/${avisId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estApprouve: false, estAffiché: false }),
    });
    router.refresh();
    setLoading(false);
  }

  async function supprimer() {
    setLoading(true);
    await fetch(`/api/admin/avis/${avisId}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
    setConfirmDelete(false);
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      {!estApprouve ? (
        <button
          onClick={approuver}
          disabled={loading}
          className="p-2.5 text-emerald-400/90 hover:text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105 group"
          title="Approuver la recommandation"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={desapprouver}
          disabled={loading}
          className="p-2.5 text-amber-400/90 hover:text-amber-300 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/40 rounded-2xl transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 group"
          title="Désapprouver et masquer"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {confirmDelete ? (
        <div className="flex items-center gap-2 bg-[#0c0616]/95 p-1.5 rounded-2xl border border-red-500/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-fadeIn">
          <span className="text-[11px] font-mono text-gray-300 font-light px-2">Supprimer ?</span>
          <button
            onClick={supprimer}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-heading font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          >
            {loading ? '...' : 'Oui'}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="px-2.5 py-1.5 text-xs font-heading font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            Non
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmDelete(true)}
          disabled={loading}
          className="p-2.5 text-red-400/80 hover:text-red-400 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/40 rounded-2xl transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-105 group"
          title="Supprimer l'avis"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}