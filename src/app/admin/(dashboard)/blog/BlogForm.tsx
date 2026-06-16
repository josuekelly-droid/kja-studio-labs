// src/app/admin/blog/BlogForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogData {
  id?: string;
  titre: string;
  slug?: string;
  contenu: string;
  extrait: string;
  categorie: string;
  tags: string[];
  imagePrincipale: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  featured: boolean;
  estPublie: boolean;
  tempsLecture?: number;
}

interface BlogFormProps {
  article?: BlogData | null;
}

const categories = [
  { valeur: 'DESIGN', label: 'Design' },
  { valeur: 'DEVELOPPEMENT', label: 'Développement' },
  { valeur: 'SEO', label: 'SEO' },
  { valeur: 'BUSINESS', label: 'Business' },
  { valeur: 'TUTORIEL', label: 'Tutoriel' },
  { valeur: 'ACTUALITE', label: 'Actualité' },
];

export function BlogForm({ article }: BlogFormProps) {
  const router = useRouter();
  const isEdit = !!article;

  const [formData, setFormData] = useState({
    titre: article?.titre || '',
    contenu: article?.contenu || '',
    extrait: article?.extrait || '',
    categorie: article?.categorie || 'ACTUALITE',
    tags: article?.tags?.join(', ') || '',
    imagePrincipale: article?.imagePrincipale || '',
    metaTitle: article?.metaTitle || '',
    metaDescription: article?.metaDescription || '',
    metaKeywords: article?.metaKeywords?.join(', ') || '',
    featured: article?.featured || false,
    estPublie: article?.estPublie || false,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const form = new FormData();
    form.append('fichier', file);
    form.append('dossier', 'blog');
    form.append('type', 'PRINCIPALE');
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.succes) setFormData((prev) => ({ ...prev, imagePrincipale: data.image.url }));
      else setError(data.erreur || 'Erreur upload');
    } catch { setError('Erreur réseau lors de l\'upload'); }
    setUploading(false);
  }

  function removeImage() {
    setFormData((prev) => ({ ...prev, imagePrincipale: '' }));
  }

  async function handleSubmit(e: React.FormEvent, publier: boolean) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      metaKeywords: formData.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      estPublie: publier,
    };
    try {
      const url = isEdit ? `/api/admin/blog/${article!.id}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setError(data.erreur || 'Erreur lors de l\'enregistrement'); return; }
      setSuccess(publier ? 'Article publié ! Google notifié.' : 'Brouillon enregistré.');
      if (!isEdit) router.push(`/admin/blog/${data.id}`);
      else router.refresh();
    } catch { setError('Erreur réseau.'); }
    finally { setLoading(false); }
  }

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 text-sm p-4 rounded-xl border border-green-100">{success}</div>}

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Titre *</label>
            <input type="text" value={formData.titre} onChange={(e) => updateField('titre', e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Titre de l'article" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Extrait</label>
            <textarea value={formData.extrait} onChange={(e) => updateField('extrait', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none" placeholder="Résumé affiché sur la homepage et le listing" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Contenu (Markdown)</label>
            <textarea value={formData.contenu} onChange={(e) => updateField('contenu', e.target.value)} rows={18} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm font-mono resize-none" placeholder="Écrivez votre article en Markdown..." />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Image principale</label>
            {formData.imagePrincipale ? (
              <div className="relative group mb-3 inline-block">
                <img src={formData.imagePrincipale} alt="" className="w-full max-w-xs rounded-xl" />
                <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ) : (
              <div className="w-full max-w-xs h-40 bg-gray-50 rounded-xl flex items-center justify-center mb-3 border-2 border-dashed border-gray-200">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleImageUpload} className="text-xs" />
            {uploading && <p className="text-xs text-gray-400 mt-1">Upload en cours...</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-heading font-semibold text-gray-900 text-sm mb-4">Publication</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.estPublie} onChange={(e) => updateField('estPublie', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet" />
                <span className="text-sm text-gray-700">Publié</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={(e) => updateField('featured', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet" />
                <span className="text-sm text-gray-700">Mis en avant</span>
              </label>
            </div>
            <div className="mt-4 space-y-2">
              <button type="button" onClick={(e) => handleSubmit(e, true)} disabled={loading || !formData.titre} className="w-full py-2.5 bg-violet text-white font-heading font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50">{loading ? 'Enregistrement...' : 'Publier'}</button>
              <button type="button" onClick={(e) => handleSubmit(e, false)} disabled={loading || !formData.titre} className="w-full py-2.5 border border-gray-200 text-gray-700 font-heading font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50">Brouillon</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Catégorie</label>
            <select value={formData.categorie} onChange={(e) => updateField('categorie', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm">
              {categories.map((cat) => (<option key={cat.valeur} value={cat.valeur}>{cat.label}</option>))}
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</label>
            <input type="text" value={formData.tags} onChange={(e) => updateField('tags', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="design, ui, tendances..." />
            <p className="text-xs text-gray-400 mt-1">Séparés par des virgules</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-heading font-semibold text-gray-900 text-sm">SEO</h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Meta Title</label>
              <input type="text" value={formData.metaTitle} onChange={(e) => updateField('metaTitle', e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-xs" placeholder="Titre SEO (60-70 caractères)" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Meta Description</label>
              <textarea value={formData.metaDescription} onChange={(e) => updateField('metaDescription', e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-xs resize-none" placeholder="Description SEO (150-160 caractères)" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Mots-clés</label>
              <input type="text" value={formData.metaKeywords} onChange={(e) => updateField('metaKeywords', e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-xs" placeholder="blog, design, tutoriel..." />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}