// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjetsRecents, getArticlesRecents, getAvisRecents, getTotalProjets, getTotalArticles } from '@/lib/prisma';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.slogan}`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const services = [
  {
    titre: 'UI/UX Design',
    description: 'Interfaces immersives & design systems sur mesure. De la recherche utilisateur aux prototypes haute fidélité taillés pour convertir.',
    lien: '/services/design-ui-ux',
    tag: 'Design System & Product',
  },
  {
    titre: 'Développement Fullstack',
    description: 'Applications web scalables et ultra-rapides. Architecture moderne, code rigoureux et performances sans compromis.',
    lien: '/services/developpement-fullstack',
    tag: 'Next.js & Cloud Architecture',
  },
  {
    titre: 'Connect',
    description: 'Intégrations API complexes et automatisation des workflows. Un écosystème digital unifié et synchronisé en temps réel.',
    lien: '/services/connect',
    tag: 'APIs & Automations',
  },
];

const stats = [
  { valeur: '50+', label: 'Projets livrés' },
  { valeur: '15+', label: 'Partenaires fidèles' },
  { valeur: '3+', label: 'Années d’expertise' },
  { valeur: '100%', label: 'Performance SEO' },
];

const categoriesLabels: Record<string, string> = {
  UI_UX_DESIGN: 'UI/UX Design',
  FULLSTACK: 'Fullstack',
  CONNECT: 'Connect',
};

const blogCategoriesLabels: Record<string, string> = {
  DESIGN: 'Design',
  DEVELOPPEMENT: 'Développement',
  SEO: 'SEO',
  BUSINESS: 'Business',
  TUTORIEL: 'Tutoriel',
  ACTUALITE: 'Actualité',
};

