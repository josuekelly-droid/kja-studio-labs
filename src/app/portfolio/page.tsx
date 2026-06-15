// src/app/portfolio/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Découvrez nos projets en Design UI/UX, Développement Fullstack et Solutions Connect. Études de cas détaillées.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | KJA Studio Labs',
    description: 'Nos réalisations en Design UI/UX et Développement.',
    url: `${siteConfig.url}/portfolio`,
  },
};

const categoriesLabels: Record<string, string> = {
  UI_UX_DESIGN: 'UI/UX Design',
  FULLSTACK: 'Fullstack',
  CONNECT: 'Connect',
};

export default async function PortfolioPage() {
  const projets = await prisma.projet.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Portfolio KJA Studio Labs', url: `${siteConfig.url}/portfolio` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.url}/portfolio` }] }} />

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true"><div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><a href="/" className="hover:text-white transition-colors">Accueil</a><span>/</span><span className="text-white font-medium">Portfolio</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Portfolio</h1>
          <p className="text-base sm:text-lg text-violet-200 max-w-xl mx-auto">Découvrez nos projets et études de cas</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projets.length === 0 ? (
            <div className="text-center py-12"><p className="text-gray-500 text-lg">Aucun projet pour le moment.</p></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {projets.map((projet) => (
                <Link key={projet.id} href={`/portfolio/${projet.slug}`} className="card overflow-hidden group block">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    {projet.imagePrincipale ? <img src={projet.imagePrincipale} alt={projet.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <span className="text-4xl text-gray-300">🖼️</span>}
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6">
                    <span className="text-xs font-heading font-semibold text-violet uppercase tracking-wider">{categoriesLabels[projet.categorie] || projet.categorie}</span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 mt-1.5 group-hover:text-violet transition-colors line-clamp-1">{projet.titre}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{projet.descriptionCourte}</p>
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