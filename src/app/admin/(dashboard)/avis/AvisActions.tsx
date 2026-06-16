// src/app/admin/avis/AvisActions.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AvisActions({ avisId, estApprouve }: { avisId: string; estApprouve: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    if (!confirm('Supprimer définitivement cet avis ?')) return;
    setLoading(true);
    await fetch(`/api/admin/avis/${avisId}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 shrink-0">
      {!estApprouve ? (
        <button
          onClick={approuver}
          disabled={loading}
          className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
        >
          ✓ Approuver
        </button>
      ) : (
        <button
          onClick={desapprouver}
          disabled={loading}
          className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-medium rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50"
        >
          ✕ Désapprouver
        </button>
      )}
      <button
        onClick={supprimer}
        disabled={loading}
        className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
      >
        🗑️ Supprimer
      </button>
    </div>
  );
}