export default async function HomePage() {
  const projetsRecents = await getProjetsRecents();
  const articlesRecents = await getArticlesRecents();
  const avisRecents = await getAvisRecents();
  const totalProjets = await getTotalProjets();
  const totalArticles = await getTotalArticles();

  return (
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white overflow-x-hidden">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, potentialAction: { '@type': 'SearchAction', target: `${siteConfig.url}/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }] }} />

      {/* ============ HERO SECTION (IMMERSIVE & EDITORIAL) ============ */}
      <section className="relative min-h-[100svh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-12 border-b border-white/10">
        {/* Ambient glow backgrounds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-violet-600/20 via-purple-600/10 to-indigo-500/0 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Top bar info */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs tracking-widest uppercase text-violet-300/80 font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Disponible pour nouveaux projets</span>
          </div>
          <span className="hidden md:inline-block text-gray-500">// STUDIO CRÉATIF & TECHNIQUE — 2026</span>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="mb-6 inline-block">
                <img src="/logo/kja-studio-labs.webp" alt="KJA Studio Labs" className="h-12 sm:h-16 lg:h-20 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] mb-8">
                Nous créons <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-200 to-white">l'excellence numérique</span> et le code.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-8">
                Studio francophone indépendant. Nous concevons des expériences web d'avant-garde, alliant design émotionnel et performances fullstack absolues.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio" className="group relative px-8 py-4 bg-white text-gray-950 font-heading font-bold text-sm tracking-wider uppercase rounded-full overflow-hidden transition-all duration-300 hover:bg-violet-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                  <span className="relative z-10 flex items-center gap-2">
                    Voir les projets
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white/5 border border-white/10 hover:border-violet-500/50 text-white font-heading font-semibold text-sm tracking-wider uppercase rounded-full backdrop-blur-md transition-all duration-300 hover:bg-white/10">
                  Lancer un brief
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker/stats preview */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white mb-1">{stat.valeur}</span>
              <span className="text-xs tracking-wider text-gray-400 uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ EXPERTISES (BENTO EDITORIAL) ============ */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 relative border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs tracking-widest text-violet-400 uppercase block mb-3">// 01. EXPERTISES</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight">Savoir-faire sur mesure</h2>
            </div>
            <p className="text-gray-400 max-w-md text-sm sm:text-base font-light">
              Une maîtrise totale de la chaîne de valeur numérique, du concept visuel jusqu'au déploiement cloud hautement scalable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link 
                key={service.titre} 
                href={service.lien}
                className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-violet-500/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1.5"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-500/20 transition-all duration-500" />
                
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300">
                      {service.tag}
                    </span>
                    <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-violet-400 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4 group-hover:text-violet-200 transition-colors">
                    {service.titre}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-heading font-semibold text-violet-400 group-hover:text-white transition-colors">
                  <span>Explorer le service</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO / PROJETS RÉCENTS ============ */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 relative border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-widest text-violet-400 uppercase block mb-3">// 02. PORTFOLIO</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight">Travaux récents</h2>
            </div>
            {totalProjets > 3 && (
              <Link href="/portfolio" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-sm font-semibold tracking-wide transition-all self-start md:self-auto hover:bg-white/10">
                Tous les projets ({totalProjets})
              </Link>
            )}
          </div>

          {projetsRecents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projetsRecents.map((projet) => (
                <Link 
                  key={projet.id} 
                  href={`/portfolio/${projet.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-violet-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] hover:-translate-y-2"
                >
                  <div className="aspect-[16/11] bg-black/40 overflow-hidden relative">
                    {projet.imagePrincipale ? (
                      <img src={projet.imagePrincipale} alt={projet.titre} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-violet-950/30 flex items-center justify-center text-violet-400">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                        Découvrir l'étude de cas →
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="font-mono text-xs text-violet-400 uppercase tracking-wider block mb-2">
                      {categoriesLabels[projet.categorie] || projet.categorie}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-violet-300 transition-colors line-clamp-1 mb-3">
                      {projet.titre}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed">
                      {projet.descriptionCourte}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
              <p className="text-gray-400 font-mono text-sm">Aucun projet répertorié pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ BLOG & INSIGHTS ============ */}
      {articlesRecents.length > 0 && (
        <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 relative border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-mono text-xs tracking-widest text-violet-400 uppercase block mb-3">// 03. INSIGHTS</span>
                <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight">Pensées & Articles</h2>
              </div>
              {totalArticles > 6 && (
                <Link href="/blog" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-sm font-semibold tracking-wide transition-all self-start md:self-auto hover:bg-white/10">
                  Tous les articles ({totalArticles})
                </Link>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articlesRecents.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group block rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-violet-500/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-[16/10] bg-black/40 overflow-hidden">
                    {article.imagePrincipale ? (
                      <img src={article.imagePrincipale} alt={article.titre} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-violet-950/20 flex items-center justify-center text-violet-400">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono text-xs text-violet-400 uppercase tracking-wider">
                        {blogCategoriesLabels[article.categorie] || article.categorie}
                      </span>
                      {article.tempsLecture && (
                        <span className="font-mono text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
                          {article.tempsLecture} min
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-violet-300 transition-colors line-clamp-2 mb-3">
                      {article.titre}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed mb-6">
                      {article.extrait}
                    </p>
                    <span className="font-mono text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ AVIS CLIENTS ============ */}
      {avisRecents.length > 0 && (
        <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 relative border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="font-mono text-xs tracking-widest text-violet-400 uppercase block mb-3">// 04. TÉMOIGNAGES</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight mb-4">Ce qu'ils en disent</h2>
              <p className="text-gray-400 font-light">La confiance et le succès de nos partenaires sont nos plus beaux trophées.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {avisRecents.slice(0, 3).map((avis, index) => (
                <div key={avis.id} className={`p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between ${index === 0 ? 'md:col-span-2' : ''}`}>
                  <div>
                    <div className="flex items-center gap-1 mb-6 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < avis.note ? 'text-amber-400' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-base sm:text-lg text-gray-300 font-light italic leading-relaxed mb-8">
                      &ldquo;{avis.commentaire}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center font-heading font-bold text-violet-300">
                      {avis.nomClient.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-base">{avis.nomClient}</h4>
                      {(avis.poste || avis.entreprise) && (
                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                          {avis.poste}{avis.poste && avis.entreprise && ' • '}{avis.entreprise}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CALL TO ACTION FINAL (HIGH IMPACT) ============ */}
      <section className="py-32 sm:py-44 px-4 sm:px-6 lg:px-12 relative text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[350px] sm:h-[500px] bg-violet-600/20 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="font-mono text-xs tracking-widest text-violet-400 uppercase block mb-4">// COLLABORATION</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-8">
            Prêt à marquer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-violet-400">les esprits ?</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Discutons dès aujourd'hui de votre vision et donnons vie à une expérience numérique d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-white text-gray-950 font-heading font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:bg-violet-100 transition-all duration-300">
              Démarrer le projet
            </Link>
            <Link href="/services" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:border-violet-500/50 text-white font-heading font-semibold text-sm tracking-wider uppercase rounded-full backdrop-blur-md transition-all duration-300">
              Voir nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}