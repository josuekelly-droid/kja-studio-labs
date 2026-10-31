// src/app/portfolio/ui-ux-design/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projets UI/UX Design | Portfolio',
  description: 'Découvrez nos projets de Design UI/UX par KJA Studio Labs. Interfaces d\'exception, wireframes, prototypes interactifs et design systems.',
  alternates: { canonical: '/portfolio/ui-ux-design' },
  openGraph: {
    title: 'Projets UI/UX Design | KJA Studio Labs',
    description: 'Interfaces modernes et expériences utilisateur pensées pour la conversion.',
    url: `${siteConfig.url}/portfolio/ui-ux-design`,
  },
};

export default async function PortfolioUIUXPage() {
  const projets = await prisma.projet.findMany({ 
    where: { estPublie: true, categorie: 'UI_UX_DESIGN' }, 
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.url}/portfolio` }, { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: `${siteConfig.url}/portfolio/ui-ux-design` }] }} />
      
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
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white font-medium">UI/UX Design</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            UI/UX <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Design</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Interfaces modernes et expériences utilisateur pensées pour captiver et convertir.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg font-light">Aucun projet dans cette catégorie pour le moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projets.map((p) => (
                <Link 
                  key={p.id} 
                  href={`/portfolio/${p.slug}`} 
                  className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 overflow-hidden group block flex flex-col justify-between"
                >
                  <div className="aspect-video bg-white/5 flex items-center justify-center overflow-hidden relative">
                    {p.imagePrincipale ? (
                      <img 
                        src={p.imagePrincipale} 
                        alt={p.titre} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <span className="text-4xl text-gray-600">🖼️</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0616]/80 via-transparent to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                      {p.titre}
                    </h3>
                    <p className="text-sm text-gray-400 font-light mt-2 line-clamp-2 leading-relaxed">
                      {p.descriptionCourte}
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