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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <span className="text-gray-600 shrink-0">/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors shrink-0">Portfolio</Link>
            <span className="text-gray-600 shrink-0">/</span>
            <span className="text-white font-medium break-words text-center">{projet.titre}</span>
          </nav>
          
          <div>
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest mb-4">
              {categoriesLabels[projet.categorie] || projet.categorie}
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white mb-6 tracking-tight break-words">
              {projet.titre}
            </h1>
          </div>

          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {projet.descriptionCourte}
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs font-mono text-gray-400">
            {projet.client && <span>Client : <strong className="text-white font-semibold">{projet.client}</strong></span>}
            {projet.dateRealisation && <span>Livraison : <strong className="text-white font-semibold">{new Date(projet.dateRealisation).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</strong></span>}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {projet.lienProjet && (
              <a 
                href={projet.lienProjet} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-gray-950 font-heading font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
              >
                <span>Voir le projet en ligne</span>
                <span className="ml-2">→</span>
              </a>
            )}
            {projet.lienFigma && (
              <a 
                href={projet.lienFigma} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/[0.03] border border-white/15 text-white font-heading font-semibold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/[0.08] hover:border-violet-500/40 transition-all duration-300 backdrop-blur-xl"
              >
                Prototype Figma
              </a>
            )}
            {projet.lienGithub && (
              <a 
                href={projet.lienGithub} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/[0.03] border border-white/15 text-white font-heading font-semibold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/[0.08] hover:border-violet-500/40 transition-all duration-300 backdrop-blur-xl"
              >
                Dépôt GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto space-y-16">
          {projet.imagePrincipale && (
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-[#0c0616]/80 backdrop-blur-2xl">
              <img src={projet.imagePrincipale} alt={projet.titre} className="w-full h-auto object-cover" />
            </div>
          )}

          {projet.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {projet.technologies.map((pt) => (
                <span 
                  key={pt.technologie.id} 
                  className="px-4 py-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono font-medium rounded-full backdrop-blur-xl"
                >
                  {pt.technologie.nom}
                </span>
              ))}
            </div>
          )}

          {projet.contenuComplet && (
            <div className="prose prose-invert max-w-none rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-gray-300 font-light leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: contenuHTML }} />
            </div>
          )}

          {projet.images.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold">// GALLERY & ASSETS</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                Galerie du projet
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projet.images.map((image) => (
                  <div key={image.id} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0c0616]/80 backdrop-blur-xl group shadow-lg">
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
    </div>
  );
}