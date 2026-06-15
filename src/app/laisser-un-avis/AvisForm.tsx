// src/app/laisser-un-avis/AvisForm.tsx
'use client';

import { useState } from 'react';

export function AvisForm() {
  const [formData, setFormData] = useState({
    nomClient: '',
    entreprise: '',
    poste: '',
    note: 5,
    commentaire: '',
  });

  const [hoverNote, setHoverNote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.commentaire || formData.commentaire.length < 10) {
      setError('Votre commentaire doit contenir au moins 10 caractères.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.erreur || 'Erreur lors de l\'envoi');
        return;
      }

      setSuccess(true);
      setFormData({ nomClient: '', entreprise: '', poste: '', note: 5, commentaire: '' });
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Merci pour votre avis !
        </h2>
        <p className="text-gray-600 mb-6">
          Votre avis a bien été envoyé. Il sera publié après validation par notre équipe.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn-primary text-sm px-6 py-2.5"
        >
          Laisser un autre avis
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {/* Note */}
      <div className="text-center">
        <label className="block text-sm font-heading font-semibold text-gray-700 mb-3">
          Votre note
        </label>
        <div className="flex items-center justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => updateField('note', star)}
              onMouseEnter={() => setHoverNote(star)}
              onMouseLeave={() => setHoverNote(0)}
              className="transition-transform hover:scale-110"
            >
              <svg
                className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  star <= (hoverNote || formData.note) ? 'text-yellow-400' : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {formData.note === 5 && 'Excellent !'}
          {formData.note === 4 && 'Très bien'}
          {formData.note === 3 && 'Bien'}
          {formData.note === 2 && 'Moyen'}
          {formData.note === 1 && 'Peut mieux faire'}
        </p>
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="nom" className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">
          Votre nom *
        </label>
        <input
          id="nom"
          type="text"
          value={formData.nomClient}
          onChange={(e) => updateField('nomClient', e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
          placeholder="Jean Dupont"
        />
      </div>

      {/* Entreprise + Poste */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="entreprise" className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">
            Entreprise
          </label>
          <input
            id="entreprise"
            type="text"
            value={formData.entreprise}
            onChange={(e) => updateField('entreprise', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
            placeholder="Nom de votre entreprise"
          />
        </div>
        <div>
          <label htmlFor="poste" className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">
            Poste
          </label>
          <input
            id="poste"
            type="text"
            value={formData.poste}
            onChange={(e) => updateField('poste', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm"
            placeholder="CEO, Designer..."
          />
        </div>
      </div>

      {/* Commentaire */}
      <div>
        <label htmlFor="commentaire" className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">
          Votre avis *
        </label>
        <textarea
          id="commentaire"
          value={formData.commentaire}
          onChange={(e) => updateField('commentaire', e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none"
          placeholder="Partagez votre expérience avec KJA Studio Labs... (minimum 10 caractères)"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {formData.commentaire.length} / 500 caractères minimum
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !formData.nomClient || formData.commentaire.length < 10}
        className="w-full py-3 bg-violet text-white font-heading font-semibold rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer mon avis'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Votre avis sera publié après validation par notre équipe.
      </p>
    </form>
  );
}