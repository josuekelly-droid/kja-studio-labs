// src/app/politique-confidentialite/page.tsx
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
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

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6" aria-label="Fil d'ariane">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white font-medium">Politique de confidentialité</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 sm:mb-6">
            Politique de confidentialité
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">1. Responsable du traitement</h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p><strong>Responsable :</strong> Kelly Josué AKPLOGAN</p>
                <p><strong>Raison sociale :</strong> {siteConfig.name}</p>
                <p><strong>Email :</strong> {siteConfig.contact.email}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">2. Données collectées</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>Dans le cadre de l&apos;utilisation de notre site et de nos services, nous pouvons collecter :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Données de contact :</strong> nom, prénom, adresse email (via le formulaire de contact)</li>
                  <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées (via Google Analytics)</li>
                  <li><strong>Cookies :</strong> cookies de session, cookies analytiques</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">3. Finalités du traitement</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Répondre à vos demandes de contact et devis</li>
                  <li>Gérer la relation client et le suivi des projets</li>
                  <li>Améliorer nos services et l&apos;expérience utilisateur</li>
                  <li>Analyser le trafic et les performances du site</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">4. Durée de conservation</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                  <li><strong>Cookies :</strong> 13 mois maximum</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">5. Vos droits</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Droit d&apos;accès, de rectification et d&apos;effacement</li>
                  <li>Droit d&apos;opposition et de limitation du traitement</li>
                  <li>Droit à la portabilité de vos données</li>
                </ul>
                <p className="mt-4">
                  Pour exercer vos droits : <a href={`mailto:${siteConfig.contact.email}`} className="text-violet hover:underline">{siteConfig.contact.email}</a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">6. Cookies</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour les refuser.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">7. Sécurité</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>Nous mettons en œuvre des mesures techniques appropriées : chiffrement HTTPS, accès restreint, mises à jour régulières.</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 pt-6 border-t border-gray-200">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}