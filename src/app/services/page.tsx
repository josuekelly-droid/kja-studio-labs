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
    <>
      <JsonLd data={{ 
        '@context': 'https://schema.org', 
        '@type': 'BreadcrumbList', 
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, 
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }
        ] 
      }} />

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
            <span className="text-white font-medium">Services</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Nos Domaines d&apos;<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Expertise</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Trois expertises complémentaires pour concevoir, développer et connecter vos projets digitaux de A à Z avec un standard d&apos;excellence.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((s, index) => (
              <Link 
                key={s.titre} 
                href={s.lien} 
                className="group relative p-8 sm:p-10 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-heading font-bold text-violet-400/70 group-hover:text-violet-300 transition-colors">
                    0{index + 1}
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-4 mb-4 group-hover:text-violet-300 transition-colors">
                    {s.titre}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                    {s.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {s.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-light">
                        <span className="w-5 h-5 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="inline-flex items-center gap-2 text-violet-300 font-heading font-semibold text-sm group-hover:gap-3 group-hover:text-white transition-all">
                  Découvrir ce service <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
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
            Un projet en tête ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Discutons de vos besoins et trouvons la solution idéale pour propulser votre entreprise sur le devant de la scène digitale.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 text-sm sm:text-base font-heading font-bold rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </>
  );
}