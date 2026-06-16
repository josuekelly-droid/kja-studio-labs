// src/app/admin/jobs/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { title: 'Offres d\'emploi - Admin', robots: { index: false, follow: false } };

const contratsLabels: Record<string, string> = {
  CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
};

export default async function AdminJobsPage() {
  const offres = await prisma.jobPosting.findMany({ orderBy: { updatedAt: 'desc' } });
  const publiees = offres.filter((o) => o.estPublie).length;
  const brouillons = offres.filter((o) => !o.estPublie).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Offres d&apos;emploi</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{offres.length} offres · {publiees} publiées · {brouillons} brouillons</p>
        </div>
        <Link href="/admin/jobs/nouveau" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-violet text-white font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-700 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nouvelle offre
        </Link>
      </div>

      {offres.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <p className="text-gray-500 text-sm">Aucune offre pour le moment.</p>
          <Link href="/admin/jobs/nouveau" className="text-violet hover:underline text-xs mt-2 inline-block">Publier votre première offre</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Offre</th>
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Contrat</th>
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offres.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-gray-900 truncate max-w-[250px]">{o.titre}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-gray-500">{contratsLabels[o.typeContrat]}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell whitespace-nowrap">
                    {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${o.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${o.estPublie ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {o.estPublie ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/jobs/${o.id}`} className="text-xs text-violet hover:underline font-medium">Modifier</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}