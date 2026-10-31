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
          className="p-2.5 text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-xl transition-all disabled:opacity-50"
          title="Approuver"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={desapprouver}
          disabled={loading}
          className="p-2.5 text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl transition-all disabled:opacity-50"
          title="Désapprouver"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {confirmDelete ? (
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
          <button
            onClick={supprimer}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-heading font-semibold text-white bg-red-600/80 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
          >
            Confirmer
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="px-3 py-1.5 text-xs font-heading font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmDelete(true)}
          disabled={loading}
          className="p-2.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-all disabled:opacity-50"
          title="Supprimer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}