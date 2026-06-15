// src/app/admin/blog/BlogDeleteButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function BlogDeleteButton({ articleId, articleTitre }: { articleId: string; articleTitre: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${articleId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (erreur) {
      console.error('Erreur suppression:', erreur);
    }
    setLoading(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500">Supprimer ?</span>
        <button onClick={handleDelete} disabled={loading} className="text-xs text-red-500 hover:underline font-medium">
          Oui
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-gray-500 hover:underline">
          Non
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-sm text-red-500 hover:underline font-medium">
      Supprimer
    </button>
  );
}