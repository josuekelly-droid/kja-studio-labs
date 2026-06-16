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
    <div className="flex items-center gap-1.5 shrink-0">
      {!estApprouve ? (
        <button
          onClick={approuver}
          disabled={loading}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50"
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
          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all disabled:opacity-50"
          title="Désapprouver"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {confirmDelete ? (
        <div className="flex items-center gap-1">
          <button
            onClick={supprimer}
            disabled={loading}
            className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
          >
            Confirmer
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmDelete(true)}
          disabled={loading}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
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