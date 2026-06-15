// src/app/services/connect/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Service Connect',
  description: 'Solutions Connect par KJA Studio Labs. APIs, webhooks, automatisation, intégrations CRM, synchronisation en temps réel, Stripe, HubSpot.',
  alternates: { canonical: '/services/connect' },
  openGraph: {
    title: 'Connect | KJA Studio Labs',
    description: 'Intégrations API, automatisation et synchronisation de vos outils digitaux.',
    url: `${siteConfig.url}/services/connect`,
  },
};

const integrations = [
  { nom: 'APIs REST & GraphQL', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/graphql.svg', description: 'Création d\'APIs sur mesure documentées (Swagger/OpenAPI) pour connecter tous vos services entre eux.' },
  { nom: 'Webhooks', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/webhook.svg', description: 'Communication en temps réel entre applications. Notifications instantanées et événements automatisés.' },
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

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" /><div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span className="text-white font-medium">Connect</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Connect</h1>
          <p className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">Connectez vos outils, automatisez vos workflows, synchronisez vos données. Un écosystème digital fluide et sans couture.</p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Pourquoi Connect ?</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">Fini les outils qui ne communiquent pas</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Votre entreprise utilise probablement une dizaine d&apos;outils différents : CRM, emailing, analytics, paiement, stockage, ERP... <strong>Et s&apos;ils travaillaient ensemble de manière fluide ?</strong></p>
                <p>Nous créons des <strong>ponts sur mesure</strong> entre vos services pour automatiser vos processus, éliminer les tâches manuelles répétitives et synchroniser vos données en temps réel.</p>
                <p>Résultat : <strong>moins d&apos;erreurs, plus de productivité</strong>, et une vision unifiée de votre activité. Vous reprenez le contrôle de votre écosystème digital.</p>
              </div>
            </div>
            <div className="space-y-4">
              {avantages.map((item) => (
                <div key={item.titre} className="flex gap-4 p-4 bg-violet-50/50 rounded-xl">
                  <svg className="w-5 h-5 text-violet shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <div><h3 className="font-heading font-semibold text-gray-900">{item.titre}</h3><p className="text-sm text-gray-600">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Méthode</span><h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Comment nous travaillons</h2><p className="text-gray-600 max-w-xl mx-auto">Une approche structurée pour des intégrations réussies et durables</p></div>
          <div className="grid sm:grid-cols-3 gap-6">
            {methodologie.map((p) => (
              <div key={p.etape} className="card p-6 text-center group">
                <span className="text-4xl font-heading font-bold text-violet-200 group-hover:text-violet transition-colors">{p.etape}</span>
                <h3 className="font-heading font-bold text-lg text-gray-900 mt-3 mb-2">{p.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intégrations */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Intégrations</span><h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Ce que nous connectons</h2><p className="text-gray-600 max-w-xl mx-auto">APIs, webhooks, services SaaS : nous intégrons tout votre écosystème digital</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((item) => (
              <div key={item.nom} className="card p-4 flex items-start gap-3 group hover:shadow-violet-md transition-all">
                <img src={item.logo} alt={item.nom} className="h-7 w-7 shrink-0 mt-0.5" />
                <div><h3 className="font-heading font-bold text-sm text-gray-900 group-hover:text-violet transition-colors">{item.nom}</h3><p className="text-xs text-gray-600 leading-relaxed mt-0.5">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-violet-300 rounded-full blur-[150px] -translate-x-1/2" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Prêt à automatiser votre business ?</h2>
          <p className="text-violet-200 mb-8">Parlons de vos outils et créons ensemble l&apos;écosystème digital qui va accélérer votre croissance.</p>
          <Link href="/contact" className="btn-primary !bg-white !text-violet text-sm sm:text-base px-8 py-4">Démarrer un projet</Link>
        </div>
      </section>
    </>
  );
}