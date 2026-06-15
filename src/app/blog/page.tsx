// src/app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conseils, tutoriels et actualités sur le design UI/UX, le développement web et le SEO par KJA Studio Labs.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | KJA Studio Labs',
    description: 'Articles sur le design, le développement et le SEO.',
    url: `${siteConfig.url}/blog`,
  },
};

const categoriesLabels: Record<string, string> = {
  DESIGN: 'Design',
  DEVELOPPEMENT: 'Développement',
  SEO: 'SEO',
  BUSINESS: 'Business',
  TUTORIEL: 'Tutoriel',
  ACTUALITE: 'Actualité',
};

export default async function BlogPage() {
  const articles = await prisma.blogArticle.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog KJA Studio Labs',
          url: `${siteConfig.url}/blog`,
          description: 'Articles sur le design, le développement et le SEO',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
          ],
        }}
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Blog</h1>
          <p className="text-base sm:text-lg text-violet-200 max-w-xl mx-auto">
            Conseils, tutoriels et actualités sur le design, le développement et le SEO
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun article pour le moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {articles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="card overflow-hidden group block">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    {article.imagePrincipale ? (
                      <img src={article.imagePrincipale} alt={article.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl text-gray-300">📝</span>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-heading font-semibold text-violet uppercase tracking-wider">
                        {categoriesLabels[article.categorie] || article.categorie}
                      </span>
                      <span className="text-xs text-gray-400">{article.tempsLecture} min</span>
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 group-hover:text-violet transition-colors line-clamp-2">
                      {article.titre}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.extrait}</p>
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}