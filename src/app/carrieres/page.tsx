// src/app/carrieres/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Carrières | Rejoignez KJA Studio Labs',
  description: 'Découvrez les offres d\'emploi chez KJA Studio Labs. Rejoignez notre équipe de designers, développeurs et experts digitaux d\'élite.',
  alternates: { canonical: '/carrieres' },
  openGraph: {
    title: 'Carrières | KJA Studio Labs',
    description: 'Rejoignez l\'équipe KJA Studio Labs et participez à l\'avenir du web.',
    url: `${siteConfig.url}/carrieres`,
  },
};

const contratsLabels: Record<string, string> = {
  CDI: 'CDI',
  CDD: 'CDD',
  FREELANCE: 'Freelance',
  STAGE: 'Stage',
  ALTERNANCE: 'Alternance',
};

export default async function CarrieresPage() {
  const offres = await prisma.jobPosting.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Carrières', item: `${siteConfig.url}/carrieres` }] }} />

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
            <span className="text-white font-medium">Carrières</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Nos offres de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">recrutement</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Rejoignez KJA Studio Labs et participez à la création de solutions digitales innovantes et d&apos;exception.
          </p>
        </div>
      </section>

      {/* Offres Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {offres.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white text-lg font-heading font-bold">Aucune offre pour le moment.</p>
              <p className="text-gray-400 text-sm font-light mt-2 max-w-sm mx-auto">Revenez bientôt ou suivez-nous sur LinkedIn pour ne rien manquer de nos opportunités.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {offres.map((offre) => (
                <Link 
                  key={offre.id} 
                  href={`/carrieres/${offre.slug}`} 
                  className="p-6 sm:p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 group block"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading font-bold text-xl text-white group-hover:text-violet-300 transition-colors">
                        {offre.titre}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-violet-600/25 text-violet-300 border border-violet-500/40 rounded-full uppercase tracking-wider">
                          {contratsLabels[offre.typeContrat]}
                        </span>
                        <span className="text-xs text-gray-400 font-light flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {offre.localisation}
                        </span>
                        {offre.salaire && <span className="text-xs text-gray-400 font-light">{offre.salaire}</span>}
                      </div>
                    </div>
                    <span className="text-violet-300 group-hover:text-white font-heading font-semibold text-sm shrink-0 inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all">
                      Voir l&apos;offre 
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
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