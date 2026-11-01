// src/app/mentions-legales/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Mentions légales | KJA Studio Labs',
  description: 'Mentions légales de KJA Studio Labs. Informations légales, hébergement, propriété intellectuelle et conditions d\'utilisation du site.',
  alternates: { canonical: '/mentions-legales' },
  openGraph: {
    title: 'Mentions légales | KJA Studio Labs',
    description: 'Informations légales de KJA Studio Labs.',
    url: `${siteConfig.url}/mentions-legales`,
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Mentions légales',
          description: 'Mentions légales de KJA Studio Labs',
          url: `${siteConfig.url}/mentions-legales`,
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Mentions légales', item: `${siteConfig.url}/mentions-legales` },
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
            <span className="text-white font-medium">Mentions légales</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // LEGAL NOTICE & GOVERNANCE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Mentions <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Légales</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Conformément aux dispositions légales et réglementaires applicables relatives à la transparence et à la confiance dans l&apos;économie numérique.
          </p>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-12">
            
            {/* 1. Éditeur du site */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 01.</span>
                <span>Éditeur du site</span>
              </h2>
              <div className="space-y-2 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p><strong className="text-white font-medium">Raison sociale :</strong> KJA Studio Labs</p>
                <p><strong className="text-white font-medium">Forme juridique :</strong> Entrepreneur individuel</p>
                <p><strong className="text-white font-medium">Nom du responsable :</strong> Kelly Josué AKPLOGAN</p>
                <p><strong className="text-white font-medium">Adresse email :</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-violet-300 hover:text-white transition-colors font-mono">{siteConfig.contact.email}</a></p>
                <p className="pt-2 flex flex-wrap items-center gap-1.5">
                  <strong className="text-white font-medium">Directeur de la publication :</strong> Kelly Josué AKPLOGAN{' '}
                  <a 
                    href="https://www.linkedin.com/in/kellyjosueakplogan/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-violet-300 hover:text-white inline-flex items-center gap-1.5 font-mono text-xs transition-colors ml-1 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </p>
              </div>
            </div>

            {/* 2. Hébergement */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 02.</span>
                <span>Hébergement</span>
              </h2>
              <div className="space-y-2 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p><strong className="text-white font-medium">Hébergeur :</strong> Vercel Inc.</p>
                <p><strong className="text-white font-medium">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p><strong className="text-white font-medium">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors font-mono">https://vercel.com</a></p>
                <p className="text-xs font-mono text-gray-400 pt-2">// Les données applicatives sont hébergées de manière sécurisée sur Neon (Serverless Postgres).</p>
              </div>
            </div>

            {/* 3. Propriété intellectuelle */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 03.</span>
                <span>Propriété intellectuelle</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  L&apos;ensemble du contenu présent sur le site {siteConfig.name} (textes, images, logos, vidéos, code source, design, interfaces)
                  est protégé par le droit d&apos;auteur et le droit de la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, adaptation, diffusion ou exploitation de tout ou partie du contenu du site,
                  quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l&apos;autorisation préalable et écrite de {siteConfig.name}.
                </p>
              </div>
            </div>

            {/* 4. Limitation de responsabilité */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 04.</span>
                <span>Limitation de responsabilité</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  {siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site.
                  Toutefois, {siteConfig.name} ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition.
                </p>
                <p>
                  En conséquence, {siteConfig.name} décline toute responsabilité pour toute imprécision, inexactitude ou omission concernant
                  les informations disponibles sur le site, ainsi que pour tous dommages résultant d&apos;une intrusion frauduleuse d&apos;un tiers.
                </p>
              </div>
            </div>

            {/* 5. Droit applicable */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 05.</span>
                <span>Droit applicable</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Les présentes mentions légales sont régies par le droit applicable. En cas de litige, les tribunaux compétents seront seuls habilités à trancher.
                </p>
                <p className="pt-2">
                  Pour toute question :{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors font-mono text-sm">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <p className="text-xs font-mono text-gray-500 font-light pt-8 border-t border-white/10">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}