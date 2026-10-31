// src/app/admin/blog/BlogDeleteButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogDeleteButtonProps {
  articleId: string;
  articleTitre?: string;
}

export function BlogDeleteButton({ articleId }: BlogDeleteButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${articleId}`, { method: 'DELETE' });
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
      <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
        <span className="text-xs text-gray-300 font-light px-2">Supprimer ?</span>
        <button 
          onClick={handleDelete} 
          disabled={loading} 
          className="px-3 py-1 text-xs font-heading font-semibold text-white bg-red-600/80 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
        >
          {loading ? '...' : 'Oui'}
        </button>
        <button 
          onClick={() => setConfirming(false)} 
          className="px-2.5 py-1 text-xs font-heading font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          Non
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2.5 text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-all duration-300 disabled:opacity-50"
      title="Supprimer"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}