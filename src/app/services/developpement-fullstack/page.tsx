// src/app/services/developpement-fullstack/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Développement Fullstack',
  description: 'Développement Fullstack par KJA Studio Labs. Next.js, React, TypeScript, Node.js, Python, PHP, Prisma, PostgreSQL, MongoDB, Supabase.',
  alternates: { canonical: '/services/developpement-fullstack' },
  openGraph: {
    title: 'Développement Fullstack | KJA Studio Labs',
    description: 'Applications web modernes : frontend, backend, bases de données, DevOps.',
    url: `${siteConfig.url}/services/developpement-fullstack`,
  },
};

const frontend = [
  { nom: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nextdotjs.svg', description: 'Framework React avec SSR, SSG, ISR et edge functions. Le choix n°1 pour les applications web modernes.' },
  { nom: 'React', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/react.svg', description: 'Bibliothèque UI pour interfaces dynamiques, composants réutilisables et état global (Context, Redux, Zustand).' },
  { nom: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vuedotjs.svg', description: 'Framework progressif avec réactivité fine, composants monofichiers et écosystème riche (Nuxt, Pinia).' },
  { nom: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/typescript.svg', description: 'JavaScript typé pour un code robuste, auto-complétion IDE et détection d\'erreurs à la compilation.' },
  { nom: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/javascript.svg', description: 'Langage natif du web. ES6+, async/await, modules, manipulation DOM et APIs navigateur.' },
  { nom: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tailwindcss.svg', description: 'Framework CSS utilitaire pour un design rapide, cohérent et responsive sans quitter le HTML.' },
  { nom: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bootstrap.svg', description: 'Framework CSS historique avec composants prêts à l\'emploi et grille responsive éprouvée.' },
  { nom: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/html5.svg', description: 'Structure sémantique des pages web, accessibilité native et SEO on-page optimisé.' },
  { nom: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/css3.svg', description: 'Mise en page avancée : Flexbox, Grid, animations, variables CSS et responsive design.' },
  { nom: 'Vite', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vite.svg', description: 'Bundler ultra-rapide pour le développement frontend avec HMR instantané et build optimisé.' },
  { nom: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/react.svg', description: 'Développement d\'applications mobiles iOS et Android avec un codebase React partagé.' },
];

const backendList = [
  { nom: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nodedotjs.svg', description: 'Runtime JavaScript côté serveur, asynchrone et événementiel. Idéal pour APIs temps réel.' },
  { nom: 'Express', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/express.svg', description: 'Framework web minimaliste pour Node.js. Routage, middlewares, APIs REST robustes.' },
  { nom: 'Python', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/python.svg', description: 'Langage polyvalent pour le backend (Django, Flask, FastAPI), l\'IA et l\'automatisation.' },
  { nom: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/php.svg', description: 'Langage serveur éprouvé (Laravel, Symfony). Idéal pour CMS, e-commerce et APIs.' },
  { nom: 'Prisma ORM', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/prisma.svg', description: 'ORM moderne type-safe pour TypeScript/JavaScript. Supporte PostgreSQL, MySQL, MongoDB, SQLite.' },
  { nom: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/postgresql.svg', description: 'Base de données relationnelle robuste, scalable, avec support JSON, full-text search et géolocalisation.' },
  { nom: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mongodb.svg', description: 'Base NoSQL orientée documents. Flexible, scalable, idéale pour données non structurées.' },
  { nom: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mysql.svg', description: 'Base relationnelle la plus utilisée au monde. Fiable, performante, excellent écosystème.' },
  { nom: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/supabase.svg', description: 'Alternative open source à Firebase. Base PostgreSQL, auth, storage et real-time intégrés.' },
  { nom: 'NextAuth.js', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nextdotjs.svg', description: 'Authentification complète pour Next.js : OAuth, magic links, credentials, sessions.' },
  { nom: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/docker.svg', description: 'Conteneurisation pour développement et déploiement reproductibles sur tous les environnements.' },
];

const services = [
  { titre: 'Applications Web', desc: 'SaaS, dashboards, plateformes sur mesure avec authentification, rôles et permissions.' },
  { titre: 'Sites Vitrines', desc: 'Sites rapides, SEO-friendly, design premium avec CMS headless pour l\'autonomie.' },
  { titre: 'E-commerce', desc: 'Boutiques en ligne avec Stripe/PayPal, gestion des stocks, tunnel d\'achat optimisé.' },
  { titre: 'APIs REST & GraphQL', desc: 'APIs robustes, documentées (Swagger), versionnées, avec rate limiting et caching.' },
  { titre: 'Applications Mobiles', desc: 'Apps iOS/Android avec React Native : code partagé, performances natives.' },
  { titre: 'Migration & Refonte', desc: 'Migration de legacy vers stack moderne sans perte de données ni interruption de service.' },
];

export default function DevFullstackPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'Développement Fullstack', provider: { '@type': 'Organization', name: siteConfig.name }, description: 'Développement fullstack : Next.js, React, TypeScript, Node.js, Python, PHP, PostgreSQL, MongoDB.', url: `${siteConfig.url}/services/developpement-fullstack` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` }, { '@type': 'ListItem', position: 3, name: 'Développement Fullstack', item: `${siteConfig.url}/services/developpement-fullstack` }] }} />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" /><div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span className="text-white font-medium">Développement Fullstack</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4">Développement Fullstack</h1>
          <p className="text-lg sm:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">Des applications web modernes, rapides et évolutives. Du frontend au backend, du mobile au cloud, nous maîtrisons toute la stack.</p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Notre approche</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">Code propre, architecture solide, performance maximale</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Nous développons des applications <strong>performantes, sécurisées et scalables</strong> avec les technologies les plus modernes. Chaque ligne de code est pensée pour être maintenable et évolutive dans le temps.</p>
                <p>Notre stack maîtrise l&apos;ensemble du spectre : <strong>React/Next.js/Vue.js en frontend</strong>, <strong>Node.js/Python/PHP en backend</strong>, <strong>PostgreSQL/MongoDB/MySQL en base de données</strong>, le tout avec TypeScript pour une fiabilité maximale.</p>
                <p>Nous appliquons les meilleures pratiques : <strong>tests automatisés (unit, e2e), CI/CD, Docker, revue de code, documentation</strong> pour garantir la qualité sur le long terme.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { titre: 'Performance Core Web Vitals', desc: 'Score 95+ sur Google PageSpeed Insights' },
                { titre: 'SEO intégré', desc: 'Metadata, JSON-LD, sitemap, rich snippets' },
                { titre: 'Sécurité OWASP Top 10', desc: 'XSS, CSRF, injection SQL, rate limiting' },
                { titre: 'Architecture scalable', desc: 'Prête pour des milliers d\'utilisateurs simultanés' },
              ].map((item) => (
                <div key={item.titre} className="flex gap-4 p-4 bg-violet-50/50 rounded-xl">
                  <svg className="w-5 h-5 text-violet shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <div><h3 className="font-heading font-semibold text-gray-900">{item.titre}</h3><p className="text-sm text-gray-600">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Prestations</span><h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Ce que nous développons</h2><p className="text-gray-600 max-w-xl mx-auto">Des solutions sur mesure pour chaque besoin</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.titre} className="card p-6 group hover:shadow-violet-md transition-all">
                <svg className="w-8 h-8 text-violet mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <h3 className="font-heading font-bold text-gray-900 mb-2">{s.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frontend */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Frontend</span><h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Technologies Frontend & Mobile</h2><p className="text-gray-600 max-w-xl mx-auto">Frameworks, bibliothèques et outils pour des interfaces exceptionnelles</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {frontend.map((tech) => (
              <div key={tech.nom} className="card p-4 flex items-start gap-3 group hover:shadow-violet-md transition-all">
                <img src={tech.logo} alt={tech.nom} className="h-7 w-7 shrink-0 mt-0.5" />
                <div><h3 className="font-heading font-bold text-sm text-gray-900 group-hover:text-violet transition-colors">{tech.nom}</h3><p className="text-xs text-gray-600 leading-relaxed mt-0.5">{tech.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backend */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 font-heading font-medium text-xs rounded-full mb-4">Backend & Base de données</span><h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Technologies Backend & DevOps</h2><p className="text-gray-600 max-w-xl mx-auto">APIs, bases de données, authentification, conteneurisation</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {backendList.map((tech) => (
              <div key={tech.nom} className="card p-4 flex items-start gap-3 group hover:shadow-violet-md transition-all">
                <img src={tech.logo} alt={tech.nom} className="h-7 w-7 shrink-0 mt-0.5" />
                <div><h3 className="font-heading font-bold text-sm text-gray-900 group-hover:text-violet transition-colors">{tech.nom}</h3><p className="text-xs text-gray-600 leading-relaxed mt-0.5">{tech.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-violet-300 rounded-full blur-[150px] -translate-x-1/2" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Besoin d&apos;une application web ?</h2>
          <p className="text-violet-200 mb-8">Discutons de votre projet et définissons la meilleure stack technique pour le réaliser.</p>
          <Link href="/contact" className="btn-primary !bg-white !text-violet text-sm sm:text-base px-8 py-4">Démarrer un projet</Link>
        </div>
      </section>
    </>
  );
}