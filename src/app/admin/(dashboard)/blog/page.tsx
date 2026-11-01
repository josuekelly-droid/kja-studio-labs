// src/app/admin/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BlogDeleteButton } from './BlogDeleteButton';

export const metadata: Metadata = {
  title: 'Blog - Admin Studio',
  robots: { index: false, follow: false },
};

const categoriesLabels: Record<string, string> = {
  DESIGN: 'Design',
  DEVELOPPEMENT: 'Développement',
  SEO: 'SEO',
  BUSINESS: 'Business',
  TUTORIEL: 'Tutoriel',
  ACTUALITE: 'Actualité',
};

export default async function AdminBlogPage() {
  const articles = await prisma.blogArticle.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { author: { select: { name: true } } },
  });

  const publies = articles.filter((a) => a.estPublie).length;
  const brouillons = articles.filter((a) => !a.estPublie).length;

  return (
    <div className="relative space-y-8 pb-12">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* En-tête de page */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold">Editorial Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">Articles</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {articles.length} publications · <span className="text-emerald-400 font-medium">{publies} publiés</span> · <span className="text-gray-400 font-medium">{brouillons} brouillons</span>
          </p>
        </div>
        
        <Link 
          href="/admin/blog/nouveau" 
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-950 font-heading font-bold text-xs sm:text-sm rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouvel article</span>
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-gray-200 text-sm font-medium">Aucun article pour le moment.</p>
          <p className="text-xs text-gray-500 font-light mt-1">Commencez par rédiger votre première publication éditoriale.</p>
          <Link href="/admin/blog/nouveau" className="inline-flex items-center gap-1.5 text-xs text-violet-300 hover:text-white transition-colors mt-4 font-mono font-medium">
            <span>Écrire votre premier article</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Article</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        {article.imagePrincipale ? (
                          <img src={article.imagePrincipale} alt="" className="w-11 h-11 rounded-2xl object-cover shrink-0 border border-white/10 shadow-md" />
                        ) : (
                          <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors truncate max-w-xs">
                            {article.titre || 'Sans titre'}
                          </p>
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5">{article.tempsLecture || 3} min de lecture</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-[10px] text-blue-300 font-mono font-medium px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        {categoriesLabels[article.categorie] || article.categorie}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono font-light hidden md:table-cell whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-medium border ${
                        article.estPublie 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${article.estPublie ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                        {article.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/blog/${article.id}`} className="text-xs text-violet-300 hover:text-white transition-colors font-medium px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30">
                          Modifier
                        </Link>
                        <BlogDeleteButton articleId={article.id} articleTitre={article.titre} />
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