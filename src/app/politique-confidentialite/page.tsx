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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Politique de confidentialité</span>
          </nav>
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // PRIVACY & DATA PROTECTION
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Politique de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Confidentialité</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et aux réglementations applicables en matière de protection des données.
          </p>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-12">
            
            {/* 1. Responsable du traitement */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 01.</span>
                <span>Responsable du traitement</span>
              </h2>
              <div className="space-y-2 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p><strong className="text-white font-medium">Responsable :</strong> Kelly Josué AKPLOGAN</p>
                <p><strong className="text-white font-medium">Raison sociale :</strong> {siteConfig.name}</p>
                <p><strong className="text-white font-medium">Email de contact :</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-violet-300 hover:text-white transition-colors font-mono">{siteConfig.contact.email}</a></p>
              </div>
            </div>

            {/* 2. Données collectées */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 02.</span>
                <span>Données collectées</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>Dans le cadre de l&apos;utilisation de notre site et de nos services, nous sommes amenés à collecter :</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Données de contact :</strong> nom, prénom, entreprise et adresse email (via le formulaire de contact ou d&apos;avis)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Données de navigation :</strong> adresse IP, type de terminal et pages consultées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Cookies :</strong> cookies techniques et analytiques nécessaires au bon fonctionnement de la plateforme</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Finalités du traitement */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 03.</span>
                <span>Finalités du traitement</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Répondre à vos demandes de contact, d&apos;évaluation ou de devis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Gérer la relation contractuelle, le suivi des projets et la modération des avis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Améliorer continuellement nos services et l&apos;expérience utilisateur</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4. Durée de conservation */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 04.</span>
                <span>Durée de conservation</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Données de contact :</strong> conservées pendant 3 ans à compter du dernier échange</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Données de navigation & Cookies :</strong> conservées pour une durée maximale de 13 mois</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. Vos droits */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 05.</span>
                <span>Vos droits</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>Conformément à la réglementation, vous bénéficiez des droits suivants :</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Droit d&apos;accès, de rectification et d&apos;effacement de vos données</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Droit d&apos;opposition et de limitation du traitement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Droit à la portabilité de vos données personnelles</span>
                  </li>
                </ul>
                <p className="pt-2">
                  Pour exercer ces droits, contactez-nous directement à :{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors font-mono text-sm">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>

            {/* 6. Sécurité */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 06.</span>
                <span>Sécurité</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles rigoureuses (chiffrement HTTPS, hachage des mots de passe, cloisonnement des bases de données) afin de protéger vos informations contre toute perte, altération ou accès non autorisé.
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