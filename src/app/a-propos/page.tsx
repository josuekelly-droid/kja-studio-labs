// src/app/a-propos/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez KJA Studio Labs, studio créatif francophone spécialisé en Design UI/UX, Développement Web Fullstack et Solutions Connect. Notre histoire, nos valeurs, notre vision.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'À propos | KJA Studio Labs',
    description: 'Découvrez l\'histoire et les valeurs de KJA Studio Labs.',
    url: `${siteConfig.url}/a-propos`,
  },
};

const valeurs = [
  {
    titre: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque projet, du design à la dernière ligne de code.',
    icone: '✨',
  },
  {
    titre: 'Proximité',
    description: 'Une relation de confiance avec nos clients, basée sur l\'écoute et la transparence.',
    icone: '🤝',
  },
  {
    titre: 'Innovation',
    description: 'Veille technologique constante pour vous proposer les meilleures solutions du marché.',
    icone: '🚀',
  },
  {
    titre: 'Performance',
    description: 'Des solutions optimisées pour le SEO, la vitesse et l\'expérience utilisateur.',
    icone: '📈',
  },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'À propos de KJA Studio Labs',
          description: 'Découvrez KJA Studio Labs, studio créatif francophone.',
          url: `${siteConfig.url}/a-propos`,
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'À propos', item: `${siteConfig.url}/a-propos` },
          ],
        }}
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 sm:mb-6">
            À propos de KJA Studio
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">
            Studio créatif francophone, nous concevons des solutions digitales sur mesure pour nos clients à travers le monde.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-3">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-4">
                Notre histoire
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4 sm:mb-6">
                De la passion à l&apos;expertise
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondé par <strong>Kelly Josué AKPLOGAN</strong>, KJA Studio Labs est né d&apos;une passion pour le design 
                  et le développement web. Après plusieurs années d&apos;expérience dans la création de solutions digitales, 
                  l&apos;idée de proposer un service complet alliant design, développement et connectivité s&apos;est imposée.
                </p>
                <p>
                  Aujourd&apos;hui, KJA Studio Labs accompagne des startups, PME et entrepreneurs dans la création 
                  de leur présence digitale, avec une approche centrée sur la performance, le SEO et l&apos;expérience utilisateur.
                </p>
                <p>
                  Notre mission : rendre le digital accessible et performant pour tous les acteurs francophones, 
                  en France, en Belgique, en Suisse, au Canada et en Afrique.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-violet-100 rounded-full flex items-center justify-center">
                <span className="text-6xl sm:text-7xl">💜</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 sm:py-20 lg:py-28 bg-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-3">
              Nos valeurs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Des principes qui guident chacune de nos réalisations
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {valeurs.map((valeur) => (
              <div key={valeur.titre} className="card p-6 sm:p-8 text-center group">
                <span className="text-4xl sm:text-5xl mb-4 block">{valeur.icone}</span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mb-3">
                  {valeur.titre}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-3">
              Notre expertise en chiffres
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { valeur: '50+', label: 'Projets réalisés' },
              { valeur: '15+', label: 'Clients satisfaits' },
              { valeur: '3', label: 'Domaines d\'expertise' },
              { valeur: '24/7', label: 'Support premium' },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-violet mb-2">
                  {stat.valeur}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 left-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-300 rounded-full blur-[100px] sm:blur-[150px] -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Discutons de votre projet
          </h2>
          <p className="text-base sm:text-lg text-violet-200 mb-8">
            Vous avez un projet ? Nous avons les compétences pour le réaliser.
          </p>
          <Link href="/contact" className="btn-primary !bg-white !text-violet hover:!bg-violet-50 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
            Contactez-nous
          </Link>
        </div>
      </section>
    </>
  );
}