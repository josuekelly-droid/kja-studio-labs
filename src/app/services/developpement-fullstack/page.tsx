// src/app/services/developpement-fullstack/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service Développement Fullstack',
  description: 'Développement Fullstack sur mesure. Applications web performantes, frontend, backend, bases de données.',
  alternates: { canonical: '/services/developpement-fullstack' },
};

export default function DevFullstackPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'Développement Fullstack', provider: { '@type': 'Organization', name: siteConfig.name }, url: `${siteConfig.url}/services/developpement-fullstack` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'Développement Fullstack', item: `${siteConfig.url}/services/developpement-fullstack` }] }} />
      
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span className="text-white font-medium">Fullstack</span></nav>
          <span className="text-5xl block mb-4">⚙️</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">Développement Fullstack</h1>
          <p className="text-violet-200 max-w-xl mx-auto">Des applications web modernes, performantes et scalables</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">Notre stack</h2>
            <p className="text-gray-600 leading-relaxed">Nous maîtrisons les technologies les plus modernes : React, Next.js, Node.js, PostgreSQL, Prisma, Tailwind CSS. Chaque projet est architecturé pour la performance, la sécurité et la maintenabilité.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {['Frontend React/Next.js', 'Backend Node.js', 'APIs REST/GraphQL', 'Bases de données', 'Authentification', 'Déploiement continu'].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl"><span className="text-violet text-lg">✓</span><span className="font-medium text-gray-900">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Besoin d&apos;un site web ?</h2>
          <Link href="/contact" className="btn-primary !bg-white !text-violet">Contactez-nous</Link>
        </div>
      </section>
    </>
  );
}