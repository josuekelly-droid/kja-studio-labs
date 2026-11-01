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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact` }] }} />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Contact</span>
          </nav>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // START A CONVERSATION
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Contactez-<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">nous</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Un projet d&apos;exception en tête ? Une vision à concrétiser ? Discutons de vos enjeux digitaux.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Info */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest mb-4">
                  // TAKE IN TOUCH
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight mb-4">
                  Parlons de votre futur projet
                </h2>
                <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                  Remplissez le formulaire ci-contre et notre équipe vous recontactera sous 24 à 48 heures pour évaluer vos besoins.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-6 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-300 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Email direct</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-mono font-medium text-white hover:text-violet-300 transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Location Box */}
                <div className="p-6 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-300 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Siège & Studio</p>
                    <p className="text-sm font-mono font-medium text-white">Cotonou, Bénin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Client Form Component */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}