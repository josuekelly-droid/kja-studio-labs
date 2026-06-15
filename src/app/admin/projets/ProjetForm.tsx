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

  const [images, setImages] = useState<Image[]>(projet?.images || []);
  const [imagePrincipale, setImagePrincipale] = useState(projet?.imagePrincipale || '');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Upload d'image
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append('fichier', file);
      form.append('dossier', 'projets');
      form.append('type', images.length === 0 && !imagePrincipale ? 'PRINCIPALE' : 'GALERIE');
      if (projet?.id) {
        form.append('projetId', projet.id);
      }

      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        const data = await res.json();

        if (data.succes) {
          const nouvelleImage = { url: data.url, nomFichier: data.nomFichier, type: 'GALERIE' };
          setImages((prev) => [...prev, nouvelleImage]);

          // Première image = image principale
          if (!imagePrincipale && images.length === 0) {
            setImagePrincipale(data.url);
          }
        } else {
          setError(data.erreur || 'Erreur upload');
        }
      } catch {
        setError('Erreur réseau lors de l\'upload');
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // Supprimer une image
  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (images[index]?.url === imagePrincipale) {
      setImagePrincipale(images[0]?.url || '');
    }
  }

  // Définir comme image principale
  function setAsMain(url: string) {
    setImagePrincipale(url);
  }

  // Soumettre le formulaire
  async function handleSubmit(e: React.FormEvent, publier: boolean) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      ...formData,
      metaKeywords: formData.metaKeywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
      estPublie: publier,
      imagePrincipale,
      images,
      technologies: [], // À gérer plus tard
    };

    try {
      const url = isEdit ? `/api/admin/projets/${projet!.id}` : '/api/admin/projets';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.erreur || 'Erreur lors de l\'enregistrement');
        return;
      }

      setSuccess(publier ? 'Projet publié avec succès ! Google a été notifié.' : 'Brouillon enregistré.');

      if (!isEdit) {
        router.push(`/admin/projets/${data.id}`);
      } else {
        router.refresh();
      }

    } catch {
      setError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {/* Messages */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 text-sm p-4 rounded-xl border border-green-100">{success}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titre */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
              Titre du projet *
            </label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => updateField('titre', e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
              placeholder="Nom du projet"
            />
          </div>

          {/* Description courte */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
              Description courte
            </label>
            <textarea
              value={formData.descriptionCourte}
              onChange={(e) => updateField('descriptionCourte', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none"
              placeholder="Résumé du projet (affiché sur la homepage)"
            />
          </div>

          {/* Contenu complet (Étude de cas) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
              Étude de cas complète (MDX)
            </label>
            <textarea
              value={formData.contenuComplet}
              onChange={(e) => updateField('contenuComplet', e.target.value)}
              rows={15}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm font-mono resize-none"
              placeholder="Contenu riche en Markdown/MDX..."
            />
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
              Images du projet
            </label>
            <div className="flex flex-wrap gap-3 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={img.alt || `Image ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-xl border-2 ${
                      img.url === imagePrincipale ? 'border-violet' : 'border-gray-200'
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => setAsMain(img.url)}
                      className="p-1 bg-white rounded-lg text-xs"
                      title="Image principale"
                    >
                      ⭐
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1 bg-red-500 text-white rounded-lg text-xs"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                  {img.url === imagePrincipale && (
                    <span className="absolute -top-1 -right-1 bg-violet text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      ★
                    </span>
                  )}
                </div>
              ))}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-violet-300 hover:text-violet transition-all disabled:opacity-50"
            >
              {uploading ? 'Upload en cours...' : '+ Ajouter des images'}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Publication</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.estPublie}
                  onChange={(e) => updateField('estPublie', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                />
                <span className="text-sm text-gray-700">Publié</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"
                />
                <span className="text-sm text-gray-700">Mis en avant</span>
              </label>
            </div>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading || !formData.titre}
                className="w-full py-2.5 bg-violet text-white font-heading font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Enregistrement...' : 'Publier'}
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading || !formData.titre}
                className="w-full py-2.5 border border-gray-200 text-gray-700 font-heading font-semibold text-sm rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Enregistrer comme brouillon
              </button>
            </div>
          </div>

          {/* Catégorie */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              value={formData.categorie}
              onChange={(e) => updateField('categorie', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.valeur} value={cat.valeur}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Client & Date */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                Client
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => updateField('client', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
                placeholder="Nom du client"
              />
            </div>
            <div>
              <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                Date de réalisation
              </label>
              <input
                type="date"
                value={formData.dateRealisation}
                onChange={(e) => updateField('dateRealisation', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
              />
            </div>
          </div>

          {/* Liens */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                Lien du projet
              </label>
              <input
                type="url"
                value={formData.lienProjet}
                onChange={(e) => updateField('lienProjet', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                Lien Figma
              </label>
              <input
                type="url"
                value={formData.lienFigma}
                onChange={(e) => updateField('lienFigma', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
                placeholder="https://figma.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">
                Lien GitHub
              </label>
              <input
                type="url"
                value={formData.lienGithub}
                onChange={(e) => updateField('lienGithub', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
            <h3 className="font-heading font-semibold text-gray-900">SEO</h3>
            <div>
              <label className="block text-xs font-heading font-medium text-gray-500 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => updateField('metaTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-xs"
                placeholder="Titre SEO (60-70 caractères)"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-medium text-gray-500 mb-1">
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-xs resize-none"
                placeholder="Description SEO (150-160 caractères)"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-medium text-gray-500 mb-1">
                Mots-clés (séparés par des virgules)
              </label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => updateField('metaKeywords', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-xs"
                placeholder="design, ui, ux, web..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}