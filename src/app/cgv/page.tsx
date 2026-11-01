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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md" aria-label="Fil d'ariane">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">CGV</span>
          </nav>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // TERMS & CONDITIONS
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight">
              Conditions Générales de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">Vente</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Les présentes CGV régissent les relations contractuelles entre {siteConfig.name} et ses clients.
          </p>
        </div>
      </section>

      {/* Contenu Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-12">
            
            {/* 1. Champ d'application */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 01.</span>
                <span>Champ d&apos;application</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Les présentes CGV s&apos;appliquent à toutes les prestations fournies par {siteConfig.name} dans les domaines
                  du Design UI/UX, du Développement Web Fullstack et des Solutions Connect.
                </p>
                <p>
                  Toute commande implique l&apos;acceptation sans réserve par le client des présentes CGV.
                </p>
              </div>
            </div>

            {/* 2. Prestations proposées */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 02.</span>
                <span>Prestations proposées</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Design UI/UX :</strong> conception d&apos;interfaces, wireframes, prototypes, design systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Développement Fullstack :</strong> sites web, applications web, APIs, bases de données</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Connect :</strong> intégrations, automatisation, synchronisation d&apos;outils</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Maintenance :</strong> support technique, mises à jour, corrections de bugs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Devis et commande */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 03.</span>
                <span>Devis et commande</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>Chaque projet fait l&apos;objet d&apos;un devis détaillé gratuit comprenant :</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>La description détaillée des prestations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Le calendrier prévisionnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>Le montant total et les modalités de paiement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span>La durée de validité du devis (30 jours)</span>
                  </li>
                </ul>
                <p className="pt-2">La commande est ferme à réception du devis signé et de l&apos;acompte.</p>
              </div>
            </div>

            {/* 4. Tarifs et paiement */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 04.</span>
                <span>Tarifs et paiement</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Acompte :</strong> 30% à 50% à la commande</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Paiements intermédiaires :</strong> selon jalons définis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    <span><strong className="text-white font-medium">Solde :</strong> à la livraison finale</span>
                  </li>
                </ul>
                <p className="pt-2">Paiement par virement bancaire. Tout retard entraîne des pénalités au taux légal.</p>
              </div>
            </div>

            {/* 5. Propriété intellectuelle */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 05.</span>
                <span>Propriété intellectuelle</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Les créations restent la propriété exclusive de {siteConfig.name} jusqu&apos;au paiement intégral.
                  Après paiement complet, le client obtient les droits d&apos;utilisation définis dans le devis.
                  {siteConfig.name} conserve le droit de mentionner le projet dans son portfolio.
                </p>
              </div>
            </div>

            {/* 6. Responsabilité */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 06.</span>
                <span>Responsabilité</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  {siteConfig.name} s&apos;engage à mettre en œuvre tous les moyens nécessaires pour mener à bien les prestations.
                  Sa responsabilité est limitée au montant total de la prestation.
                </p>
              </div>
            </div>

            {/* 7. Droit applicable */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm">// 07.</span>
                <span>Droit applicable</span>
              </h2>
              <div className="space-y-3 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Les présentes CGV sont soumises au droit applicable. En cas de litige, les parties recherchent une solution amiable avant toute action judiciaire.
                </p>
                <p className="pt-2">
                  Contact :{' '}
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