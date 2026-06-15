// src/app/services/design-ui-ux/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service UI/UX Design',
  description: 'Design UI/UX sur mesure. Recherche utilisateur, wireframes, prototypes, design systems. Studio créatif francophone.',
  alternates: { canonical: '/services/design-ui-ux' },
};

export default function DesignUIUXPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'UI/UX Design', provider: { '@type': 'Organization', name: siteConfig.name }, url: `${siteConfig.url}/services/design-ui-ux` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: `${siteConfig.url}/services/design-ui-ux` }] }} />
      
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span className="text-white font-medium">UI/UX Design</span></nav>
          <span className="text-5xl block mb-4">🎨</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">UI/UX Design</h1>
          <p className="text-violet-200 max-w-xl mx-auto">Des interfaces qui captivent et des expériences qui convertissent</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">Notre approche</h2>
            <p className="text-gray-600 leading-relaxed">Chaque projet commence par une phase de recherche approfondie pour comprendre vos utilisateurs, leurs besoins et leurs comportements. Nous créons ensuite des wireframes et prototypes itératifs, testés auprès de vrais utilisateurs, avant de livrer des maquettes haute-fidélité prêtes pour le développement.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {['Recherche UX', 'Wireframes', 'Prototypage', 'Design System', 'Maquettes HD', 'Tests utilisateurs'].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl"><span className="text-violet text-lg">✓</span><span className="font-medium text-gray-900">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Un projet de design ?</h2>
          <Link href="/contact" className="btn-primary !bg-white !text-violet">Contactez-nous</Link>
        </div>
      </section>
    </>
  );
}