// src/app/services/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Services',
  description: 'KJA Studio Labs : Design UI/UX, Développement Fullstack et Solutions Connect.',
  alternates: { canonical: '/services' },
};

const services = [
  { titre: 'UI/UX Design', description: 'Interfaces modernes, recherche utilisateur, wireframes, prototypes, design systems.', lien: '/services/design-ui-ux', icone: '🎨' },
  { titre: 'Développement Fullstack', description: 'Applications web performantes, frontend, backend, bases de données, déploiement.', lien: '/services/developpement-fullstack', icone: '⚙️' },
  { titre: 'Connect', description: 'APIs, intégrations, automatisation, synchronisation de vos outils digitaux.', lien: '/services/connect', icone: '🔗' },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }] }} />
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><a href="/" className="hover:text-white">Accueil</a><span>/</span><span className="text-white font-medium">Services</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Nos Services</h1>
          <p className="text-violet-200 max-w-xl mx-auto">Trois piliers pour vos projets digitaux</p>
        </div>
      </section>
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.titre} href={s.lien} className="card p-6 sm:p-8 group block text-center">
                <span className="text-5xl mb-4 block">{s.icone}</span>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 group-hover:text-violet">{s.titre}</h3>
                <p className="text-gray-600 text-sm">{s.description}</p>
                <span className="inline-flex items-center gap-2 mt-4 text-violet font-heading font-medium text-sm">En savoir plus →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}