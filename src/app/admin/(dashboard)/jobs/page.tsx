// src/app/admin/jobs/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { 
  title: 'Offres d\'emploi - Admin', 
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Offres d&apos;emploi</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {offres.length} offres · {publiees} publiées · {brouillons} brouillons
          </p>
        </div>
        <Link 
          href="/admin/jobs/nouveau" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle offre
        </Link>
      </div>

      {offres.length === 0 ? (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-300 text-sm font-medium">Aucune offre pour le moment.</p>
          <Link href="/admin/jobs/nouveau" className="text-violet-300 hover:text-white transition-colors text-xs mt-2 inline-block font-medium">
            Publier votre première offre →
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Offre</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Contrat</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {offres.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-white truncate max-w-[280px]">{o.titre}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-xs text-gray-300 font-light px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        {contratsLabels[o.typeContrat]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-light hidden md:table-cell whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${
                        o.estPublie 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${o.estPublie ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                        {o.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/jobs/${o.id}`} className="text-xs text-violet-300 hover:text-white transition-colors font-medium">Modifier</Link>
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