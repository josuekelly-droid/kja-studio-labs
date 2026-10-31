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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Projets</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {projets.length} projets · {publies} publiés · {brouillons} brouillons
          </p>
        </div>
        <Link 
          href="/admin/projets/nouveau" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouveau projet
        </Link>
      </div>

      {projets.length === 0 ? (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-300 text-sm font-medium">Aucun projet pour le moment.</p>
          <Link href="/admin/projets/nouveau" className="text-violet-300 hover:text-white transition-colors text-xs mt-2 inline-block font-medium">
            Créer votre premier projet →
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Projet</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projets.map((projet) => (
                  <tr key={projet.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        {projet.imagePrincipale ? (
                          <img src={projet.imagePrincipale} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/10" />
                        ) : projet.images[0] ? (
                          <img src={projet.images[0].url} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <p className="text-xs font-medium text-white truncate max-w-[220px]">{projet.titre || 'Sans titre'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-xs text-gray-300 font-light px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        {categoriesLabels[projet.categorie] || projet.categorie}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-light hidden md:table-cell whitespace-nowrap">
                      {new Date(projet.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${
                        projet.estPublie 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${projet.estPublie ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                        {projet.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/projets/${projet.id}`} className="text-xs text-violet-300 hover:text-white transition-colors font-medium">Modifier</Link>
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