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
      setSuccess(publier ? 'Offre publiée avec succès ! Google a été notifié.' : 'Brouillon enregistré.');
      if (!isEdit) router.push(`/admin/jobs/${data.id}`);
      else router.refresh();
    } catch { setError('Erreur réseau.'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 text-red-400 text-xs font-mono p-4 rounded-2xl border border-red-500/20 backdrop-blur-xl flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 text-emerald-300 text-xs font-mono p-4 rounded-2xl border border-emerald-500/20 backdrop-blur-xl flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {success}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne Principale */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Titre */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Titre de l&apos;offre *</label>
              <span className="text-[10px] font-mono text-violet-400">01 / CORE</span>
            </div>
            <input 
              type="text" 
              value={formData.titre} 
              onChange={(e) => updateField('titre', e.target.value)} 
              required 
              className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all" 
              placeholder="Ex: Développeur Fullstack Senior / UI Lead" 
            />
          </div>

          {/* Description */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Description de l&apos;offre</label>
              <span className="text-[10px] font-mono text-violet-400">02 / MARKDOWN DESCRIPTION</span>
            </div>
            <textarea 
              value={formData.description} 
              onChange={(e) => updateField('description', e.target.value)} 
              rows={14} 
              className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-xs font-mono resize-none transition-all leading-relaxed" 
              placeholder="# Rôle & Missions&#10;Détails de l'offre en Markdown..." 
            />
          </div>

          {/* Compétences */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Compétences & Stack requises</label>
              <span className="text-[10px] font-mono text-violet-400">03 / STACK</span>
            </div>
            <input 
              type="text" 
              value={formData.competences} 
              onChange={(e) => updateField('competences', e.target.value)} 
              className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-xs font-mono transition-all" 
              placeholder="React, TypeScript, Next.js, Prisma" 
            />
            <p className="text-[10px] text-gray-500 font-mono mt-2">Compétences séparées par des virgules</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Publication Action Box */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Publication</h3>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <input type="checkbox" checked={formData.estPublie} onChange={(e) => updateField('estPublie', e.target.checked)} className="w-4 h-4 rounded bg-white/5 border-white/20 text-violet-600 focus:ring-violet-500/20" />
                <span className="text-sm text-gray-200 font-medium">Offre publiée en ligne</span>
              </label>
            </div>
            <div className="space-y-3">
              <button 
                type="button" 
                onClick={(e) => handleSubmit(e, true)} 
                disabled={loading || !formData.titre} 
                className="w-full py-3.5 bg-white text-gray-950 font-heading font-bold text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
              >
                {loading ? 'Enregistrement...' : 'Publier l\'offre'}
              </button>
              <button 
                type="button" 
                onClick={(e) => handleSubmit(e, false)} 
                disabled={loading || !formData.titre} 
                className="w-full py-3 bg-white/5 border border-white/10 text-white font-heading font-semibold text-sm rounded-2xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
              >
                Sauvegarder en brouillon
              </button>
            </div>
          </div>

          {/* Type de Contrat */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Type de contrat</label>
            <select 
              value={formData.typeContrat} 
              onChange={(e) => updateField('typeContrat', e.target.value)} 
              className="w-full px-4 py-3 rounded-2xl bg-[#05020a] border border-white/10 text-white focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all cursor-pointer"
            >
              {contrats.map((c) => <option key={c.valeur} value={c.valeur}>{c.label}</option>)}
            </select>
          </div>

          {/* Détails Pratiques */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Localisation</label>
              <input type="text" value={formData.localisation} onChange={(e) => updateField('localisation', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all" placeholder="Cotonou, Bénin / Remote" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Salaire / Rémunération</label>
              <input type="text" value={formData.salaire} onChange={(e) => updateField('salaire', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all" placeholder="Ex: Selon profil" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Email de candidature</label>
              <input type="email" value={formData.emailContact} onChange={(e) => updateField('emailContact', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-mono text-xs" placeholder="contact@kja-studio-labs.com" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Date d&apos;expiration</label>
              <input type="date" value={formData.dateExpiration} onChange={(e) => updateField('dateExpiration', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}