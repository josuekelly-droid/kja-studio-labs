// src/app/services/connect/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service Connect | Intégrations API & Automatisation Workflows',
  description: 'Solutions Connect par KJA Studio Labs. APIs, webhooks, automatisation, intégrations CRM, synchronisation en temps réel, Stripe, HubSpot et écosystèmes sur-mesure.',
  alternates: { canonical: '/services/connect' },
  openGraph: {
    title: 'Connect | KJA Studio Labs',
    description: 'Intégrations API, automatisation et synchronisation de vos outils digitaux pour une productivité maximale.',
    url: `${siteConfig.url}/services/connect`,
  },
};

const integrations = [
  { nom: 'APIs REST & GraphQL', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/graphql.svg', description: 'Création d\'APIs sur mesure documentées (Swagger/OpenAPI) pour connecter tous vos services entre eux.' },
  { nom: 'Webhooks', iconSvg: true, description: 'Communication en temps réel entre applications. Notifications instantanées et événements automatisés.' },
  { nom: 'Automatisation', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg', description: 'Workflows automatisés avec Zapier, Make (Integromat) et n8n. Zéro code, 100% productivité.' },
  { nom: 'Stripe', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg', description: 'Paiement en ligne sécurisé. Abonnements, facturation, marketplace. Leader mondial du paiement.' },
  { nom: 'PayPal', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg', description: 'Solution de paiement internationale avec couverture dans plus de 200 pays.' },
  { nom: 'HubSpot', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg', description: 'CRM complet : gestion des contacts, pipelines de vente, marketing automation et service client.' },
  { nom: 'Salesforce', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg', description: 'CRM enterprise leader. Personnalisation avancée et intégrations profondes.' },
  { nom: 'Mailchimp', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mailchimp.svg', description: 'Plateforme d\'emailing et marketing automation. Campagnes, segmentation, analytics.' },
  { nom: 'SendGrid', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sendgrid.svg', description: 'Service d\'envoi d\'emails transactionnels. APIs fiables pour emails de bienvenue, reset password, etc.' },
  { nom: 'Google Analytics', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg', description: 'Analyse d\'audience puissante. GA4 avec événements personnalisés et rapports avancés.' },
  { nom: 'Cloudinary', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cloudinary.svg', description: 'Gestion d\'images et vidéos dans le cloud. Upload, optimisation, transformations et CDN intégrés.' },
  { nom: 'AWS S3', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazons3.svg', description: 'Stockage objet scalable d\'Amazon. Pour fichiers, backups, médias et big data.' },
  { nom: 'Auth0', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/auth0.svg', description: 'Plateforme d\'authentification et de gestion des identités. SSO, MFA, social login.' },
  { nom: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/firebase.svg', description: 'Plateforme Google : auth, base temps réel, hébergement, fonctions cloud, analytics.' },
  { nom: 'Slack', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg', description: 'Notifications et alertes en temps réel dans vos canaux Slack. Restez informés automatiquement.' },
];

const avantages = [
  { titre: 'Moins d\'erreurs', desc: 'Supprimez les saisies manuelles et les doubles entrées' },
  { titre: 'Gain de temps', desc: 'Automatisez les workflows répétitifs' },
  { titre: 'Données unifiées', desc: 'Une source de vérité unique pour toutes vos données' },
  { titre: 'Scalabilité', desc: 'Votre écosystème évolue avec votre croissance' },
];

const methodologie = [
  { etape: '01', titre: 'Audit de l\'existant', desc: 'Nous analysons vos outils actuels, vos flux de données et vos processus. Identification des goulets d\'étranglement et opportunités d\'intégration.' },
  { etape: '02', titre: 'Architecture de la solution', desc: 'Conception de l\'architecture cible : APIs à créer, flux de données, synchronisation, sécurité et monitoring.' },
  { etape: '03', titre: 'Déploiement & Suivi', desc: 'Mise en place progressive, tests, documentation complète, formation de vos équipes et suivi continu.' },
];

export default function ConnectPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'Connect', provider: { '@type': 'Organization', name: siteConfig.name }, description: 'Intégrations API, automatisation et synchronisation d\'outils digitaux.', url: `${siteConfig.url}/services/connect` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'Connect', item: `${siteConfig.url}/services/connect` }] }} />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-24 lg:pb-28 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white font-medium">Connect</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            KJA <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Connect</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Connectez vos outils, automatisez vos workflows, synchronisez vos données. Un écosystème digital fluide et sans couture.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md">
                Pourquoi Connect ?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-6 tracking-tight">
                Fini les outils qui ne communiquent pas
              </h2>
              <div className="space-y-4 text-gray-400 font-light leading-relaxed">
                <p>Votre entreprise использует probablement une dizaine d&apos;outils différents : CRM, emailing, analytics, paiement, stockage, ERP... <strong className="text-white font-medium">Et s&apos;ils travaillaient ensemble de manière fluide ?</strong></p>
                <p>Nous créons des <strong className="text-white font-medium">ponts sur mesure</strong> entre vos services pour automatiser vos processus, éliminer les tâches manuelles répétitives et synchroniser vos données en temps réel.</p>
                <p>Résultat : <strong className="text-white font-medium">moins d&apos;erreurs, plus de productivité</strong>, et une vision unifiée de votre activité. Vous reprenez le contrôle de votre écosystème digital.</p>
              </div>
            </div>

            <div className="space-y-4">
              {avantages.map((item) => (
                <div key={item.titre} className="flex gap-4 p-5 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm sm:text-base">{item.titre}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Méthode
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Comment nous travaillons
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Une approche structurée pour des intégrations réussies et durables
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {methodologie.map((p) => (
              <div 
                key={p.etape} 
                className="p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-heading font-bold text-violet-400/70 group-hover:text-violet-300 transition-colors">
                    {p.etape}
                  </span>
                  <h3 className="font-heading font-bold text-white text-lg mt-4 mb-3 group-hover:text-violet-300 transition-colors">
                    {p.titre}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intégrations Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Intégrations
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Ce que nous connectons
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              APIs, webhooks, services SaaS : nous intégrons tout votre écosystème digital
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((item) => (
              <div 
                key={item.nom} 
                className="p-6 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.12)] transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:bg-violet-600/20 transition-colors">
                  {item.iconSvg ? (
                    <svg className="w-6 h-6 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <img src={item.logo} alt={item.nom} className="h-6 w-6 object-contain filter brightness-200" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                    {item.nom}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-28 bg-[#05020a] relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            Prêt à automatiser votre business ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Parlons de vos outils et créons ensemble l&apos;écosystème digital qui va accélérer votre croissance.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 text-sm sm:text-base font-heading font-bold rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Démarrer un projet
          </Link>
        </div>
      </section>
    </>
  );
}