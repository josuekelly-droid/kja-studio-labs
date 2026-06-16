// src/app/carrieres/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Carrières',
  description: 'Découvrez les offres d\'emploi chez KJA Studio Labs. Rejoignez notre équipe de designers, développeurs et experts digitaux.',
  alternates: { canonical: '/carrieres' },
  openGraph: {
    title: 'Carrières | KJA Studio Labs',
    description: 'Rejoignez l\'équipe KJA Studio Labs.',
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

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" /><div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><span className="text-white font-medium">Carrières</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Carrières</h1>
          <p className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">Rejoignez KJA Studio Labs et participez à la création de solutions digitales innovantes.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {offres.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-gray-500 text-lg font-heading font-medium">Aucune offre pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Revenez bientôt ou suivez-nous sur LinkedIn pour ne rien manquer.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {offres.map((offre) => (
                <Link key={offre.id} href={`/carrieres/${offre.slug}`} className="card p-6 sm:p-8 group block hover:shadow-violet-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading font-bold text-xl text-gray-900 group-hover:text-violet transition-colors">{offre.titre}</h2>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-xs font-medium px-2.5 py-1 bg-violet-50 text-violet-700 rounded-full">{contratsLabels[offre.typeContrat]}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {offre.localisation}
                        </span>
                        {offre.salaire && <span className="text-xs text-gray-500">{offre.salaire}</span>}
                      </div>
                    </div>
                    <span className="text-violet font-heading font-semibold text-sm shrink-0 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Voir l&apos;offre <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
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