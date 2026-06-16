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

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-violet-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <span className="shrink-0">/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors shrink-0">Portfolio</Link>
            <span className="shrink-0">/</span>
            <span className="text-white font-medium break-words text-center">{projet.titre}</span>
          </nav>
          <span className="inline-block px-3 py-1 bg-white/10 text-violet-200 font-heading font-medium text-xs sm:text-sm rounded-full mb-4 backdrop-blur-sm">
            {categoriesLabels[projet.categorie] || projet.categorie}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 break-words">{projet.titre}</h1>
          <p className="text-base sm:text-lg text-violet-200 max-w-2xl mx-auto leading-relaxed">{projet.descriptionCourte}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-sm text-violet-200/80">
            {projet.client && <span>Client : <strong className="text-white">{projet.client}</strong></span>}
            {projet.dateRealisation && <span>{new Date(projet.dateRealisation).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {projet.lienProjet && (
              <a href={projet.lienProjet} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-white !text-violet hover:!bg-violet-50 text-sm px-5 py-2.5">Voir le projet</a>
            )}
            {projet.lienFigma && (
              <a href={projet.lienFigma} target="_blank" rel="noopener noreferrer" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-sm px-5 py-2.5">Figma</a>
            )}
            {projet.lienGithub && (
              <a href={projet.lienGithub} target="_blank" rel="noopener noreferrer" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-sm px-5 py-2.5">GitHub</a>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {projet.imagePrincipale && (
            <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
              <img src={projet.imagePrincipale} alt={projet.titre} className="w-full h-auto" />
            </div>
          )}
          {projet.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {projet.technologies.map((pt) => (
                <span key={pt.technologie.id} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{pt.technologie.nom}</span>
              ))}
            </div>
          )}
          {projet.contenuComplet && (
            <div className="prose prose-gray max-w-none bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 lg:p-10">
              <div dangerouslySetInnerHTML={{ __html: contenuHTML }} />
            </div>
          )}
          {projet.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Galerie</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projet.images.map((image) => (
                  <img key={image.id} src={image.url} alt={image.alt || projet.titre} className="rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}