// src/app/admin/dashboard/IndexAllButton.tsx
'use client';

import { useState } from 'react';

export function IndexAllButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);

  async function handleIndexAll() {
    setLoading(true);
    setMessage('');
    setSuccess(null);
    try {
      const res = await fetch('/api/admin/seo/index-all', { method: 'POST' });
      const data = await res.json();
      if (data.succes) {
        setMessage(`${data.total} pages notifiées à Google avec succès`);
        setSuccess(true);
      } else {
        setMessage('Erreur lors de l\'indexation');
        setSuccess(false);
      }
    } catch {
      setMessage('Erreur réseau. Vérifiez votre connexion.');
      setSuccess(false);
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 5000);
  }

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 transition-all ${
      success === true ? 'bg-green-50 border-green-200' :
      success === false ? 'bg-red-50 border-red-200' :
      'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-heading font-semibold text-gray-900 text-sm">Indexation Google</h3>
          <p className="text-xs text-gray-500 mt-0.5">Soumettre toutes les pages à Google en un clic</p>
        </div>
        <button
          onClick={handleIndexAll}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet text-white font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Indexation...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tout indexer
            </>
          )}
        </button>
      </div>
      {message && (
        <div className={`mt-3 text-xs font-medium flex items-center gap-2 ${
          success ? 'text-green-700' : 'text-red-600'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${success ? 'bg-green-500' : 'bg-red-500'}`} />
          {message}
        </div>
      )}
    </div>
  );
}