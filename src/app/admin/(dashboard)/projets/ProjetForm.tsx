// src/app/admin/projets/ProjetForm.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Image {
  id?: string;
  url: string;
  nomFichier?: string;
  type?: string;
  alt?: string;
}

interface ProjetData {
  id?: string;
  titre: string;
  slug?: string;
  descriptionCourte: string;
  contenuComplet: string;
  categorie: string;
  client: string;
  dateRealisation: string;
  lienProjet: string;
  lienFigma: string;
  lienGithub: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  featured: boolean;
  estPublie: boolean;
  images: Image[];
  imagePrincipale: string;
  technologies: { technologie: { id: string; nom: string } }[];
}

interface ProjetFormProps {
  projet?: ProjetData | null;
}

const categories = [
  { valeur: 'UI_UX_DESIGN', label: 'UI/UX Design' },
  { valeur: 'FULLSTACK', label: 'Fullstack' },
  { valeur: 'CONNECT', label: 'Connect' },
];

export function ProjetForm({ projet }: ProjetFormProps) {
  const router = useRouter();
  const isEdit = !!projet;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    titre: projet?.titre || '',
    descriptionCourte: projet?.descriptionCourte || '',
    contenuComplet: projet?.contenuComplet || '',
    categorie: projet?.categorie || 'FULLSTACK',
    client: projet?.client || '',
    dateRealisation: projet?.dateRealisation ? new Date(projet.dateRealisation).toISOString().split('T')[0] : '',
    lienProjet: projet?.lienProjet || '',
    lienFigma: projet?.lienFigma || '',
    lienGithub: projet?.lienGithub || '',
    metaTitle: projet?.metaTitle || '',
    metaDescription: projet?.metaDescription || '',
    metaKeywords: projet?.metaKeywords?.join(', ') || '',
    featured: projet?.featured || false,
    estPublie: projet?.estPublie || false,
  });

  const [images, setImages] = useState<Image[]>(
    projet?.images?.map((img) => ({ id: img.id, url: img.url, nomFichier: img.nomFichier, type: img.type || 'GALERIE', alt: img.alt })) || []
  );
  const [imagePrincipale, setImagePrincipale] = useState(projet?.imagePrincipale || '');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append('fichier', file);
      form.append('dossier', 'projets');
      const isFirstImage = images.length === 0 && !imagePrincipale;
      form.append('type', isFirstImage ? 'PRINCIPALE' : 'GALERIE');
      if (projet?.id) form.append('projetId', projet.id);
      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        const data = await res.json();
        if (data.succes) {
          const nouvelleImage: Image = { id: data.image.id, url: data.image.url, nomFichier: data.image.nomFichier, type: isFirstImage ? 'PRINCIPALE' : 'GALERIE' };
          setImages((prev) => [...prev, nouvelleImage]);
          if (isFirstImage) setImagePrincipale(data.image.url);
        } else { setError(data.erreur || 'Erreur upload'); }
      } catch { setError('Erreur réseau lors de l\'upload'); }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeImage(index: number) {
    const imageSupprimee = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (imageSupprimee?.url === imagePrincipale) setImagePrincipale(images[0]?.url || '');
  }

  function setAsMain(url: string) { setImagePrincipale(url); }

  async function handleSubmit(e: React.FormEvent, publier: boolean) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const payload = {
      ...formData,
      metaKeywords: formData.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      estPublie: publier,
      imagePrincipale,
      images: images.map((img) => ({ id: img.id, url: img.url, nomFichier: img.nomFichier, type: img.type, alt: img.alt })),
      technologies: [],
    };
    try {
      const url = isEdit ? `/api/admin/projets/${projet!.id}` : '/api/admin/projets';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setError(data.erreur || 'Erreur lors de l\'enregistrement'); return; }
      setSuccess(publier ? 'Projet publié avec succès ! Google a été notifié.' : 'Brouillon enregistré.');
      if (!isEdit) router.push(`/admin/projets/${data.id}`);
      else router.refresh();
    } catch { setError('Erreur réseau.'); }
    finally { setLoading(false); }
  }

  function updateField(field: string, value: any) { setFormData((prev) => ({ ...prev, [field]: value })); }

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
        {/* Colonne Principale (Contenu & Médias) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Titre */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Titre du projet *</label>
              <span className="text-[10px] font-mono text-violet-400">01 / CORE</span>
            </div>
            <input 
              type="text" 
              value={formData.titre} 
              onChange={(e) => updateField('titre', e.target.value)} 
              required 
              className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all" 
              placeholder="Ex: KJA Studio Labs - Digital Flagship" 
            />
          </div>

          {/* Description courte */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Description courte</label>
              <span className="text-[10px] font-mono text-violet-400">02 / SUMMARY</span>
            </div>
            <textarea 
              value={formData.descriptionCourte} 
              onChange={(e) => updateField('descriptionCourte', e.target.value)} 
              rows={3} 
              className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm resize-none transition-all" 
              placeholder="Résumé percutant affiché sur la homepage et les vitrines..." 
            />
          </div>

          {/* Étude de cas complète */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Étude de cas complète</label>
              <span className="text-[10px] font-mono text-violet-400">03 / MARKDOWN EDITORIAL</span>
            </div>
            <textarea 
              value={formData.contenuComplet} 
              onChange={(e) => updateField('contenuComplet', e.target.value)} 
              rows={14} 
              className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-xs font-mono resize-none transition-all leading-relaxed" 
              placeholder="# Introduction&#10;Détails de l'architecture, UX design et performances..." 
            />
          </div>

          {/* Gestionnaire d'images */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-heading font-semibold text-white uppercase tracking-wider">Galerie & Visuels du projet</label>
              <span className="text-[10px] font-mono text-violet-400">04 / ASSETS</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              {images.map((img, index) => (
                <div key={img.id || index} className="relative group">
                  <img 
                    src={img.url} 
                    alt={img.alt || `Image ${index + 1}`} 
                    className={`w-20 h-20 object-cover rounded-2xl border-2 transition-all duration-300 ${
                      img.url === imagePrincipale 
                        ? 'border-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.5)] scale-105' 
                        : 'border-white/10 group-hover:border-white/30'
                    }`} 
                  />
                  <div className="absolute inset-0 bg-black/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-md">
                    <button type="button" onClick={() => setAsMain(img.url)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all" title="Définir comme image principale">
                      <svg className="w-3.5 h-3.5 text-violet-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </button>
                    <button type="button" onClick={() => removeImage(index)} className="p-1.5 bg-red-600/80 hover:bg-red-600 rounded-xl transition-all" title="Supprimer">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  {img.url === imagePrincipale && (
                    <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-[10px] font-mono rounded-full w-5 h-5 flex items-center justify-center shadow-lg border border-violet-400">★</span>
                  )}
                </div>
              ))}
            </div>

            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={handleUpload} className="hidden" />
            
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()} 
              disabled={uploading} 
              className="w-full py-5 border-2 border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-violet-400 hover:bg-white/[0.02] transition-all duration-300 disabled:opacity-50 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <span className="text-xs font-heading font-medium text-gray-300 group-hover:text-white transition-colors">
                {uploading ? 'Téléversement des actifs en cours...' : 'Ajouter des fichiers visuels (JPEG, PNG, WebP, AVIF)'}
              </span>
            </button>
          </div>
        </div>

        {/* Colonne Latérale (Publication, Catégorie, SEO) */}
        <div className="space-y-6">
          
          {/* Publication Action Box */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Publication</h3>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <input type="checkbox" checked={formData.estPublie} onChange={(e) => updateField('estPublie', e.target.checked)} className="w-4 h-4 rounded bg-white/5 border-white/20 text-violet-600 focus:ring-violet-500/20" />
                <span className="text-sm text-gray-200 font-medium">Publié en ligne</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <input type="checkbox" checked={formData.featured} onChange={(e) => updateField('featured', e.target.checked)} className="w-4 h-4 rounded bg-white/5 border-white/20 text-violet-600 focus:ring-violet-500/20" />
                <span className="text-sm text-gray-200 font-medium">Mettre en avant (Featured)</span>
              </label>
            </div>
            <div className="space-y-3">
              <button 
                type="button" 
                onClick={(e) => handleSubmit(e, true)} 
                disabled={loading || !formData.titre} 
                className="w-full py-3.5 bg-white text-gray-950 font-heading font-bold text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
              >
                {loading ? 'Enregistrement...' : 'Publier la création'}
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

          {/* Catégorie */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Catégorie studio</label>
            <select 
              value={formData.categorie} 
              onChange={(e) => updateField('categorie', e.target.value)} 
              className="w-full px-4 py-3 rounded-2xl bg-[#05020a] border border-white/10 text-white focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all cursor-pointer"
            >
              {categories.map((cat) => (<option key={cat.valeur} value={cat.valeur}>{cat.label}</option>))}
            </select>
          </div>

          {/* Client & Date */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Client</label>
              <input type="text" value={formData.client} onChange={(e) => updateField('client', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all" placeholder="Nom du client" />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Date de réalisation</label>
              <input type="date" value={formData.dateRealisation} onChange={(e) => updateField('dateRealisation', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>

          {/* Liens externes */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-4">
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Lien du projet (Live)</label>
              <input type="url" value={formData.lienProjet} onChange={(e) => updateField('lienProjet', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-mono text-xs" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Lien Figma</label>
              <input type="url" value={formData.lienFigma} onChange={(e) => updateField('lienFigma', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-mono text-xs" placeholder="https://figma.com/..." />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-white uppercase tracking-wider mb-2">Lien GitHub</label>
              <input type="url" value={formData.lienGithub} onChange={(e) => updateField('lienGithub', e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 outline-none text-sm transition-all font-mono text-xs" placeholder="https://github.com/..." />
            </div>
          </div>

          {/* Section SEO */}
          <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h3 className="font-heading font-semibold text-white text-sm">Référencement SEO</h3>
              <span className="text-[10px] font-mono text-emerald-400">Google Optimized</span>
            </div>
            <div>
              <label className="block text-xs font-light text-gray-400 mb-1.5">Meta Title</label>
              <input type="text" value={formData.metaTitle} onChange={(e) => updateField('metaTitle', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-xs transition-all" placeholder="Titre SEO (60-70 car.)" />
            </div>
            <div>
              <label className="block text-xs font-light text-gray-400 mb-1.5">Meta Description</label>
              <textarea value={formData.metaDescription} onChange={(e) => updateField('metaDescription', e.target.value)} rows={3} className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-xs resize-none transition-all" placeholder="Description SEO (150-160 car.)" />
            </div>
            <div>
              <label className="block text-xs font-light text-gray-400 mb-1.5">Mots-clés (séparés par des virgules)</label>
              <input type="text" value={formData.metaKeywords} onChange={(e) => updateField('metaKeywords', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none text-xs transition-all font-mono" placeholder="design, ui, ux, web..." />
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}