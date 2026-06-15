// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjetsRecents, getArticlesRecents, getAvisRecents, getTotalProjets, getTotalArticles } from '@/lib/prisma';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.slogan}`,
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const services = [
  {
    titre: 'UI/UX Design',
    description: 'Interfaces modernes et intuitives. Recherche utilisateur, wireframes, prototypes et design systems complets.',
    lien: '/services/design-ui-ux',
    icone: '🎨',
  },
  {
    titre: 'Développement Fullstack',
    description: 'Applications web performantes. Frontend réactif, backend robuste, bases de données optimisées.',
    lien: '/services/developpement-fullstack',
    icone: '⚙️',
  },
  {
    titre: 'Connect',
    description: 'Intégrations API, automatisation, synchronisation. Connectez votre écosystème digital.',
    lien: '/services/connect',
    icone: '🔗',
  },
];

const stats = [
  { valeur: '50+', label: 'Projets réalisés' },
  { valeur: '15+', label: 'Clients satisfaits' },
  { valeur: '3+', label: 'Années d\'expérience' },
  { valeur: '100%', label: 'SEO optimisé' },
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
  // Données dynamiques depuis la BDD (avec cache React)
  const projetsRecents = await getProjetsRecents();
  const articlesRecents = await getArticlesRecents();
  const avisRecents = await getAvisRecents();
  const totalProjets = await getTotalProjets();
  const totalArticles = await getTotalArticles();

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteConfig.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
          ],
        }}
      />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-hero-pattern">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-violet-200 rounded-full blur-[80px] sm:blur-[128px] animate-pulse" />
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-violet-400 rounded-full blur-[80px] sm:blur-[128px] animate-pulse" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 sm:mb-10 animate-fade-in">
              <img
                src="/logo/kja-studio-labs.jpg"
                alt="KJA Studio Labs - Design UI/UX & Développement Fullstack"
                className="h-12 sm:h-16 lg:h-20 mx-auto"
              />
            </div>

            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-4 sm:mb-6 animate-slide-up">
              Design{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-white">
                UI/UX
              </span>
              {' '}& Développement{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200">
                Fullstack
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-violet-200/90 mb-8 sm:mb-10 lg:mb-12 max-w-xl mx-auto animate-slide-up leading-relaxed">
              Studio créatif francophone. Solutions digitales sur mesure, design premium, code propre, SEO optimisé pour performer à l&apos;international.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center animate-slide-up">
              <Link href="/portfolio" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                Voir nos projets
              </Link>
              <Link href="/contact" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                Discutons de votre projet
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 sm:w-1.5 h-2.5 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
              Nos expertises
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
              Trois piliers complémentaires
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto">
              Une approche holistique pour concevoir, développer et connecter vos projets digitaux
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.titre}
                href={service.lien}
                className="card p-5 sm:p-6 lg:p-8 group block"
              >
                <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{service.icone}</span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3 group-hover:text-violet transition-colors">
                  {service.titre}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-violet font-heading font-medium text-sm group-hover:gap-2.5 sm:group-hover:gap-3 transition-all">
                  En savoir plus
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-violet mb-1 sm:mb-2">
                  {stat.valeur}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROJETS RÉCENTS (Dynamique) ============ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
              Projets récents
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto">
              Découvrez nos dernières réalisations et études de cas détaillées
            </p>
          </div>

          {projetsRecents.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
                {projetsRecents.map((projet) => (
                  <Link
                    key={projet.id}
                    href={`/portfolio/${projet.slug}`}
                    className="card overflow-hidden group block"
                  >
                    <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      {projet.imagePrincipale ? (
                        <img
                          src={projet.imagePrincipale}
                          alt={projet.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-4xl text-gray-300">🖼️</span>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <span className="text-xs font-heading font-semibold text-violet uppercase tracking-wider">
                        {categoriesLabels[projet.categorie] || projet.categorie}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 mt-1.5 group-hover:text-violet transition-colors line-clamp-1">
                        {projet.titre}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {projet.descriptionCourte}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {totalProjets > 3 && (
                <div className="text-center">
                  <Link href="/portfolio" className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                    Voir tous les projets ({totalProjets})
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun projet pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Les projets seront publiés depuis le dashboard admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ DERNIERS ARTICLES (Dynamique) ============ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-3 sm:mb-4 shadow-sm">
              Blog
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
              Derniers articles
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto">
              Conseils, tutoriels et actualités sur le design, le développement et le SEO
            </p>
          </div>

          {articlesRecents.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
                {articlesRecents.map((article) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="card overflow-hidden group block bg-white"
                  >
                    <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      {article.imagePrincipale ? (
                        <img
                          src={article.imagePrincipale}
                          alt={article.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-4xl text-gray-300">📝</span>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-heading font-semibold text-violet uppercase tracking-wider">
                          {blogCategoriesLabels[article.categorie] || article.categorie}
                        </span>
                        {article.tempsLecture && (
                          <span className="text-xs text-gray-400">{article.tempsLecture} min de lecture</span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 group-hover:text-violet transition-colors line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {article.extrait}
                      </p>
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {totalArticles > 3 && (
                <div className="text-center">
                  <Link href="/blog" className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                    Voir tous les articles ({totalArticles})
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun article pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Les articles seront publiés depuis le dashboard admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ AVIS CLIENTS (Dynamique) ============ */}
      {avisRecents.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-violet-50 text-violet-700 font-heading font-medium text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
                Avis clients
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
                Ils nous font confiance
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl mx-auto">
                Ce que nos clients disent de notre travail
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
              {avisRecents.map((avis) => (
                <div key={avis.id} className="card p-5 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < avis.note ? 'text-yellow-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 italic">
                    &ldquo;{avis.commentaire}&rdquo;
                  </p>
                  <div>
                    <p className="font-heading font-semibold text-gray-900 text-sm sm:text-base">
                      {avis.nomClient}
                    </p>
                    {(avis.poste || avis.entreprise) && (
                      <p className="text-xs sm:text-sm text-gray-500">
                        {avis.poste}{avis.poste && avis.entreprise && ' chez '}{avis.entreprise}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {avisRecents.length >= 3 && (
              <div className="text-center">
                <Link href="/avis" className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                  Voir tous les avis
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ CTA FINAL ============ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-0 left-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-300 rounded-full blur-[100px] sm:blur-[150px] -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 lg:mb-6">
            Prêt à lancer votre projet ?
          </h2>
          <p className="text-base sm:text-lg text-violet-200/90 mb-6 sm:mb-8 lg:mb-10 max-w-lg mx-auto">
            Discutons ensemble de vos objectifs et créons une solution sur mesure.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact" className="btn-primary !bg-white !text-violet hover:!bg-violet-50 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              Démarrer un projet
            </Link>
            <Link href="/services" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              Voir nos services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}