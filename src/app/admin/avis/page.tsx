// src/app/admin/avis/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { AvisActions } from './AvisActions';

export const metadata: Metadata = {
  title: 'Avis - Admin',
  robots: { index: false, follow: false },
};

export default async function AdminAvisPage() {
  const avis = await prisma.avis.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      projet: { select: { titre: true } },
    },
  });

  const enAttente = avis.filter((a) => !a.estApprouve).length;
  const approuves = avis.filter((a) => a.estApprouve).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
            Avis clients
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {approuves} approuvés · {enAttente} en attente
          </p>
        </div>
      </div>

      {avis.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">Aucun avis pour le moment.</p>
          <p className="text-gray-400 text-sm mt-2">Les avis apparaîtront ici quand des clients en laisseront.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {avis.map((a) => (
            <div key={a.id} className={`bg-white rounded-2xl border p-5 sm:p-6 ${!a.estApprouve ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.estApprouve ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {a.estApprouve ? 'Approuvé' : 'En attente'}
                    </span>
                    {a.projet && (
                      <span className="text-xs text-gray-400">
                        Projet : {a.projet.titre}
                      </span>
                    )}
                  </div>

                  {/* Étoiles */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < a.note ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-3 italic">
                    &ldquo;{a.commentaire}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <p className="font-heading font-semibold text-gray-900 text-sm">{a.nomClient}</p>
                    {(a.poste || a.entreprise) && (
                      <p className="text-xs text-gray-500">
                        {a.poste}{a.poste && a.entreprise && ' chez '}{a.entreprise}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(a.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <AvisActions avisId={a.id} estApprouve={a.estApprouve} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}