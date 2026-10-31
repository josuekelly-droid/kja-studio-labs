// src/app/cgv/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
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
            <span className="text-white font-medium">CGV</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Conditions Générales de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Vente</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Les présentes CGV régissent les relations contractuelles entre {siteConfig.name} et ses clients.
          </p>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                1. Champ d&apos;application
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
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
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                2. Prestations proposées
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Design UI/UX :</strong> conception d&apos;interfaces, wireframes, prototypes, design systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Développement Fullstack :</strong> sites web, applications web, APIs, bases de données</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Connect :</strong> intégrations, automatisation, synchronisation d&apos;outils</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Maintenance :</strong> support technique, mises à jour, corrections de bugs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                3. Devis et commande
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>Chaque projet fait l&apos;objet d&apos;un devis détaillé gratuit comprenant :</p>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>La description détaillée des prestations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Le calendrier prévisionnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>Le montant total et les modalités de paiement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span>La durée de validité du devis (30 jours)</span>
                  </li>
                </ul>
                <p className="pt-2">La commande est ferme à réception du devis signé et de l&apos;acompte.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                4. Tarifs et paiement
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Acompte :</strong> 30% à 50% à la commande</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Paiements intermédiaires :</strong> selon jalons définis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2.5" />
                    <span><strong className="text-white font-medium">Solde :</strong> à la livraison finale</span>
                  </li>
                </ul>
                <p className="pt-2">Paiement par virement bancaire. Tout retard entraîne des pénalités au taux légal.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                5. Propriété intellectuelle
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>
                  Les créations restent la propriété exclusive de {siteConfig.name} jusqu&apos;au paiement intégral.
                  Après paiement complet, le client obtient les droits d&apos;utilisation définis dans le devis.
                  {siteConfig.name} conserve le droit de mentionner le projet dans son portfolio.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                6. Responsabilité
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>
                  {siteConfig.name} s&apos;engage à mettre en œuvre tous les moyens nécessaires pour mener à bien les prestations.
                  Sa responsabilité est limitée au montant total de la prestation.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 tracking-tight">
                7. Droit applicable
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed">
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de litige, les parties recherchent une solution amiable avant toute action judiciaire.
                </p>
                <p className="pt-2">
                  Contact :{' '}
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