// src/app/contact/ContactForm.tsx
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({ nom: '', email: '', entreprise: '', sujet: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.erreur || 'Erreur lors de l’envoi'); return; }
      setSuccess(true);
      setFormData({ nom: '', email: '', entreprise: '', sujet: '', message: '' });
    } catch {
      setError('Erreur réseau. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12 p-8 sm:p-12 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-heading font-black text-white mb-3 tracking-tight">Message envoyé avec succès !</h3>
        <p className="text-gray-400 font-light text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
          Nous avons bien reçu votre demande. Notre équipe vous répondra dans les plus brefs délais.
        </p>
        <button 
          onClick={() => setSuccess(false)} 
          className="inline-flex items-center justify-center px-7 py-3.5 bg-white/[0.03] border border-white/15 text-white font-heading font-semibold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/[0.08] hover:border-violet-500/40 transition-all duration-300 backdrop-blur-xl"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 sm:p-12 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      {error && (
        <div className="bg-red-500/10 text-red-400 text-xs font-mono p-4 rounded-2xl border border-red-500/20 backdrop-blur-md flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">Nom <span className="text-violet-400">*</span></label>
          <input 
            type="text" 
            value={formData.nom} 
            onChange={(e) => updateField('nom', e.target.value)} 
            required 
            className="w-full px-4.5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-light" 
            placeholder="Votre nom" 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">Email <span className="text-violet-400">*</span></label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => updateField('email', e.target.value)} 
            required 
            className="w-full px-4.5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-light" 
            placeholder="votre@email.com" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">Entreprise</label>
        <input 
          type="text" 
          value={formData.entreprise} 
          onChange={(e) => updateField('entreprise', e.target.value)} 
          className="w-full px-4.5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-light" 
          placeholder="Nom de votre entreprise" 
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">Sujet</label>
        <input 
          type="text" 
          value={formData.sujet} 
          onChange={(e) => updateField('sujet', e.target.value)} 
          className="w-full px-4.5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-light" 
          placeholder="Sujet de votre message" 
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">Message <span className="text-violet-400">*</span></label>
        <textarea 
          value={formData.message} 
          onChange={(e) => updateField('message', e.target.value)} 
          required 
          rows={5} 
          className="w-full px-4.5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm resize-none transition-all font-light" 
          placeholder="Décrivez votre projet ou votre besoin..." 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-4 bg-white text-gray-950 font-heading font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.01]"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin text-gray-950" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Envoi en cours...</span>
          </span>
        ) : (
          'Envoyer le message'
        )}
      </button>
    </form>
  );
}