// src/app/admin/avis/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { AvisActions } from './AvisActions';

export const metadata: Metadata = {
  title: 'Avis Clients - Admin Studio',
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
    <div className="relative space-y-8 pb-12">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* En-tête de page */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold">Testimonials & Client Proof</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">Avis Clients</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {avis.length} recommandations · <span className="text-emerald-400 font-medium">{approuves} approuvés</span> · <span className="text-amber-400 font-medium">{enAttente} en attente</span>
          </p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-emerald-500/30 p-5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="text-3xl font-heading font-black text-emerald-400 mb-1">{approuves}</div>
          <div className="text-xs text-emerald-300 font-light tracking-wide">Avis Approuvés & Visibles</div>
        </div>
        <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-amber-500/30 p-5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="text-3xl font-heading font-black text-amber-400 mb-1">{enAttente}</div>
          <div className="text-xs text-amber-300 font-light tracking-wide">Avis en Modération</div>
        </div>
      </div>

      {avis.length === 0 ? (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-amber-400/80">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <p className="text-gray-200 text-sm font-medium">Aucune évaluation enregistrée pour le moment.</p>
          <p className="text-xs text-gray-500 font-light mt-1">Les retours d&apos;expérience soumis par vos clients apparaîtront ici.</p>
        </div>
      ) : (
        <div className="relative z-10 space-y-4">
          {avis.map((a) => (
            <div
              key={a.id}
              className={`rounded-3xl border p-6 transition-all duration-300 bg-[#0c0616]/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${
                !a.estApprouve 
                  ? 'border-amber-500/40 bg-amber-500/[0.03] shadow-[0_0_30px_rgba(245,158,11,0.1)]' 
                  : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Avatar Client */}
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600/30 to-purple-600/10 border border-violet-500/30 text-violet-300 rounded-2xl flex items-center justify-center font-heading font-black text-base shrink-0 shadow-md">
                  {a.nomClient.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <p className="font-heading font-bold text-white text-base">{a.nomClient}</p>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full font-medium border ${
                        a.estApprouve 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                      }`}>
                        {a.estApprouve ? 'Approuvé' : 'En modération'}
                      </span>
                    </div>
                  </div>

                  {/* Étoiles */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < a.note 
                            ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]' 
                            : 'text-white/10'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Commentaire */}
                  <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-xl mb-3">
                    <p className="text-xs text-gray-200 font-light leading-relaxed italic">
                      &ldquo;{a.commentaire}&rdquo;
                    </p>
                  </div>

                  {/* Métadonnées Client & Projet */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-gray-400">
                    {(a.poste || a.entreprise) && (
                      <span className="text-gray-300 font-medium">
                        {a.poste}{a.poste && a.entreprise && ' chez '}{a.entreprise}
                      </span>
                    )}
                    {a.projet && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-violet-400">Projet : {a.projet.titre}</span>
                      </>
                    )}
                    <span className="text-gray-600">•</span>
                    <span>
                      {new Date(a.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
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