// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = await prisma.projet.findUnique({
    where: { slug, estPublie: true },
    select: { titre: true, metaTitle: true, metaDescription: true, imagePrincipale: true },
  });

  if (!projet) return { title: 'Projet non trouvé' };

  return {
    title: projet.metaTitle || projet.titre,
    description: projet.metaDescription || '',
    openGraph: {
      title: projet.metaTitle || projet.titre,
      description: projet.metaDescription || '',
      images: projet.imagePrincipale ? [{ url: projet.imagePrincipale }] : [],
    },
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

const categoriesLabels: Record<string, string> = {
  UI_UX_DESIGN: 'UI/UX Design',
  FULLSTACK: 'Fullstack',
  CONNECT: 'Connect',
};

export default async function ProjetPage({ params }: Props) {
  const { slug } = await params;

  const projet = await prisma.projet.findUnique({
    where: { slug, estPublie: true },
    include: {
      images: { orderBy: { ordre: 'asc' } },
      technologies: { include: { technologie: true } },
    },
  });

  if (!projet) notFound();

  // Convertir le contenu en HTML avec paragraphes
  const contenuHTML = (projet.contenuComplet || '')
    .split(/\n\n+/)
    .map((p: string) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
    .join('');

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: projet.metaTitle || projet.titre,
          description: projet.metaDescription || projet.descriptionCourte,
          image: projet.imagePrincipale ? `${siteConfig.url}${projet.imagePrincipale}` : undefined,
          author: { '@type': 'Organization', name: siteConfig.name },
          datePublished: projet.createdAt.toISOString(),
          dateModified: projet.updatedAt.toISOString(),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.url}/portfolio` },
            { '@type': 'ListItem', position: 3, name: projet.titre, item: `${siteConfig.url}/portfolio/${projet.slug}` },
          ],
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-24 lg:pb-28 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <span className="shrink-0">/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors shrink-0">Portfolio</Link>
            <span className="shrink-0">/</span>
            <span className="text-white font-medium break-words text-center">{projet.titre}</span>
          </nav>
          
          <span className="inline-block px-3.5 py-1.5 bg-violet-600/25 text-violet-300 border border-violet-500/40 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md uppercase tracking-wider">
            {categoriesLabels[projet.categorie] || projet.categorie}
          </span>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight break-words">
            {projet.titre}
          </h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {projet.descriptionCourte}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-300 font-light">
            {projet.client && <span>Client : <strong className="text-white font-medium">{projet.client}</strong></span>}
            {projet.dateRealisation && <span>{new Date(projet.dateRealisation).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {projet.lienProjet && (
              <a 
                href={projet.lienProjet} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-950 font-heading font-bold text-sm rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
              >
                Voir le projet →
              </a>
            )}
            {projet.lienFigma && (
              <a 
                href={projet.lienFigma} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/20 text-white font-heading font-medium text-sm rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Figma
              </a>
            )}
            {projet.lienGithub && (
              <a 
                href={projet.lienGithub} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/20 text-white font-heading font-medium text-sm rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {projet.imagePrincipale && (
            <div className="rounded-3xl overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-white/5">
              <img src={projet.imagePrincipale} alt={projet.titre} className="w-full h-auto object-cover" />
            </div>
          )}

          {projet.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-12">
              {projet.technologies.map((pt) => (
                <span 
                  key={pt.technologie.id} 
                  className="px-4 py-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-full backdrop-blur-md"
                >
                  {pt.technologie.nom}
                </span>
              ))}
            </div>
          )}

          {projet.contenuComplet && (
            <div className="prose prose-invert max-w-none bg-[#0c0616]/70 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-gray-300 font-light leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: contenuHTML }} />
            </div>
          )}

          {projet.images.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-8 tracking-tight">
                Galerie du projet
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projet.images.map((image) => (
                  <div key={image.id} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0c0616]/70 backdrop-blur-xl group">
                    <img 
                      src={image.url} 
                      alt={image.alt || projet.titre} 
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}