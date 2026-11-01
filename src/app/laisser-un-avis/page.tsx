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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Laisser un avis</span>
          </nav>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // SHARE YOUR EXPERIENCE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Partagez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">expérience</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Votre retour est précieux. Il contribue à notre excellence continue et guide nos futurs partenaires.
          </p>
        </div>
      </section>

      {/* Formulaire Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-2xl mx-auto">
          <AvisForm />
        </div>
      </section>
    </div>
  );
}