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
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Message envoyé !</h3>
        <p className="text-gray-600 mb-4">Nous vous répondrons dans les plus brefs délais.</p>
        <button onClick={() => setSuccess(false)} className="btn-secondary text-sm px-6 py-2.5">Envoyer un autre message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">{error}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">Nom *</label>
          <input type="text" value={formData.nom} onChange={(e) => updateField('nom', e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Votre nom" />
        </div>
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">Email *</label>
          <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="votre@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">Entreprise</label>
        <input type="text" value={formData.entreprise} onChange={(e) => updateField('entreprise', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Votre entreprise" />
      </div>
      <div>
        <label className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">Sujet</label>
        <input type="text" value={formData.sujet} onChange={(e) => updateField('sujet', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Sujet de votre message" />
      </div>
      <div>
        <label className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">Message *</label>
        <textarea value={formData.message} onChange={(e) => updateField('message', e.target.value)} required rows={5} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none" placeholder="Décrivez votre projet..." />
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 bg-violet text-white font-heading font-semibold rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50">
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}