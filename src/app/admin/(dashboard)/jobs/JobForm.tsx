// src/app/admin/jobs/JobForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface JobData {
  id?: string;
  titre: string;
  typeContrat: string;
  localisation: string;
  description: string;
  competences: string[];
  salaire: string;
  emailContact: string;
  dateExpiration: string;
  estPublie: boolean;
}

interface JobFormProps {
  offre?: JobData | null;
}

const contrats = [
  { valeur: 'CDI', label: 'CDI' },
  { valeur: 'CDD', label: 'CDD' },
  { valeur: 'FREELANCE', label: 'Freelance' },
  { valeur: 'STAGE', label: 'Stage' },
  { valeur: 'ALTERNANCE', label: 'Alternance' },
];

export function JobForm({ offre }: JobFormProps) {
  const router = useRouter();
  const isEdit = !!offre;

  const [formData, setFormData] = useState({
    titre: offre?.titre || '',
    typeContrat: offre?.typeContrat || 'CDI',
    localisation: offre?.localisation || '',
    description: offre?.description || '',
    competences: offre?.competences?.join(', ') || '',
    salaire: offre?.salaire || '',
    emailContact: offre?.emailContact || 'contact@kja-studio-labs.com',
    dateExpiration: offre?.dateExpiration ? new Date(offre.dateExpiration).toISOString().split('T')[0] : '',
    estPublie: offre?.estPublie || false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent, publier: boolean) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const payload = { ...formData, competences: formData.competences.split(',').map((c) => c.trim()).filter(Boolean), estPublie: publier };
    try {
      const url = isEdit ? `/api/admin/jobs/${offre!.id}` : '/api/admin/jobs';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setError(data.erreur || 'Erreur'); return; }
      setSuccess(publier ? 'Offre publiée ! Google notifié.' : 'Brouillon enregistré.');
      if (!isEdit) router.push(`/admin/jobs/${data.id}`);
      else router.refresh();
    } catch { setError('Erreur réseau.'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {error && <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded-2xl border border-red-500/20 backdrop-blur-md">{error}</div>}
      {success && <div className="bg-emerald-500/10 text-emerald-400 text-sm p-4 rounded-2xl border border-emerald-500/20 backdrop-blur-md">{success}</div>}

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Titre de l&apos;offre *</label>
            <input type="text" value={formData.titre} onChange={(e) => updateField('titre', e.target.value)} required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" placeholder="Développeur Fullstack Senior" />
          </div>

          <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} rows={14} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm font-mono resize-none transition-all" placeholder="Description détaillée de l'offre (Markdown supporté)..." />
          </div>

          <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Compétences</label>
            <input type="text" value={formData.competences} onChange={(e) => updateField('competences', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" placeholder="React, TypeScript, Node.js, PostgreSQL" />
            <p className="text-xs text-gray-500 font-light mt-1.5">Séparées par des virgules</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Publication</h3>
            <label className="flex items-center gap-3 cursor-pointer mb-6">
              <input type="checkbox" checked={formData.estPublie} onChange={(e) => updateField('estPublie', e.target.checked)} className="w-4 h-4 rounded bg-white/5 border-white/20 text-violet-600 focus:ring-violet-500/20" />
              <span className="text-sm text-gray-300 font-light">Publié</span>
            </label>
            <div className="space-y-3">
              <button type="button" onClick={(e) => handleSubmit(e, true)} disabled={loading || !formData.titre} className="w-full py-3 bg-white text-gray-950 font-heading font-bold text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {loading ? 'Enregistrement...' : 'Publier'}
              </button>
              <button type="button" onClick={(e) => handleSubmit(e, false)} disabled={loading || !formData.titre} className="w-full py-3 bg-white/5 border border-white/10 text-white font-heading font-semibold text-sm rounded-2xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50">
                Brouillon
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Type de contrat</label>
            <select value={formData.typeContrat} onChange={(e) => updateField('typeContrat', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#05020a] border border-white/10 text-white focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all">
              {contrats.map((c) => <option key={c.valeur} value={c.valeur}>{c.label}</option>)}
            </select>
          </div>

          <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Localisation</label>
              <input type="text" value={formData.localisation} onChange={(e) => updateField('localisation', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" placeholder="Cotonou, Bénin" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Salaire</label>
              <input type="text" value={formData.salaire} onChange={(e) => updateField('salaire', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" placeholder="250 000 - 350 000 XOF / mois" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Email de candidature</label>
              <input type="email" value={formData.emailContact} onChange={(e) => updateField('emailContact', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all" placeholder="contact@kja-studio-labs.com" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">Date d&apos;expiration</label>
              <input type="date" value={formData.dateExpiration} onChange={(e) => updateField('dateExpiration', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-all [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}