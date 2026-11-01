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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Carrières', item: `${siteConfig.url}/carrieres` }] }} />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Carrières</span>
          </nav>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // TALENT & OPPORTUNITIES
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Nos offres de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">recrutement</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Rejoignez KJA Studio Labs et participez à la création de solutions digitales d&apos;exception.
          </p>
        </div>
      </section>

      {/* Offres Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          {offres.length === 0 ? (
            <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-violet-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-200 text-sm font-medium">Aucune offre publiée pour le moment.</p>
              <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">Revenez bientôt ou contactez-nous directement pour une candidature spontanée.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {offres.map((offre) => (
                <Link 
                  key={offre.id} 
                  href={`/carrieres/${offre.slug}`} 
                  className="p-8 sm:p-10 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 group block"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <h2 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-violet-300 transition-colors">
                        {offre.titre}
                      </h2>
                      
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                        <span className="px-3.5 py-1 bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded-full font-semibold uppercase tracking-widest text-[10px]">
                          {contratsLabels[offre.typeContrat] || offre.typeContrat}
                        </span>
                        
                        <span className="text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px]">
                          📍 {offre.localisation}
                        </span>
                        
                        {offre.salaire && (
                          <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px]">
                            💰 {offre.salaire}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-0">
                      <span className="text-xs font-mono uppercase tracking-widest text-violet-300 group-hover:text-white shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/15 group-hover:bg-violet-600 group-hover:border-violet-500 transition-all">
                        <span>Voir l&apos;offre</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
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