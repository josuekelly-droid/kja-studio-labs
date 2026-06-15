// src/app/services/connect/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service Connect',
  description: 'Solutions Connect : APIs, intégrations, automatisation, synchronisation de vos outils digitaux.',
  alternates: { canonical: '/services/connect' },
};

export default function ConnectPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'Connect', provider: { '@type': 'Organization', name: siteConfig.name }, url: `${siteConfig.url}/services/connect` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'Connect', item: `${siteConfig.url}/services/connect` }] }} />
      
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span className="text-white font-medium">Connect</span></nav>
          <span className="text-5xl block mb-4">🔗</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">Connect</h1>
          <p className="text-violet-200 max-w-xl mx-auto">Connectez vos outils, automatisez vos workflows</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">Intégrations sur mesure</h2>
            <p className="text-gray-600 leading-relaxed">Nous connectons vos outils existants (CRM, emailing, analytics, paiement) pour créer un écosystème digital fluide et automatisé. Gagnez du temps et réduisez les erreurs.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {['APIs personnalisées', 'Webhooks', 'Automatisation', 'CRM & Emailing', 'Paiement en ligne', 'Synchronisation'].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl"><span className="text-violet text-lg">✓</span><span className="font-medium text-gray-900">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Un projet d&apos;intégration ?</h2>
          <Link href="/contact" className="btn-primary !bg-white !text-violet">Contactez-nous</Link>
        </div>
      </section>
    </>
  );
}