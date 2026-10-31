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
      if (!res.ok) { setError(data.erreur || 'Erreur'); return; }
      setSuccess(true);
      setFormData({ nom: '', email: '', entreprise: '', sujet: '', message: '' });
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-heading font-bold text-white mb-3">Message envoyé !</h3>
        <p className="text-gray-400 font-light mb-8 max-w-sm mx-auto leading-relaxed">
          Nous avons bien reçu votre demande. Nous vous répondrons dans les plus brefs délais.
        </p>
        <button 
          onClick={() => setSuccess(false)} 
          className="inline-flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/20 text-white font-heading font-medium text-sm rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded-2xl border border-red-500/20 backdrop-blur-md">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-300 mb-2">Nom *</label>
          <input 
            type="text" 
            value={formData.nom} 
            onChange={(e) => updateField('nom', e.target.value)} 
            required 
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" 
            placeholder="Votre nom" 
          />
        </div>
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-300 mb-2">Email *</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => updateField('email', e.target.value)} 
            required 
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" 
            placeholder="votre@email.com" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-heading font-semibold text-gray-300 mb-2">Entreprise</label>
        <input 
          type="text" 
          value={formData.entreprise} 
          onChange={(e) => updateField('entreprise', e.target.value)} 
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" 
          placeholder="Votre entreprise" 
        />
      </div>

      <div>
        <label className="block text-sm font-heading font-semibold text-gray-300 mb-2">Sujet</label>
        <input 
          type="text" 
          value={formData.sujet} 
          onChange={(e) => updateField('sujet', e.target.value)} 
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" 
          placeholder="Sujet de votre message" 
        />
      </div>

      <div>
        <label className="block text-sm font-heading font-semibold text-gray-300 mb-2">Message *</label>
        <textarea 
          value={formData.message} 
          onChange={(e) => updateField('message', e.target.value)} 
          required 
          rows={5} 
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm resize-none transition-all" 
          placeholder="Décrivez votre projet..." 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-4 bg-white text-gray-950 font-heading font-bold text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}