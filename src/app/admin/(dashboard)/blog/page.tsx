// src/app/admin/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BlogDeleteButton } from './BlogDeleteButton';

export const metadata: Metadata = {
  title: 'Blog - Admin',
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Articles</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {articles.length} articles · {publies} publiés · {brouillons} brouillons
          </p>
        </div>
        <Link
          href="/admin/blog/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-950 font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvel article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-300 text-sm font-medium">Aucun article pour le moment.</p>
          <Link href="/admin/blog/nouveau" className="text-violet-300 hover:text-white transition-colors text-xs mt-2 inline-block font-medium">
            Écrire votre premier article →
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Article</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        {article.imagePrincipale ? (
                          <img src={article.imagePrincipale} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white truncate max-w-xs">{article.titre || 'Sans titre'}</p>
                          <p className="text-xs text-gray-400 font-light mt-0.5">{article.tempsLecture} min de lecture</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-xs text-gray-300 font-light px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        {categoriesLabels[article.categorie] || article.categorie}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-light hidden md:table-cell whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${
                        article.estPublie 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${article.estPublie ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                        {article.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/blog/${article.id}`} className="text-xs text-violet-300 hover:text-white transition-colors font-medium">Modifier</Link>
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