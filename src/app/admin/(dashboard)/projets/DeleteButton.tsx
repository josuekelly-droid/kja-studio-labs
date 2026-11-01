// src/app/admin/projets/DeleteButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  projetId: string;
  projetTitre?: string;
}

export function DeleteButton({ projetId, projetTitre }: DeleteButtonProps) {
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
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 bg-[#0c0616]/95 p-1.5 rounded-2xl border border-red-500/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-fadeIn">
        <span className="text-[11px] text-gray-300 font-light px-2.5 truncate max-w-[150px]">
          {projetTitre ? `Supprimer "${projetTitre}" ?` : 'Confirmer ?'}
        </span>
        <button 
          onClick={handleDelete} 
          disabled={loading} 
          className="px-3 py-1.5 text-xs font-heading font-semibold text-white bg-red-600 rounded-xl hover:bg-red-500 transition-all duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
        >
          {loading ? '...' : 'Oui'}
        </button>
        <button 
          onClick={() => setConfirming(false)} 
          className="px-2.5 py-1.5 text-xs font-heading font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
        >
          Non
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2.5 text-red-400/80 hover:text-red-400 bg-red-500/5 hover:bg-red-500/15 border border-red-500/20 rounded-2xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] group"
      title="Supprimer"
    >
      <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}