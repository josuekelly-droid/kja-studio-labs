// src/app/cgv/page.tsx
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente (CGV)',
  description: 'Conditions Générales de Vente de KJA Studio Labs. Tarifs, modalités de paiement, livrables, propriété intellectuelle et responsabilités.',
  alternates: { canonical: '/cgv' },
  openGraph: {
    title: 'CGV | KJA Studio Labs',
    description: 'Conditions Générales de Vente de KJA Studio Labs.',
    url: `${siteConfig.url}/cgv`,
  },
};

export default function CGVPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Conditions Générales de Vente',
          description: 'CGV de KJA Studio Labs',
          url: `${siteConfig.url}/cgv`,
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'CGV', item: `${siteConfig.url}/cgv` },
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
            <span className="text-white font-medium">CGV</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 sm:mb-6">
            Conditions Générales de Vente
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">
            Les présentes CGV régissent les relations contractuelles entre {siteConfig.name} et ses clients.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">1. Champ d&apos;application</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Les présentes CGV s&apos;appliquent à toutes les prestations fournies par {siteConfig.name} dans les domaines
                  du Design UI/UX, du Développement Web Fullstack et des Solutions Connect.
                </p>
                <p>
                  Toute commande implique l&apos;acceptation sans réserve par le client des présentes CGV.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">2. Prestations proposées</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Design UI/UX :</strong> conception d&apos;interfaces, wireframes, prototypes, design systems</li>
                  <li><strong>Développement Fullstack :</strong> sites web, applications web, APIs, bases de données</li>
                  <li><strong>Connect :</strong> intégrations, automatisation, synchronisation d&apos;outils</li>
                  <li><strong>Maintenance :</strong> support technique, mises à jour, corrections de bugs</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">3. Devis et commande</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>Chaque projet fait l&apos;objet d&apos;un devis détaillé gratuit comprenant :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>La description détaillée des prestations</li>
                  <li>Le calendrier prévisionnel</li>
                  <li>Le montant total et les modalités de paiement</li>
                  <li>La durée de validité du devis (30 jours)</li>
                </ul>
                <p>La commande est ferme à réception du devis signé et de l&apos;acompte.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">4. Tarifs et paiement</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Acompte :</strong> 30% à 50% à la commande</li>
                  <li><strong>Paiements intermédiaires :</strong> selon jalons définis</li>
                  <li><strong>Solde :</strong> à la livraison finale</li>
                </ul>
                <p>Paiement par virement bancaire. Tout retard entraîne des pénalités au taux légal.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">5. Propriété intellectuelle</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Les créations restent la propriété exclusive de {siteConfig.name} jusqu&apos;au paiement intégral.
                  Après paiement complet, le client obtient les droits d&apos;utilisation définis dans le devis.
                  {siteConfig.name} conserve le droit de mentionner le projet dans son portfolio.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">6. Responsabilité</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  {siteConfig.name} s&apos;engage à mettre en œuvre tous les moyens nécessaires pour mener à bien les prestations.
                  Sa responsabilité est limitée au montant total de la prestation.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">7. Droit applicable</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de litige, les parties recherchent une solution amiable avant toute action judiciaire.
                </p>
                <p>
                  Contact : <a href={`mailto:${siteConfig.contact.email}`} className="text-violet hover:underline">{siteConfig.contact.email}</a>
                </p>
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