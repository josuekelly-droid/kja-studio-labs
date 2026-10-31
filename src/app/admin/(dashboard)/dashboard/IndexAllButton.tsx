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
        setMessage("Erreur lors de l'indexation");
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
    <div className={`rounded-3xl p-6 transition-all bg-[#0c0616]/70 backdrop-blur-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
      success === true ? 'border-emerald-500/40 bg-emerald-500/5' :
      success === false ? 'border-red-500/40 bg-red-500/5' :
      'border-white/10 hover:border-violet-500/30'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-white text-sm sm:text-base tracking-tight">Indexation Google</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">Soumettre toutes les pages à Google en un clic</p>
        </div>
        <button
          onClick={handleIndexAll}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-950 font-heading font-bold text-xs sm:text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin text-gray-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Indexation...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tout indexer
            </>
          )}
        </button>
      </div>
      {message && (
        <div className={`mt-4 text-xs font-light flex items-center gap-2 px-4 py-2.5 rounded-xl border backdrop-blur-md ${
          success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${success ? 'bg-emerald-400' : 'bg-red-400'}`} />
          {message}
        </div>
      )}
    </div>
  );
}