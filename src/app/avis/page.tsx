// src/app/avis/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Avis clients | Témoignages & Notes Vérifiées',
  description: 'Découvrez ce que nos clients disent de KJA Studio Labs. Avis vérifiés sur nos prestations en Design UI/UX, Développement Fullstack et Connect.',
  alternates: { canonical: '/avis' },
  openGraph: {
    title: 'Avis clients | KJA Studio Labs',
    description: 'Ce que nos clients disent de nous et de nos réalisations d\'élite.',
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

  const moyenne = avis.length > 0
    ? (avis.reduce((acc, a) => acc + a.note, 0) / avis.length).toFixed(1)
    : '0';

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'KJA Studio Labs',
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
            <span className="text-white font-medium">Avis clients</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Ils nous font <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">confiance</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Découvrez les retours authentiques de nos partenaires sur notre exigence et notre savoir-faire.
          </p>

          {avis.length > 0 && (
            <div className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-3xl font-heading font-bold text-white">{moyenne}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(Number(moyenne)) ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm font-light">({avis.length} avis vérifiés)</span>
            </div>
          )}
        </div>
      </section>

      {/* Avis Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {avis.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <p className="text-white text-lg font-heading font-bold">Aucun avis pour le moment.</p>
              <p className="text-gray-400 text-sm font-light mt-2">Soyez le premier à partager votre expérience avec nous !</p>
            </div>
          ) : (
            <div className="space-y-6">
              {avis.map((a) => (
                <div 
                  key={a.id} 
                  className="p-6 sm:p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center gap-1.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < a.note ? 'text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.3)]' : 'text-white/15'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6 italic">
                    &ldquo;{a.commentaire}&rdquo;
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="font-heading font-bold text-white text-base">{a.nomClient}</p>
                      {(a.poste || a.entreprise) && (
                        <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
                          {a.poste}{a.poste && a.entreprise && ' chez '}{a.entreprise}
                        </p>
                      )}
                    </div>
                    {a.projet && (
                      <Link 
                        href={`/portfolio/${a.projet.slug}`} 
                        className="text-xs font-medium text-violet-300 hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        Voir le projet associé →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-28 lg:py-36 bg-[#05020a] relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-6">
            Vous avez collaboré avec nous ?
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Partagez votre expérience et aidez notre communauté à grandir.
          </p>
          <Link 
            href="/laisser-un-avis" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 font-heading font-bold text-sm sm:text-base rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Laisser un avis
          </Link>
        </div>
      </section>
    </>
  );
}