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
    <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-500 bg-[#0c0616]/80 backdrop-blur-2xl border shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${
      success === true ? 'border-emerald-500/40 bg-emerald-500/[0.03]' :
      success === false ? 'border-red-500/40 bg-red-500/[0.03]' :
      'border-white/10 hover:border-violet-500/40'
    }`}>
      {/* Halo lumineux d'arrière-plan */}
      <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest font-mono text-violet-400 font-semibold">Google Indexing API</span>
            <span className="text-gray-600">•</span>
            <span className="text-[9px] uppercase tracking-widest font-mono text-gray-400">Instant Dispatch</span>
          </div>
          <h3 className="font-heading font-bold text-white text-base sm:text-lg tracking-tight">Indexation Globale</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl">
            Soumettre et synchroniser l&apos;ensemble des URL dynamiques de votre studio directement auprès des robots d&apos;indexation.
          </p>
        </div>

        <button
          onClick={handleIndexAll}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-gray-950 font-heading font-bold text-xs sm:text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin text-gray-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Synchronisation...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Tout indexer maintenant</span>
            </>
          )}
        </button>
      </div>

      {message && (
        <div className={`relative z-10 mt-5 text-xs font-mono flex items-center gap-2 px-4 py-3 rounded-2xl border backdrop-blur-xl animate-fadeIn ${
          success ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-red-500/10 text-red-300 border-red-500/20'
        }`}>
          <span className={`w-2 h-2 rounded-full ${success ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          {message}
        </div>
      )}
    </div>
  );
}