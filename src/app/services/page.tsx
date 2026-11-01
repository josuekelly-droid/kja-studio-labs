// src/app/services/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Nos Services | Design UI/UX, Fullstack & Connect',
  description: 'KJA Studio Labs propose trois expertises complémentaires : Design UI/UX, Développement Fullstack et Solutions Connect pour vos projets digitaux d\'exception.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | KJA Studio Labs',
    description: 'Design UI/UX, Développement Fullstack et Solutions Connect.',
    url: `${siteConfig.url}/services`,
  },
};

const services = [
  {
    titre: 'Design UI/UX',
    description: 'Interfaces modernes et intuitives. Recherche utilisateur, wireframes, prototypes interactifs, design systems complets et tests utilisateurs. Nous concevons chaque écran pour maximiser l\'engagement et la conversion.',
    lien: '/services/design-ui-ux',
    points: ['Recherche UX approfondie', 'Wireframes & Prototypes', 'Design Systems', 'Tests utilisateurs'],
  },
  {
    titre: 'Développement Fullstack',
    description: 'Applications web performantes et scalables. Frontend React/Next.js, backend Node.js/Python/PHP, bases de données PostgreSQL/MongoDB. Code propre, architecture solide, SEO intégré.',
    lien: '/services/developpement-fullstack',
    points: ['Frontend & Backend', 'APIs REST/GraphQL', 'Bases de données', 'Déploiement continu'],
  },
  {
    titre: 'Connect',
    description: 'Intégrations API, automatisation des workflows, synchronisation en temps réel. Connectez votre CRM, emailing, paiement et analytics pour un écosystème digital unifié et performant.',
    lien: '/services/connect',
    points: ['APIs personnalisées', 'Automatisation', 'Intégrations SaaS', 'Synchronisation'],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd data={{ 
        '@context': 'https://schema.org', 
        '@type': 'BreadcrumbList', 
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, 
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }
        ] 
      }} />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Services</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // OUR CORE CAPABILITIES
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Nos Domaines d&apos;<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Expertise</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Trois expertises complémentaires pour concevoir, développer et connecter vos projets digitaux de A à Z avec un standard d&apos;excellence absolu.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((s, index) => (
              <Link 
                key={s.titre} 
                href={s.lien} 
                className="group relative p-8 sm:p-10 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-violet-400/80 group-hover:text-violet-300 transition-colors">
                      0{index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-violet-300 group-hover:bg-violet-600/20 group-hover:border-violet-500/30 transition-all">
                      <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-violet-300 transition-colors tracking-tight">
                    {s.titre}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {s.description}
                  </p>
                  
                  <ul className="space-y-2.5 pt-2">
                    {s.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-300 group-hover:text-white transition-colors">
                    Découvrir ce service
                  </span>
                  <span aria-hidden="true" className="text-violet-400 font-mono transition-transform group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </Link>
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
            Un projet en tête ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Discutons de vos besoins et trouvons la solution idéale pour propulser votre entreprise sur le devant de la scène digitale.
          </p>
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 text-xs font-heading font-bold uppercase tracking-wider rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}