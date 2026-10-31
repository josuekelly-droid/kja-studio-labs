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
    <>
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
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-medium">Mentions légales</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Mentions <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Légales</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.
          </p>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                1. Éditeur du site
              </h2>
              <div className="space-y-2 text-gray-300 font-light leading-relaxed">
                <p><strong className="text-white font-medium">Raison sociale :</strong> KJA Studio Labs</p>
                <p><strong className="text-white font-medium">Forme juridique :</strong> Entrepreneur individuel</p>
                <p><strong className="text-white font-medium">Nom du responsable :</strong> Kelly Josué AKPLOGAN</p>
                <p><strong className="text-white font-medium">Adresse email :</strong> {siteConfig.contact.email}</p>
                <p className="pt-2 flex flex-wrap items-center gap-1.5">
                  <strong className="text-white font-medium">Directeur de la publication :</strong> Kelly Josué AKPLOGAN{' '}
                  <a 
                    href="https://www.linkedin.com/in/kellyjosueakplogan/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-violet-300 hover:text-white inline-flex items-center gap-1 font-medium transition-colors ml-1"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                2. Hébergement
              </h2>
              <div className="space-y-2 text-gray-300 font-light leading-relaxed">
                <p><strong className="text-white font-medium">Hébergeur :</strong> Vercel Inc.</p>
                <p><strong className="text-white font-medium">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p><strong className="text-white font-medium">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors">https://vercel.com</a></p>
                <p className="text-xs text-gray-400 font-light mt-3">Les données de base sont hébergées sur Neon (Serverless Postgres).</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                3. Propriété intellectuelle
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>
                  L&apos;ensemble du contenu présent sur le site {siteConfig.name} (textes, images, logos, vidéos, code source, design, interfaces)
                  est protégé par le droit d&apos;auteur et le droit de la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, adaptation, diffusion ou exploitation de tout ou partie du contenu du site,
                  quel que soit le moyen ou le procédé utilisé, est strictly interdite sans l&apos;autorisation préalable et écrite de {siteConfig.name}.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                4. Limitation de responsabilité
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
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

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                5. Droit applicable
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
                <p className="pt-2">
                  Pour toute question :{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors font-medium">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 font-light pt-6 border-t border-white/10">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}