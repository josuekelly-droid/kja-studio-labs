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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Avis clients</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // REPUTATION & VERIFIED REVIEWS
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Ils nous font <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">confiance</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Découvrez les retours authentiques de nos partenaires sur notre exigence technique et notre direction artistique.
          </p>

          {avis.length > 0 && (
            <div className="inline-flex items-center gap-4 mt-6 px-6 py-3.5 rounded-2xl bg-[#0c0616]/80 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <span className="text-3xl font-heading font-black text-white">{moyenne}</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(Number(moyenne)) ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-white/15'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-xs font-mono">({avis.length} avis vérifiés)</span>
            </div>
          )}
        </div>
      </section>

      {/* Avis Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          {avis.length === 0 ? (
            <div className="text-center py-20 p-12 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-white text-lg font-heading font-bold">Aucun avis répertorié pour le moment.</p>
              <p className="text-gray-400 text-xs font-light mt-1">Soyez le premier à partager votre expérience avec le studio !</p>
            </div>
          ) : (
            <div className="space-y-6">
              {avis.map((a) => (
                <div 
                  key={a.id} 
                  className="p-8 sm:p-10 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-1.5 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < a.note ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 mb-8">
                    <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed italic">
                      &ldquo;{a.commentaire}&rdquo;
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-600/10 border border-violet-500/30 flex items-center justify-center font-heading font-black text-violet-300 shadow-md">
                        {a.nomClient.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-base">{a.nomClient}</p>
                        {(a.poste || a.entreprise) && (
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                            {a.poste}{a.poste && a.entreprise && ' • '}{a.entreprise}
                          </p>
                        )}
                      </div>
                    </div>
                    {a.projet && (
                      <Link 
                        href={`/portfolio/${a.projet.slug}`} 
                        className="text-xs font-mono text-violet-300 hover:text-white transition-colors inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30"
                      >
                        <span>Étude de cas associée</span>
                        <span>→</span>
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
      <section className="py-24 sm:py-28 lg:py-36 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Vous avez collaboré avec nous ?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Partagez votre expérience et contribuez au rayonnement du studio.
          </p>
          <div className="pt-2">
            <Link 
              href="/laisser-un-avis" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 font-heading font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Laisser un avis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}