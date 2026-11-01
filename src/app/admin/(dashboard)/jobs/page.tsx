// src/app/admin/jobs/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { 
  title: 'Offres d\'emploi - Admin Studio', 
  robots: { index: false, follow: false } 
};

const contratsLabels: Record<string, string> = {
  CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
};

export default async function AdminJobsPage() {
  const offres = await prisma.jobPosting.findMany({ orderBy: { updatedAt: 'desc' } });
  const publiees = offres.filter((o) => o.estPublie).length;
  const brouillons = offres.filter((o) => !o.estPublie).length;

  return (
    <div className="relative space-y-8 pb-12">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* En-tête de page */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold">Recruitment & Careers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">Offres d&apos;emploi</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {offres.length} postes · <span className="text-emerald-400 font-medium">{publiees} publiées</span> · <span className="text-gray-400 font-medium">{brouillons} brouillons</span>
          </p>
        </div>
        
        <Link 
          href="/admin/jobs/nouveau" 
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-950 font-heading font-bold text-xs sm:text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouvelle offre</span>
        </Link>
      </div>

      {offres.length === 0 ? (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-200 text-sm font-medium">Aucune offre pour le moment.</p>
          <p className="text-xs text-gray-500 font-light mt-1">Commencez par publier votre premier poste au sein du studio.</p>
          <Link href="/admin/jobs/nouveau" className="inline-flex items-center gap-1.5 text-xs text-violet-300 hover:text-white transition-colors mt-4 font-mono font-medium">
            <span>Publier votre première offre</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Offre</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Contrat</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {offres.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors truncate max-w-[280px]">
                        {o.titre}
                      </p>
                      {o.localisation && (
                        <p className="text-[10px] text-gray-500 font-mono mt-0.5">{o.localisation}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-[10px] text-purple-300 font-mono font-medium px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                        {contratsLabels[o.typeContrat] || o.typeContrat}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono font-light hidden md:table-cell whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-medium border ${
                        o.estPublie 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${o.estPublie ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                        {o.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/jobs/${o.id}`} className="inline-block text-xs text-violet-300 hover:text-white transition-colors font-medium px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30">
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}