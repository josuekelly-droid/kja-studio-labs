// src/app/laisser-un-avis/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { AvisForm } from './AvisForm';

export const metadata: Metadata = {
  title: 'Laisser un avis | Partagez Votre Expérience',
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

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">Laisser un avis</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Partager votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Expérience</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Votre avis compte ! Il nous aide à nous améliorer continuellement et oriente nos futurs partenaires.
          </p>
        </div>
      </section>

      {/* Formulaire Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0c0616]/70 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 sm:p-10 lg:p-12 hover:border-violet-500/30 transition-all duration-500">
            <AvisForm />
          </div>
        </div>
      </section>
    </>
  );
}