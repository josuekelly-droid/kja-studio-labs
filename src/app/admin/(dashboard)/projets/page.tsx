// src/app/admin/projets/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DeleteButton } from './DeleteButton';

export const metadata: Metadata = {
  title: 'Projets - Admin Studio',
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
    <div className="relative space-y-8 pb-12">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* En-tête de page */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold">Showcase Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">Projets</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {projets.length} créations · <span className="text-emerald-400 font-medium">{publies} publiés</span> · <span className="text-gray-400 font-medium">{brouillons} brouillons</span>
          </p>
        </div>
        
        <Link 
          href="/admin/projets/nouveau" 
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-950 font-heading font-bold text-xs sm:text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau projet</span>
        </Link>
      </div>

      {projets.length === 0 ? (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-200 text-sm font-medium">Aucun projet pour le moment.</p>
          <p className="text-xs text-gray-500 font-light mt-1">Commencez par concevoir votre première étude de cas.</p>
          <Link href="/admin/projets/nouveau" className="inline-flex items-center gap-1.5 text-xs text-violet-300 hover:text-white transition-colors mt-4 font-mono font-medium">
            <span>Créer votre premier projet</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Projet</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projets.map((projet) => (
                  <tr key={projet.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        {projet.imagePrincipale ? (
                          <img src={projet.imagePrincipale} alt="" className="w-11 h-11 rounded-2xl object-cover shrink-0 border border-white/10 shadow-md" />
                        ) : projet.images[0] ? (
                          <img src={projet.images[0].url} alt="" className="w-11 h-11 rounded-2xl object-cover shrink-0 border border-white/10 shadow-md" />
                        ) : (
                          <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors truncate max-w-[220px]">
                            {projet.titre || 'Sans titre'}
                          </p>
                          {projet.client && (
                            <p className="text-[10px] text-gray-500 font-light mt-0.5">{projet.client}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-[10px] text-violet-300 font-mono font-medium px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
                        {categoriesLabels[projet.categorie] || projet.categorie}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono font-light hidden md:table-cell whitespace-nowrap">
                      {new Date(projet.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-medium border ${
                        projet.estPublie 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${projet.estPublie ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                        {projet.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/projets/${projet.id}`} className="text-xs text-violet-300 hover:text-white transition-colors font-medium px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30">
                          Modifier
                        </Link>
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