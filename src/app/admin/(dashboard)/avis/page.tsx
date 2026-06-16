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
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Avis clients</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{approuves} approuvés · {enAttente} en attente</p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-green-600">{approuves}</div>
          <div className="text-xs text-green-500 font-medium mt-0.5">Approuvés</div>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-yellow-600">{enAttente}</div>
          <div className="text-xs text-yellow-500 font-medium mt-0.5">En attente</div>
        </div>
      </div>

      {avis.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className="text-gray-500 text-sm">Aucun avis pour le moment.</p>
            <p className="text-xs text-gray-400">Les avis apparaîtront ici quand des clients en laisseront.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {avis.map((a) => (
            <div
              key={a.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all ${
                !a.estApprouve ? 'border-yellow-200 bg-yellow-50/20' : 'border-gray-100 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-9 h-9 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0">
                  {a.nomClient.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="font-heading font-semibold text-gray-900 text-sm">{a.nomClient}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.estApprouve ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {a.estApprouve ? 'Approuvé' : 'En attente'}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < a.note ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{a.commentaire}&rdquo;</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    {(a.poste || a.entreprise) && (
                      <span>{a.poste}{a.poste && a.entreprise && ' chez '}{a.entreprise}</span>
                    )}
                    {a.projet && <span>· Projet : {a.projet.titre}</span>}
                    <span>· {new Date(a.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                  </div>
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