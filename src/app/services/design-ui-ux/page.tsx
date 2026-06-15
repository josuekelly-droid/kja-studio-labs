// src/app/services/design-ui-ux/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service UI/UX Design',
  description: 'Design UI/UX premium par KJA Studio Labs. Recherche UX, wireframes, prototypes Figma, design systems, tests utilisateurs. Studio créatif francophone.',
  alternates: { canonical: '/services/design-ui-ux' },
  openGraph: {
    title: 'UI/UX Design | KJA Studio Labs',
    description: 'Design d\'interfaces modernes et expériences utilisateur optimisées.',
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

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" /><div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span className="text-white font-medium">UI/UX Design</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">UI/UX Design</h1>
          <p className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">Des interfaces qui captivent, des expériences qui convertissent. Chaque écran est pensé avec une obsession : vos utilisateurs.</p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Notre vision</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">Le design au service de vos objectifs business</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Un beau design ne suffit pas. Il doit être <strong>fonctionnel, intuitif et orienté résultats</strong>. Chaque pixel, chaque interaction est pensée pour guider vos utilisateurs vers l&apos;action souhaitée et générer de la valeur pour votre entreprise.</p>
                <p>Notre approche combine <strong>recherche utilisateur approfondie</strong>, principes d&apos;ergonomie cognitive et tendances design actuelles pour créer des interfaces qui marquent les esprits.</p>
                <p>Nous concevons des expériences <strong>responsive, accessibles (WCAG 2.1) et performantes</strong>, adaptées à tous les écrans et à tous les utilisateurs, quel que soit leur contexte.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { titre: 'Design centré utilisateur', desc: 'Basé sur la recherche, les données et les tests' },
                { titre: 'Mobile-first', desc: 'Conçu pour tous les écrans, du smartphone au desktop' },
                { titre: 'Accessibilité WCAG 2.1', desc: 'Interfaces inclusives pour tous les utilisateurs' },
                { titre: 'Performance visuelle', desc: 'Animations fluides, temps de chargement optimisés' },
              ].map((item) => (
                <div key={item.titre} className="flex gap-4 p-4 bg-violet-50/50 rounded-xl">
                  <svg className="w-5 h-5 text-violet shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <div><h3 className="font-heading font-semibold text-gray-900">{item.titre}</h3><p className="text-sm text-gray-600">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Ce que nous faisons</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Nos prestations UI/UX</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Un accompagnement complet, de la stratégie au pixel final</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((s) => (
              <div key={s.titre} className="card p-5 text-center group hover:shadow-violet-md transition-all">
                <svg className="w-8 h-8 text-violet mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{s.titre}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Méthodologie</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Notre processus de design en 6 étapes</h2>
            <p className="text-gray-600 max-w-xl mx-auto">De la recherche à l&apos;itération continue, une approche éprouvée</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processus.map((p) => (
              <div key={p.etape} className="card p-6 group">
                <span className="text-4xl font-heading font-bold text-violet-200 group-hover:text-violet transition-colors">{p.etape}</span>
                <h3 className="font-heading font-bold text-lg text-gray-900 mt-3 mb-2">{p.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Outils</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Nos outils de prédilection</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Les meilleurs logiciels pour un design efficace et collaboratif</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outils.map((outil) => (
              <div key={outil.nom} className="card p-6 text-center group hover:shadow-violet-md transition-all">
                <img src={outil.logo} alt={outil.nom} className="h-10 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-gray-900 mb-2">{outil.nom}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{outil.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-violet-300 rounded-full blur-[150px] -translate-x-1/2" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Un projet de design en tête ?</h2>
          <p className="text-violet-200 mb-8">Parlons-en et créons ensemble une expérience exceptionnelle pour vos utilisateurs.</p>
          <Link href="/contact" className="btn-primary !bg-white !text-violet text-sm sm:text-base px-8 py-4">Démarrer un projet</Link>
        </div>
      </section>
    </>
  );
}