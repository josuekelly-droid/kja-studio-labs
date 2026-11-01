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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">À propos</span>
          </nav>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // 01. STUDIO IDENTITY & VISION
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">KJA Studio Labs</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Studio créatif d&apos;ingénierie web. Nous concevons des solutions digitales d&apos;exception sur mesure pour les entreprises et entrepreneurs à travers le monde francophone.
          </p>
        </div>
      </section>

      {/* Histoire & Stats Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
                // OUR STORY
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
                De la passion à l&apos;expertise d&apos;élite
              </h2>
              <div className="space-y-4 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Fondé par <strong className="text-white font-semibold">Kelly Josué AKPLOGAN</strong>, KJA Studio Labs est né d&apos;une passion profonde pour le design d&apos;interfaces et l&apos;architecture logicielle moderne.
                </p>
                <p>
                  L&apos;objectif est clair : proposer un service premium qui couvre l&apos;intégralité du cycle de vie d&apos;un projet digital, de la première esquisse au déploiement en production, en passant par l&apos;automatisation et la synchronisation des données.
                </p>
                <p>
                  Aujourd&apos;hui, KJA Studio Labs accompagne des <strong className="text-white font-semibold">startups, PME et entrepreneurs visionnaires</strong> <br /> dans la création de leurs plateformes web, avec un souci constant de la performance, du référencement et de l&apos;ergonomie.
                </p>
                <p>
                  Notre mission : rendre le digital sur-mesure et ultra-performant pour tous les acteurs ambitieux en <strong className="text-white font-semibold">France, Belgique, Suisse, Canada, Luxembourg et en Afrique</strong>.
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
                  className="p-6 sm:p-7 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center gap-6"
                >
                  <span className="text-3xl sm:text-4xl font-mono font-black text-violet-400 shrink-0 w-24 text-center">
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
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
              // CORE VALUES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              Les principes qui guident nos réalisations
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
              Quatre piliers fondamentaux qui définissent notre exigence et notre culture d&apos;atelier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {valeurs.map((valeur, index) => (
              <div 
                key={valeur.titre} 
                className="p-8 sm:p-10 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-mono font-black text-violet-400/80 group-hover:text-violet-300 transition-colors duration-300">
                    0{index + 1}
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-4 mb-3 tracking-tight group-hover:text-violet-300 transition-colors">
                    {valeur.titre}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {valeur.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertises Détaillées Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
              // CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
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
                className="p-8 sm:p-12 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 items-center">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold text-violet-400 uppercase tracking-widest block">
                      // EXPERTISE 0{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                      {exp.titre}
                    </h3>
                  </div>
                  <div className="lg:col-span-2 space-y-6">
                    <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {exp.points.map((point) => (
                        <span 
                          key={point} 
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 text-violet-300 text-xs font-mono rounded-xl backdrop-blur-md"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
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
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Discutons ensemble de vos objectifs et construisons la solution sur-mesure qui fera la différence.
          </p>
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 text-xs font-heading font-bold uppercase tracking-wider rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}