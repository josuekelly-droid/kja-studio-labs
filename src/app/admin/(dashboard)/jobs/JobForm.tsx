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
      {error && <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 text-sm p-4 rounded-xl border border-green-100">{success}</div>}

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Titre de l&apos;offre *</label>
            <input type="text" value={formData.titre} onChange={(e) => updateField('titre', e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Développeur Fullstack Senior" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} rows={14} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm font-mono resize-none" placeholder="Description détaillée de l'offre (Markdown supporté)..." />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Compétences</label>
            <input type="text" value={formData.competences} onChange={(e) => updateField('competences', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="React, TypeScript, Node.js, PostgreSQL" />
            <p className="text-xs text-gray-400 mt-1">Séparées par des virgules</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-heading font-semibold text-gray-900 text-sm mb-4">Publication</h3>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input type="checkbox" checked={formData.estPublie} onChange={(e) => updateField('estPublie', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet" />
              <span className="text-sm text-gray-700">Publié</span>
            </label>
            <div className="space-y-2">
              <button type="button" onClick={(e) => handleSubmit(e, true)} disabled={loading || !formData.titre} className="w-full py-2.5 bg-violet text-white font-heading font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50">{loading ? 'Enregistrement...' : 'Publier'}</button>
              <button type="button" onClick={(e) => handleSubmit(e, false)} disabled={loading || !formData.titre} className="w-full py-2.5 border border-gray-200 text-gray-700 font-heading font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50">Brouillon</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Type de contrat</label>
            <select value={formData.typeContrat} onChange={(e) => updateField('typeContrat', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm">
              {contrats.map((c) => <option key={c.valeur} value={c.valeur}>{c.label}</option>)}
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Localisation</label>
              <input type="text" value={formData.localisation} onChange={(e) => updateField('localisation', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Cotonou, Bénin" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Salaire</label>
              <input type="text" value={formData.salaire} onChange={(e) => updateField('salaire', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="250 000 - 350 000 FCFA / mois" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Email de candidature</label>
              <input type="email" value={formData.emailContact} onChange={(e) => updateField('emailContact', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="contact@kja-studio-labs.com" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Date d&apos;expiration</label>
              <input type="date" value={formData.dateExpiration} onChange={(e) => updateField('dateExpiration', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}