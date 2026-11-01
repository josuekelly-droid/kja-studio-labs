// src/app/services/design-ui-ux/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service UI/UX Design | Expériences Utilisateur d\'Exception',
  description: 'Design UI/UX premium par KJA Studio Labs. Recherche UX, wireframes, prototypes Figma, design systems et tests utilisateurs.',
  alternates: { canonical: '/services/design-ui-ux' },
  openGraph: {
    title: 'UI/UX Design | KJA Studio Labs',
    description: 'Design d\'interfaces modernes et expériences utilisateur optimisées pour la conversion.',
    url: `${siteConfig.url}/services/design-ui-ux`,
  },
};

const outils = [
  {
    nom: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg',
    description: 'Design d\'interfaces, prototyping et collaboration en temps réel. L\'outil de référence pour le design produit moderne.',
  },
  {
    nom: 'Framer',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/framer.svg',
    description: 'Prototypes interactifs avancés avec animations fluides et micro-interactions réalistes.',
  },
  {
    nom: 'Adobe XD',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobexd.svg',
    description: 'Wireframes, maquettes et prototypes pour des expériences utilisateur complètes.',
  },
  {
    nom: 'Photoshop',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobephotoshop.svg',
    description: 'Retouche d\'images avancée, création graphique, mockups et assets visuels haute qualité.',
  },
  {
    nom: 'Illustrator',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobeillustrator.svg',
    description: 'Illustrations vectorielles, création de logos, icônes personnalisées et identités visuelles.',
  },
  {
    nom: 'Sketch',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sketch.svg',
    description: 'Design d\'interfaces macOS, symboles et bibliothèques partagées pour le travail en équipe.',
  },
];

const processus = [
  { etape: '01', titre: 'Recherche & Analyse', description: 'Analyse approfondie des besoins utilisateurs, étude de la concurrence, définition des personas et parcours utilisateurs (user journeys).' },
  { etape: '02', titre: 'Wireframing', description: 'Création de wireframes basse-fidélité pour structurer l\'architecture d\'information et valider les flux de navigation.' },
  { etape: '03', titre: 'Prototypage', description: 'Prototypes interactifs cliquables sur Figma pour tester l\'expérience avant le développement et recueillir des retours.' },
  { etape: '04', titre: 'Design System', description: 'Création d\'un design system complet : composants réutilisables, tokens de design, guidelines et documentation.' },
  { etape: '05', titre: 'Maquettes HD', description: 'Maquettes haute-fidélité pixel-perfect responsives prêtes pour l\'intégration développeur (handoff).' },
  { etape: '06', titre: 'Tests & Itérations', description: 'Tests utilisateurs (moderated/unmoderated), A/B testing, retours clients, ajustements et améliorations continues.' },
];

const services = [
  { titre: 'UX Research', desc: 'Entretiens utilisateurs, enquêtes, tests d\'utilisabilité, analyse des données comportementales.' },
  { titre: 'UI Design', desc: 'Design d\'interfaces web et mobile, respect des guidelines iOS (Human Interface) et Android (Material Design).' },
  { titre: 'Design System', desc: 'Création et maintenance de systèmes de composants, tokens CSS, documentation Storybook.' },
  { titre: 'Web Design', desc: 'Design de sites vitrines, e-commerce, dashboards, SaaS avec approche mobile-first.' },
  { titre: 'Mobile Design', desc: 'Design d\'applications iOS et Android natives ou cross-platform (React Native, Flutter).' },
  { titre: 'Audit UX', desc: 'Audit complet de votre produit existant avec rapport détaillé et recommandations priorisées.' },
  { titre: 'Branding', desc: 'Identité visuelle complète : logo, charte graphique, typographie, palette de couleurs.' },
  { titre: 'Motion Design', desc: 'Micro-interactions, animations de transition, illustrations animées (Lottie, Rive).' },
];

export default function DesignUIUXPage() {
  return (
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'UI/UX Design', provider: { '@type': 'Organization', name: siteConfig.name }, description: 'Design UI/UX premium : recherche UX, wireframes, prototypes Figma, design systems.', url: `${siteConfig.url}/services/design-ui-ux` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: `${siteConfig.url}/services/design-ui-ux` }] }} />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">UI/UX Design</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // 01. UI/UX DESIGN & PRODUCT CRAFT
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              UI/UX <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Design</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Des interfaces qui captivent, des expériences qui convertissent. Chaque écran est sculpté avec une obsession : vos utilisateurs.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
                // OUR VISION
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
                Le design au service de vos objectifs business
              </h2>
              <div className="space-y-4 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>Un beau design ne suffit pas. Il doit être <strong className="text-white font-semibold">fonctionnel, intuitif et orienté résultats</strong>. Chaque pixel et chaque micro-interaction sont pensés pour guider vos utilisateurs vers l&apos;action souhaitée.</p>
                <p>Notre approche combine <strong className="text-white font-semibold">recherche utilisateur approfondie</strong>, principes d&apos;ergonomie cognitive et standards internationaux (Awwwards) pour créer des interfaces d&apos;exception.</p>
                <p>Nous concevons des expériences <strong className="text-white font-semibold">responsive, accessibles (WCAG 2.1) et performantes</strong>, adaptées à tous les environnements digitaux.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { titre: 'Design centré utilisateur', desc: 'Basé sur la recherche, les données et les tests' },
                { titre: 'Mobile-first', desc: 'Conçu pour tous les écrans, du smartphone au desktop' },
                { titre: 'Accessibilité WCAG 2.1', desc: 'Interfaces inclusives pour tous les utilisateurs' },
                { titre: 'Performance visuelle', desc: 'Animations fluides, temps de chargement optimisés' },
              ].map((item) => (
                <div key={item.titre} className="flex gap-4 p-6 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5 text-violet-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base">{item.titre}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
              // EXPERTISES & CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              Nos prestations UI/UX
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Un accompagnement complet et sur mesure, de la stratégie au pixel final.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div 
                key={s.titre} 
                className="p-8 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-violet-300 transition-colors">
                    {s.titre}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
              // DESIGN PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              Notre processus en 6 étapes
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              De la recherche fondamentale à l&apos;itération continue, une méthodologie rigoureuse.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processus.map((p) => (
              <div 
                key={p.etape} 
                className="p-8 sm:p-10 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-mono font-black text-violet-400/80 group-hover:text-violet-300 transition-colors">
                    {p.etape}
                  </span>
                  <h3 className="font-heading font-bold text-white text-xl mt-4 mb-3 group-hover:text-violet-300 transition-colors">
                    {p.titre}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest">
              // DESIGN STACK
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              Nos outils de prédilection
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Les logiciels de référence pour un design collaboratif, fluide et hautement performant.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outils.map((outil) => (
              <div 
                key={outil.nom} 
                className="p-7 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.15)] transition-all duration-300 text-center group flex flex-col items-center justify-between"
              >
                <div className="w-full">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 w-fit mx-auto mb-5 group-hover:bg-violet-600/20 group-hover:border-violet-500/30 transition-colors">
                    <img src={outil.logo} alt={outil.nom} className="h-8 w-8 object-contain filter brightness-200" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-violet-300 transition-colors">
                    {outil.nom}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {outil.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Un projet de design en tête ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Parlons-en et créons ensemble une expérience exceptionnelle pour marquer durablement vos utilisateurs.
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