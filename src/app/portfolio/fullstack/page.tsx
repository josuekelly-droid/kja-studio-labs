// src/app/portfolio/fullstack/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projets Fullstack | Portfolio',
  description: 'Découvrez nos projets de Développement Fullstack par KJA Studio Labs. Applications web performantes, scalables et architectures modernes.',
  alternates: { canonical: '/portfolio/fullstack' },
  openGraph: {
    title: 'Projets Fullstack | KJA Studio Labs',
    description: 'Applications web performantes, scalables et architectures d\'élite.',
    url: `${siteConfig.url}/portfolio/fullstack`,
  },
};

export default async function PortfolioFullstackPage() {
  const projets = await prisma.projet.findMany({ 
    where: { estPublie: true, categorie: 'FULLSTACK' }, 
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.url}/portfolio` }, { '@type': 'ListItem', position: 3, name: 'Fullstack', item: `${siteConfig.url}/portfolio/fullstack` }] }} />
      
      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Fullstack</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // 03. FULLSTACK ARCHITECTURE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Développement <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Fullstack</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Applications web performantes, scalables et architectures d&apos;élite taillées pour la haute disponibilité.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          {projets.length === 0 ? (
            <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-200 text-sm font-medium">Aucun projet dans cette catégorie pour le moment.</p>
              <p className="text-xs text-gray-500 font-light mt-1">Nos réalisations Fullstack seront bientôt publiées ici.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projets.map((p) => (
                <Link 
                  key={p.id} 
                  href={`/portfolio/${p.slug}`} 
                  className="rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 overflow-hidden group flex flex-col justify-between"
                >
                  <div className="aspect-[16/11] bg-black/40 overflow-hidden relative">
                    {p.imagePrincipale ? (
                      <img 
                        src={p.imagePrincipale} 
                        alt={p.titre} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full bg-violet-950/20 flex items-center justify-center text-violet-400">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                        Découvrir l&apos;étude de cas →
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-mono font-semibold uppercase tracking-widest mb-3">
                      Fullstack Architecture
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-1 mb-2">
                      {p.titre}
                    </h3>
                    <p className="text-sm text-gray-400 font-light line-clamp-2 leading-relaxed">
                      {p.descriptionCourte}
                    </p>
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