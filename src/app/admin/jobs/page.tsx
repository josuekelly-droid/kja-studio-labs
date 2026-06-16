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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Offres d&apos;emploi ({offres.length})</h1>
        <Link href="/admin/jobs/nouveau" className="px-4 sm:px-6 py-2.5 bg-violet text-white font-heading font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all">+ Nouvelle offre</Link>
      </div>
      {offres.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">Aucune offre pour le moment.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100"><th className="text-left px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">Offre</th><th className="text-left px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase hidden sm:table-cell">Contrat</th><th className="text-center px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">Statut</th><th className="text-right px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody>
              {offres.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3"><span className="font-medium text-sm text-gray-900">{o.titre}</span></td>
                  <td className="px-4 sm:px-6 py-3 hidden sm:table-cell"><span className="text-xs text-gray-500">{contratsLabels[o.typeContrat]}</span></td>
                  <td className="px-4 sm:px-6 py-3 text-center"><span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${o.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{o.estPublie ? 'Publié' : 'Brouillon'}</span></td>
                  <td className="px-4 sm:px-6 py-3 text-right"><Link href={`/admin/jobs/${o.id}`} className="text-sm text-violet hover:underline font-medium">Modifier</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}