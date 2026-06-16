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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Articles</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{articles.length} articles · {publies} publiés · {brouillons} brouillons</p>
        </div>
        <Link
          href="/admin/blog/nouveau"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-violet text-white font-heading font-semibold text-xs sm:text-sm rounded-xl hover:bg-violet-700 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvel article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-500 text-sm">Aucun article pour le moment.</p>
          <Link href="/admin/blog/nouveau" className="text-violet hover:underline text-xs mt-2 inline-block">Écrire votre premier article</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Article</th>
                  <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                  <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {article.imagePrincipale ? (
                          <img src={article.imagePrincipale} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{article.titre || 'Sans titre'}</p>
                          <p className="text-xs text-gray-400">{article.tempsLecture} min de lecture</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-gray-500">{categoriesLabels[article.categorie] || article.categorie}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        article.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${article.estPublie ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {article.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/blog/${article.id}`} className="text-xs text-violet hover:underline font-medium">Modifier</Link>
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