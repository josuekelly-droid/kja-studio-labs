// src/app/admin/projets/DeleteButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteButton({ projetId }: { projetId: string; projetTitre: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projets/${projetId}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } catch (erreur) {
      console.error('Erreur suppression:', erreur);
    }
    setLoading(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-400">Supprimer ?</span>
        <button onClick={handleDelete} disabled={loading} className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-md hover:bg-red-600 transition-all disabled:opacity-50">Oui</button>
        <button onClick={() => setConfirming(false)} className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-all">Non</button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
      title="Supprimer"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}