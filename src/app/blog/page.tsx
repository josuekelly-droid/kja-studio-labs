// src/app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Actualités, Tutoriels & Insights',
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

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Blog</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Conseils, tutoriels et actualités sur le design d&apos;élite, l&apos;ingénierie fullstack et l&apos;excellence SEO.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <p className="text-white text-lg font-heading font-bold">Aucun article pour le moment.</p>
              <p className="text-gray-400 text-sm font-light mt-2">Revenez bientôt pour découvrir nos prochaines publications.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/blog/${article.slug}`} 
                  className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 overflow-hidden group block flex flex-col justify-between"
                >
                  <div className="aspect-video bg-white/5 flex items-center justify-center overflow-hidden relative">
                    {article.imagePrincipale ? (
                      <img 
                        src={article.imagePrincipale} 
                        alt={article.titre} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <span className="text-4xl text-gray-600">📝</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0616]/80 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-xs font-heading font-semibold text-violet-300 uppercase tracking-wider px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full">
                          {categoriesLabels[article.categorie] || article.categorie}
                        </span>
                        <span className="text-xs text-gray-400 font-light">{article.tempsLecture} min de lecture</span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                        {article.titre}
                      </h3>
                      
                      <p className="text-sm text-gray-400 font-light mt-3 line-clamp-2 leading-relaxed">
                        {article.extrait}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-500 font-light">
                      <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-violet-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                        Lire l&apos;article →
                      </span>
                    </div>
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