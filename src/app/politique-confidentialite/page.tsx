// src/app/politique-confidentialite/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Protection des Données',
  description: 'Politique de confidentialité de KJA Studio Labs. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.',
  alternates: { canonical: '/politique-confidentialite' },
  openGraph: {
    title: 'Politique de confidentialité | KJA Studio Labs',
    description: 'Comment KJA Studio Labs protège vos données personnelles.',
    url: `${siteConfig.url}/politique-confidentialite`,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Politique de confidentialité',
          description: 'Politique de confidentialité de KJA Studio Labs',
          url: `${siteConfig.url}/politique-confidentialite`,
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Politique de confidentialité', item: `${siteConfig.url}/politique-confidentialite` },
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
            <span className="text-white font-medium">Politique de confidentialité</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Politique de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Confidentialité</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                1. Responsable du traitement
              </h2>
              <div className="space-y-2 text-gray-300 font-light leading-relaxed">
                <p><strong className="text-white font-medium">Responsable :</strong> Kelly Josué AKPLOGAN</p>
                <p><strong className="text-white font-medium">Raison sociale :</strong> {siteConfig.name}</p>
                <p><strong className="text-white font-medium">Email :</strong> {siteConfig.contact.email}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                2. Données collectées
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>Dans le cadre de l&apos;utilisation de notre site et de nos services, nous pouvons collecter :</p>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Données de contact :</strong> nom, prénom, adresse email (via le formulaire de contact)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Données de navigation :</strong> adresse IP, type de navigateur, pages visitées (via Google Analytics)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Cookies :</strong> cookies de session, cookies analytiques</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                3. Finalités du traitement
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Répondre à vos demandes de contact et devis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Gérer la relation client et le suivi des projets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Améliorer nos services et l&apos;expérience utilisateur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Analyser le trafic et les performances du site</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                4. Durée de conservation
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Données de contact :</strong> 3 ans à compter du dernier contact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Données de navigation :</strong> 13 mois maximum</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Cookies :</strong> 13 mois maximum</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                5. Vos droits
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Droit d&apos;accès, de rectification et d&apos;effacement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Droit d&apos;opposition et de limitation du traitement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Droit à la portabilité de vos données</span>
                  </li>
                </ul>
                <p className="mt-6 pt-2">
                  Pour exercer vos droits :{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors font-medium">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                6. Cookies
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour les refuser.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                7. Sécurité
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>Nous mettons en œuvre des mesures techniques appropriées : chiffrement HTTPS, accès restreint, mises à jour régulières.</p>
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