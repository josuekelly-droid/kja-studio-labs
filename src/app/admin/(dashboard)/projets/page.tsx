// src/app/admin/projets/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DeleteButton } from './DeleteButton';

export const metadata: Metadata = {
  title: 'Projets - Admin',
  robots: { index: false, follow: false },
};

const categoriesLabels: Record<string, string> = {
  UI_UX_DESIGN: 'UI/UX Design',
  FULLSTACK: 'Fullstack',
  CONNECT: 'Connect',
};

export default async function AdminProjetsPage() {
  const projets = await prisma.projet.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { images: { take: 1, where: { type: 'PRINCIPALE' } } },
  });

  const publies = projets.filter((p) => p.estPublie).length;
  const brouillons = projets.filter((p) => !p.estPublie).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Projets</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{projets.length} projets · {publies} publiés · {brouillons} brouillons</p>
        </div>
        <Link href="/admin/projets/nouveau" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-violet text-white font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-700 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nouveau projet
        </Link>
      </div>

      {projets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <p className="text-gray-500 text-sm">Aucun projet pour le moment.</p>
          <Link href="/admin/projets/nouveau" className="text-violet hover:underline text-xs mt-2 inline-block">Créer votre premier projet</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Projet</th>
                  <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                  <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projets.map((projet) => (
                  <tr key={projet.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {projet.imagePrincipale ? (
                          <img src={projet.imagePrincipale} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                        ) : projet.images[0] ? (
                          <img src={projet.images[0].url} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        <p className="text-xs font-medium text-gray-900 truncate max-w-[200px]">{projet.titre || 'Sans titre'}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs text-gray-500">{categoriesLabels[projet.categorie] || projet.categorie}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell whitespace-nowrap">{new Date(projet.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${projet.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${projet.estPublie ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {projet.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projets/${projet.id}`} className="text-xs text-violet hover:underline font-medium">Modifier</Link>
                        <DeleteButton projetId={projet.id} projetTitre={projet.titre} />
                      </div>
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