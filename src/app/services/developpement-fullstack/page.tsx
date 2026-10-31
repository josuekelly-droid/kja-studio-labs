// src/app/services/developpement-fullstack/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Développement Fullstack | Next.js, React, Node.js & Cloud',
  description: 'Développement Fullstack d\'exception par KJA Studio Labs. Next.js, React, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Supabase et architecture scalable.',
  alternates: { canonical: '/services/developpement-fullstack' },
  openGraph: {
    title: 'Développement Fullstack | KJA Studio Labs',
    description: 'Applications web modernes : frontend, backend, bases de données, DevOps et performances d\'élite.',
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
            <span className="text-white font-medium">Développement Fullstack</span>
          </nav>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Développement <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Fullstack</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Des applications web modernes, rapides et évolutives. Du frontend au backend, du mobile au cloud, nous maîtrisons toute la stack.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md">
                Notre approche
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-6 tracking-tight">
                Code propre, architecture solide, performance maximale
              </h2>
              <div className="space-y-4 text-gray-400 font-light leading-relaxed">
                <p>Nous développons des applications <strong className="text-white font-medium">performantes, sécurisées et scalables</strong> avec les technologies les plus modernes. Chaque ligne de code est pensée pour être maintenable et évolutive dans le temps.</p>
                <p>Notre stack maîtrise l&apos;ensemble du spectre : <strong className="text-white font-medium">React/Next.js/Vue.js en frontend</strong>, <strong className="text-white font-medium">Node.js/Python/PHP en backend</strong>, <strong className="text-white font-medium">PostgreSQL/MongoDB/MySQL en base de données</strong>, le tout avec TypeScript pour une fiabilité maximale.</p>
                <p>Nous appliquons les meilleures pratiques : <strong className="text-white font-medium">tests automatisés, CI/CD, Docker, revues de code et documentation</strong> pour garantir la qualité sur le long terme.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { titre: 'Performance Core Web Vitals', desc: 'Score 95+ sur Google PageSpeed Insights' },
                { titre: 'SEO intégré', desc: 'Metadata, JSON-LD, sitemap, rich snippets' },
                { titre: 'Sécurité OWASP Top 10', desc: 'XSS, CSRF, injection SQL, rate limiting' },
                { titre: 'Architecture scalable', desc: 'Prête pour des milliers d\'utilisateurs simultanés' },
              ].map((item) => (
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

      {/* Services Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Prestations
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Ce que nous développons
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Des solutions sur mesure pour chaque besoin de votre écosystème
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div 
                key={s.titre} 
                className="p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-3 group-hover:text-violet-300 transition-colors">
                  {s.titre}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frontend Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Frontend & Mobile
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Technologies Frontend & Mobile
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Frameworks, bibliothèques et outils pour des interfaces exceptionnelles
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontend.map((tech) => (
              <div 
                key={tech.nom} 
                className="p-6 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.12)] transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:bg-violet-600/20 transition-colors">
                  <img src={tech.logo} alt={tech.nom} className="h-6 w-6 object-contain filter brightness-200" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                    {tech.nom}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mt-1">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 font-heading font-medium text-xs rounded-full mb-4 backdrop-blur-md">
              Backend & DevOps
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Technologies Backend & DevOps
            </h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              APIs, bases de données, authentification, conteneurisation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {backendList.map((tech) => (
              <div 
                key={tech.nom} 
                className="p-6 rounded-2xl bg-[#0c0616]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.12)] transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:bg-violet-600/20 transition-colors">
                  <img src={tech.logo} alt={tech.nom} className="h-6 w-6 object-contain filter brightness-200" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                    {tech.nom}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mt-1">
                    {tech.description}
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
            Besoin d&apos;une application web ?
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Discutons de votre projet et définissons la meilleure stack technique pour le réaliser avec brio.
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