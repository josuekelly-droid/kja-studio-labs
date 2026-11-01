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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // KJA INSIGHTS & EDITORIAL
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Blog</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Conseils, réflexions et tutoriels d&apos;élite sur le design UI/UX, l&apos;ingénierie fullstack et l&apos;excellence SEO.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-violet-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-200 text-sm font-medium">Aucun article pour le moment.</p>
              <p className="text-xs text-gray-500 font-light mt-1">Revenez bientôt pour découvrir nos prochaines publications.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/blog/${article.slug}`} 
                  className="rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 overflow-hidden group flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-black/40 overflow-hidden relative">
                    {article.imagePrincipale ? (
                      <img 
                        src={article.imagePrincipale} 
                        alt={article.titre} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full bg-violet-950/20 flex items-center justify-center text-violet-400">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-[10px] font-mono text-violet-300 uppercase tracking-widest font-semibold px-3.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
                          {categoriesLabels[article.categorie] || article.categorie}
                        </span>
                        {article.tempsLecture && (
                          <span className="text-[10px] font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                            {article.tempsLecture} min
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-heading font-bold text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-2 mb-3">
                        {article.titre}
                      </h3>
                      
                      <p className="text-sm text-gray-400 font-light line-clamp-2 leading-relaxed mb-6">
                        {article.extrait}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
                      <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
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
    </div>
  );
}