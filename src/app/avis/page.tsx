// src/app/avis/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Avis clients',
  description: 'Découvrez ce que nos clients disent de KJA Studio Labs. Avis vérifiés sur nos prestations en Design UI/UX, Développement Fullstack et Connect.',
  alternates: { canonical: '/avis' },
  openGraph: {
    title: 'Avis clients | KJA Studio Labs',
    description: 'Ce que nos clients disent de nous.',
    url: `${siteConfig.url}/avis`,
  },
};

export default async function AvisPage() {
  const avis = await prisma.avis.findMany({
    where: { estApprouve: true, estAffiché: true },
    orderBy: { createdAt: 'desc' },
    include: {
      projet: { select: { slug: true, titre: true } },
    },
  });

  // Calculer la moyenne
  const moyenne = avis.length > 0
    ? (avis.reduce((acc, a) => acc + a.note, 0) / avis.length).toFixed(1)
    : '0';

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Avis clients KJA Studio Labs',
          url: `${siteConfig.url}/avis`,
          aggregateRating: avis.length > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: moyenne,
            reviewCount: avis.length,
            bestRating: '5',
            worstRating: '1',
          } : undefined,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Avis clients', item: `${siteConfig.url}/avis` },
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
            <span className="text-white font-medium">Avis clients</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">
            Ils nous font confiance
          </h1>
          <p className="text-base sm:text-lg text-violet-200 max-w-xl mx-auto">
            Ce que nos clients disent de notre travail
          </p>
          {avis.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="text-3xl font-heading font-bold text-white">{moyenne}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(Number(moyenne)) ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-violet-200 text-sm">({avis.length} avis)</span>
            </div>
          )}
        </div>
      </section>

      {/* Liste des avis */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {avis.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun avis pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Les avis de nos clients apparaîtront ici.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {avis.map((a) => (
                <div key={a.id} className="card p-5 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < a.note ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 italic">
                    &ldquo;{a.commentaire}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-gray-900 text-sm sm:text-base">{a.nomClient}</p>
                      {(a.poste || a.entreprise) && (
                        <p className="text-xs sm:text-sm text-gray-500">
                          {a.poste}{a.poste && a.entreprise && ' chez '}{a.entreprise}
                        </p>
                      )}
                    </div>
                    {a.projet && (
                      <Link href={`/portfolio/${a.projet.slug}`} className="text-xs text-violet hover:underline">
                        Voir le projet
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 left-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-300 rounded-full blur-[100px] sm:blur-[150px] -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Vous avez travaillé avec nous ?
          </h2>
          <p className="text-base sm:text-lg text-violet-200 mb-8">
            Partagez votre expérience et aidez-nous à nous améliorer.
          </p>
          <Link href="/laisser-un-avis" className="btn-primary !bg-white !text-violet hover:!bg-violet-50 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
            Laisser un avis
          </Link>
        </div>
      </section>
    </>
  );
}