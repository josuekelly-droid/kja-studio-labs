// src/app/laisser-un-avis/page.tsx
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { AvisForm } from './AvisForm';

export const metadata: Metadata = {
  title: 'Laisser un avis',
  description: 'Partagez votre expérience avec KJA Studio Labs. Votre avis nous aide à nous améliorer et aide nos futurs clients à nous choisir.',
  alternates: { canonical: '/laisser-un-avis' },
  openGraph: {
    title: 'Laisser un avis | KJA Studio Labs',
    description: 'Partagez votre expérience avec KJA Studio Labs.',
    url: `${siteConfig.url}/laisser-un-avis`,
  },
};

export default function LaisserUnAvisPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Laisser un avis',
          url: `${siteConfig.url}/laisser-un-avis`,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Laisser un avis', item: `${siteConfig.url}/laisser-un-avis` },
          ],
        }}
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white font-medium">Laisser un avis</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">
            Partager votre expérience
          </h1>
          <p className="text-base sm:text-lg text-violet-200 max-w-xl mx-auto">
            Votre avis compte ! Il nous aide à nous améliorer et rassure nos futurs clients.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8 lg:p-10">
            <AvisForm />
          </div>
        </div>
      </section>
    </>
  );
}