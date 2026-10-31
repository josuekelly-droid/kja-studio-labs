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
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'UI/UX Design', provider: { '@type': 'Organization', name: siteConfig.name }, description: 'Design UI/UX premium : recherche UX, wireframes, prototypes Figma, design systems.', url: `${siteConfig.url}/services/design-ui-ux` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: `${siteConfig.url}/services/design-ui-ux` }] }} />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-24 lg:pb-28 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white font-medium">UI/UX Design</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            UI/UX <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Design</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Des interfaces qui captivent, des expériences qui convertissent. Chaque écran est pensé avec une obsession : vos utilisateurs.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md">
                Notre vision
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-6 tracking-tight">
                Le design au service de vos objectifs business
              </h2>
              <div className="space-y-4 text-gray-400 font-light leading-relaxed">
                <p>Un beau design ne suffit pas. Il doit être <strong className="text-white font-medium">fonctionnel, intuitif et orienté résultats</strong>. Chaque pixel, chaque interaction est pensée pour guider vos utilisateurs vers l&apos;action souhaitée et générer de la valeur pour votre entreprise.</p>
                <p>Notre approche combine <strong className="text-white font-medium">recherche utilisateur approfondie</strong>, principes d&apos;ergonomie cognitive et tendances design actuelles pour créer des interfaces qui marquent les esprits.</p>
                <p>Nous concevons des expériences <strong className="text-white font-medium">responsive, accessibles (WCAG 2.1) et performantes</strong>, adaptées à tous les écrans et à tous les utilisateurs, quel que soit leur contexte.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { titre: 'Design centré utilisateur', desc: 'Basé sur la recherche, les données et les tests' },
                { titre: 'Mobile-first', desc: 'Conçu pour tous les écrans, du smartphone au desktop' },
                { titre: 'Accessibilité WCAG 2.1', desc: 'Interfaces inclusives pour tous les utilisateurs' },
                { titre: 'Performance visuelle', desc: 'Animations fluides, temps de chargement optimisés' },
              ].map((item) => (
                <div key={item.titre} className="flex gap-4 p-5 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm sm:text-base">{item.titre}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Ce que nous faisons
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Nos prestations UI/UX
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Un accompagnement complet, de la stratégie au pixel final
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div 
                key={s.titre} 
                className="p-6 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 text-center group flex flex-col items-center justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)] mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2 group-hover:text-violet-300 transition-colors">
                    {s.titre}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Méthodologie
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Notre processus de design en 6 étapes
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              De la recherche à l&apos;itération continue, une approche éprouvée
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processus.map((p) => (
              <div 
                key={p.etape} 
                className="p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-heading font-bold text-violet-400/70 group-hover:text-violet-300 transition-colors">
                    {p.etape}
                  </span>
                  <h3 className="font-heading font-bold text-white text-lg mt-4 mb-3 group-hover:text-violet-300 transition-colors">
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
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Outils
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Nos outils de prédilection
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Les meilleurs logiciels pour un design efficace et collaboratif
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outils.map((outil) => (
              <div 
                key={outil.nom} 
                className="p-6 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.12)] transition-all duration-300 text-center group flex flex-col items-center justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit mx-auto mb-4 group-hover:bg-violet-600/20 transition-colors">
                    <img src={outil.logo} alt={outil.nom} className="h-8 w-8 object-contain filter brightness-200" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2 group-hover:text-violet-300 transition-colors">
                    {outil.nom}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {outil.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-28 bg-[#05020a] relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            Un projet de design en tête ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Parlons-en et créons ensemble une expérience exceptionnelle pour marquer durablement vos utilisateurs.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 text-sm sm:text-base font-heading font-bold rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Démarrer un projet
          </Link>
        </div>
      </section>
    </>
  );
}