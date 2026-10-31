// src/app/portfolio/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Portfolio | Réalisations Design UI/UX & Développement',
  description: 'Découvrez nos projets d\'exception en Design UI/UX, Développement Fullstack et Solutions Connect. Études de cas détaillées.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | KJA Studio Labs',
    description: 'Nos réalisations en Design UI/UX et Développement Fullstack d\'élite.',
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

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-24 lg:pb-28 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">Portfolio</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Portfolio</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Découvrez nos projets et études de cas conçus avec exigence et créativité.
          </p>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg font-light">Aucun projet pour le moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projets.map((projet) => (
                <Link 
                  key={projet.id} 
                  href={`/portfolio/${projet.slug}`} 
                  className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 overflow-hidden group block flex flex-col justify-between"
                >
                  <div className="aspect-video bg-white/5 flex items-center justify-center overflow-hidden relative">
                    {projet.imagePrincipale ? (
                      <img 
                        src={projet.imagePrincipale} 
                        alt={projet.titre} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <span className="text-4xl text-gray-600">🖼️</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0616]/80 via-transparent to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-6 sm:p-7">
                    <span className="inline-block px-3 py-1 rounded-full bg-violet-600/25 text-violet-300 border border-violet-500/40 text-[10px] font-heading font-semibold uppercase tracking-wider mb-3">
                      {categoriesLabels[projet.categorie] || projet.categorie}
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                      {projet.titre}
                    </h3>
                    <p className="text-sm text-gray-400 font-light mt-2 line-clamp-2 leading-relaxed">
                      {projet.descriptionCourte}
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