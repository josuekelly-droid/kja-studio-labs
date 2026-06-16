// src/app/admin/dashboard/IndexAllButton.tsx
'use client';

import { useState } from 'react';

export function IndexAllButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleIndexAll() {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/seo/index-all', { method: 'POST' });
      const data = await res.json();
      if (data.succes) {
        setMessage(`✅ ${data.total} pages notifiées à Google`);
      } else {
        setMessage('❌ Erreur lors de l\'indexation');
      }
    } catch {
      setMessage('❌ Erreur réseau');
    }
    setLoading(false);
  }

  return (
    <div className="mt-6 p-5 bg-white rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-gray-900">Indexation Google</h3>
          <p className="text-sm text-gray-500 mt-1">Notifier Google de toutes les pages du site</p>
        </div>
        <button
          onClick={handleIndexAll}
          disabled={loading}
          className="px-4 py-2 bg-violet text-white font-heading font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50"
        >
          {loading ? 'Indexation en cours...' : 'Tout indexer'}
        </button>
      </div>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}