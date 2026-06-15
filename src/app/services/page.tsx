// src/app/services/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Services',
  description: 'KJA Studio Labs propose trois expertises complémentaires : Design UI/UX, Développement Fullstack et Solutions Connect pour vos projets digitaux.',
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
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }] }} />

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" /><div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><span className="text-white font-medium">Services</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Nos Services</h1>
          <p className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">Trois expertises complémentaires pour concevoir, développer et connecter vos projets digitaux de A à Z.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((s, index) => (
              <Link key={s.titre} href={s.lien} className="card p-6 sm:p-8 group block">
                <span className="text-4xl font-heading font-bold text-violet-200 group-hover:text-violet transition-colors">0{index + 1}</span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-900 mt-3 mb-3 group-hover:text-violet transition-colors">{s.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-2">
                  {s.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-violet shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 mt-6 text-violet font-heading font-semibold text-sm group-hover:gap-3 transition-all">Découvrir ce service <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-violet-300 rounded-full blur-[150px] -translate-x-1/2" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Un projet en tête ?</h2>
          <p className="text-violet-200 mb-8">Discutons de vos besoins et trouvons la solution idéale pour votre entreprise.</p>
          <Link href="/contact" className="btn-primary !bg-white !text-violet text-sm sm:text-base px-8 py-4">Contactez-nous</Link>
        </div>
      </section>
    </>
  );
}