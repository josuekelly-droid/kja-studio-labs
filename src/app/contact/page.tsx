// src/app/contact/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Discutons de Votre Projet Digital',
  description: 'Contactez KJA Studio Labs pour vos projets de Design UI/UX, Développement Fullstack et Solutions Connect.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | KJA Studio Labs',
    description: 'Contactez-nous pour discuter de votre projet et accélérer votre croissance.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact` }] }} />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">Contact</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Contactez-<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">nous</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Un projet en tête ? Une vision à concrétiser ? Discutons-en ensemble.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Info */}
            <div>
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md">
                Prendre contact
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-6">
                Parlons de votre projet
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-10 text-sm sm:text-base">
                Remplissez le formulaire ci-contre et notre équipe vous recontactera sous 24 à 48 heures pour étudier vos besoins.
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-5 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider">Email</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-medium text-white hover:text-violet-300 transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Location Box */}
                <div className="p-5 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider">Localisation</p>
                    <p className="text-sm font-medium text-white">Cotonou, Bénin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}