// src/app/a-propos/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'À propos | Notre Histoire, Vision & Valeurs',
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
            <span className="text-white font-medium">À propos</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">KJA Studio Labs</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Studio créatif d&apos;ingénierie web. Nous concevons des solutions digitales d&apos;exception sur mesure pour les entreprises et entrepreneurs à travers le monde francophone.
          </p>
        </div>
      </section>

      {/* Histoire & Stats Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md">
                Notre histoire
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-6">
                De la passion à l&apos;expertise d&apos;élite
              </h2>
              <div className="space-y-4 text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Fondé par <strong className="text-white font-medium">Kelly Josué AKPLOGAN</strong>, KJA Studio Labs est né d&apos;une passion profonde pour le design d&apos;interfaces et l&apos;architecture logicielle moderne.
                </p>
                <p>
                  L&apos;objectif est clair : proposer un service premium qui couvre l&apos;intégralité du cycle de vie d&apos;un projet digital, de la première esquisse au déploiement en production, en passant par l&apos;automatisation et la synchronisation des données.
                </p>
                <p>
                  Aujourd&apos;hui, KJA Studio Labs accompagne des <strong className="text-white font-medium">startups, PME et entrepreneurs visionnaires</strong> <br /> dans la création de leurs plateformes web, avec un souci constant de la performance, du référencement et de l&apos;ergonomie.
                </p>
                <p>
                  Notre mission : rendre le digital sur-mesure et ultra-performant pour tous les acteurs ambitieux en <strong className="text-white font-medium">France, Belgique, Suisse, Canada, Luxembourg et en Afrique</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { chiffre: '50+', label: 'Projets réalisés avec succès' },
                { chiffre: '15+', label: 'Clients réguliers et partenaires' },
                { chiffre: '3', label: 'Domaines d\'expertise complémentaires' },
                { chiffre: '100%', label: 'Des projets livrés dans les règles de l\'art' },
              ].map((stat) => (
                <div 
                  key={stat.label} 
                  className="p-6 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-violet-500/40 transition-all duration-300 flex items-center gap-6"
                >
                  <span className="text-3xl sm:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 shrink-0 w-20 text-center">
                    {stat.chiffre}
                  </span>
                  <p className="text-sm sm:text-base text-gray-300 font-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Nos valeurs
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              Les principes qui guident nos réalisations
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
              Quatre piliers fondamentaux qui définissent notre exigence et notre culture d&apos;atelier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {valeurs.map((valeur, index) => (
              <div 
                key={valeur.titre} 
                className="p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-violet-500/50 transition-all duration-500 group"
              >
                <span className="text-4xl font-heading font-bold text-violet-500/30 group-hover:text-violet-400 transition-colors duration-300">
                  0{index + 1}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-4 mb-3 tracking-tight">
                  {valeur.titre}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                  {valeur.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertises Détaillées Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Nos expertises
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              Trois domaines d&apos;excellence
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
              Une offre complète pour propulser votre écosystème numérique.
            </p>
          </div>

          <div className="space-y-8">
            {expertise.map((exp, index) => (
              <div 
                key={exp.titre} 
                className="p-8 sm:p-10 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-violet-500/30 transition-all duration-500"
              >
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">
                  <div>
                    <span className="text-xs font-heading font-bold text-violet-400 uppercase tracking-wider">
                      Expertise 0{index + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-2 mb-2 tracking-tight">
                      {exp.titre}
                    </h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-gray-400 font-light leading-relaxed mb-6 text-sm sm:text-base">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {exp.points.map((point) => (
                        <span 
                          key={point} 
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-full backdrop-blur-md"
                        >
                          <svg className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
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

      {/* CTA Section */}
      <section className="py-24 sm:py-28 lg:py-36 bg-[#05020a] relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-6">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Discutons ensemble de vos objectifs et construisons la solution sur-mesure qui fera la différence.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 font-heading font-bold text-sm sm:text-base rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Démarrer un projet
          </Link>
        </div>
      </section>
    </>
  );
}