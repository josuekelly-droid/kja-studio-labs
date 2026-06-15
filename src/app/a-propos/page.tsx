// src/app/a-propos/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez KJA Studio Labs, studio créatif francophone spécialisé en Design UI/UX, Développement Web Fullstack et Solutions Connect. Notre histoire, notre vision, nos valeurs.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'À propos | KJA Studio Labs',
    description: 'Découvrez l\'histoire, la vision et les valeurs de KJA Studio Labs.',
    url: `${siteConfig.url}/a-propos`,
  },
};

const valeurs = [
  {
    titre: 'Excellence technique',
    description: 'Chaque projet est une occasion de livrer un travail irréprochable. Du design à la dernière ligne de code, nous visons le plus haut niveau de qualité et de finition.',
  },
  {
    titre: 'Proximité client',
    description: 'Nous construisons une relation de confiance durable avec chaque client. Écoute active, transparence totale et communication fluide tout au long du projet.',
  },
  {
    titre: 'Innovation continue',
    description: 'Veille technologique permanente, adoption des meilleures pratiques et exploration des outils émergents pour vous offrir des solutions toujours à la pointe.',
  },
  {
    titre: 'Performance mesurable',
    description: 'Nous concevons des solutions optimisées pour la vitesse, le référencement naturel et l\'expérience utilisateur. Chaque choix technique est guidé par des métriques concrètes.',
  },
];

const expertise = [
  {
    titre: 'Design UI/UX',
    description: 'Recherche utilisateur approfondie, wireframes, prototypes interactifs, design systems complets et tests utilisateurs pour des interfaces qui captivent et convertissent.',
    points: ['Recherche UX', 'Wireframes & Prototypage', 'Design Systems', 'Tests utilisateurs'],
  },
  {
    titre: 'Développement Fullstack',
    description: 'Applications web modernes, performantes et scalables. Frontend React/Next.js/Vue.js, backend Node.js/Python/PHP, bases de données PostgreSQL/MongoDB/MySQL.',
    points: ['Frontend & Backend', 'APIs REST & GraphQL', 'Bases de données', 'Déploiement CI/CD'],
  },
  {
    titre: 'Solutions Connect',
    description: 'Intégrations API, automatisation des workflows, synchronisation en temps réel entre vos outils métier. Un écosystème digital unifié, sans couture et sans erreur.',
    points: ['APIs personnalisées', 'Automatisation', 'Intégrations SaaS', 'Synchronisation temps réel'],
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
          description: 'Studio créatif francophone spécialisé en Design UI/UX, Développement Fullstack et Solutions Connect.',
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
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">À propos</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 sm:mb-6">
            À propos de KJA Studio Labs
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">
            Studio créatif francophone. Nous concevons des solutions digitales sur mesure pour les entreprises et entrepreneurs à travers le monde francophone.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-4">
                Notre histoire
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                De la passion à l&apos;expertise
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondé par <strong>Kelly Josué AKPLOGAN</strong>, KJA Studio Labs est né d&apos;une passion profonde pour le design d&apos;interfaces et le développement web. Après plusieurs années d&apos;expérience dans la création de solutions digitales pour des clients variés, l&apos;idée de structurer une offre complète s&apos;est imposée naturellement.
                </p>
                <p>
                  L&apos;objectif était clair : proposer un service premium qui couvre l&apos;intégralité du cycle de vie d&apos;un projet digital, de la première esquisse au déploiement en production, en passant par l&apos;intégration avec les outils existants du client.
                </p>
                <p>
                  Aujourd&apos;hui, KJA Studio Labs accompagne des <strong>startups, PME et entrepreneurs</strong> dans la création et l&apos;optimisation de leur présence digitale, avec une approche centrée sur la <strong>performance technique, le référencement naturel et l&apos;expérience utilisateur</strong>.
                </p>
                <p>
                  Notre mission : rendre le digital accessible et performant pour tous les acteurs francophones, que ce soit en <strong>France, Belgique, Suisse, Canada, Luxembourg ou en Afrique</strong>.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { chiffre: '50+', label: 'Projets réalisés depuis la création' },
                { chiffre: '15+', label: 'Clients satisfaits et récurrents' },
                { chiffre: '3', label: 'Domaines d\'expertise complémentaires' },
                { chiffre: '100%', label: 'Des projets livrés avec succès' },
              ].map((stat) => (
                <div key={stat.label} className="card p-5 flex items-center gap-5">
                  <span className="text-3xl sm:text-4xl font-heading font-bold text-violet shrink-0 w-20 text-center">{stat.chiffre}</span>
                  <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-4">
              Nos valeurs
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Les principes qui guident notre travail
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Quatre piliers fondamentaux qui définissent notre approche et notre culture
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {valeurs.map((valeur, index) => (
              <div key={valeur.titre} className="card p-6 sm:p-8 group hover:shadow-violet-md transition-all">
                <span className="text-4xl font-heading font-bold text-violet-200 group-hover:text-violet transition-colors">0{index + 1}</span>
                <h3 className="font-heading font-bold text-xl text-gray-900 mt-3 mb-3">{valeur.titre}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertises détaillées */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-4">
              Nos expertises
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Trois domaines d&apos;excellence
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Une offre complète et cohérente pour tous vos besoins digitaux
            </p>
          </div>
          <div className="space-y-8">
            {expertise.map((exp, index) => (
              <div key={exp.titre} className="card p-6 sm:p-8 lg:p-10 group hover:shadow-violet-md transition-all">
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">
                  <div>
                    <span className="text-sm font-heading font-bold text-violet uppercase tracking-wider">Expertise 0{index + 1}</span>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mt-2 mb-2">{exp.titre}</h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-gray-600 leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.points.map((point) => (
                        <span key={point} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 left-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-300 rounded-full blur-[100px] sm:blur-[150px] -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-base sm:text-lg text-violet-200 mb-8">
            Discutons ensemble de vos objectifs et construisons la solution qui vous correspond.
          </p>
          <Link href="/contact" className="btn-primary !bg-white !text-violet hover:!bg-violet-50 text-sm sm:text-base px-8 py-4">
            Démarrer un projet
          </Link>
        </div>
      </section>
    </>
  );
}