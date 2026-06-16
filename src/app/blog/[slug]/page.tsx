// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.blogArticle.findUnique({
    where: { slug, estPublie: true },
    select: { titre: true, metaTitle: true, metaDescription: true, imagePrincipale: true },
  });

  if (!article) return { title: 'Article non trouvé' };

  return {
    title: article.metaTitle || article.titre,
    description: article.metaDescription || '',
    openGraph: {
      title: article.metaTitle || article.titre,
      description: article.metaDescription || '',
      images: article.imagePrincipale ? [{ url: article.imagePrincipale }] : [],
      type: 'article',
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

const categoriesLabels: Record<string, string> = {
  DESIGN: 'Design',
  DEVELOPPEMENT: 'Développement',
  SEO: 'SEO',
  BUSINESS: 'Business',
  TUTORIEL: 'Tutoriel',
  ACTUALITE: 'Actualité',
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.blogArticle.findUnique({
    where: { slug, estPublie: true },
    include: { author: { select: { name: true } } },
  });

  if (!article) notFound();

  // Convertir Markdown en HTML
  const contenuHTML = await marked(article.contenu, {
    breaks: true,
    gfm: true,
  });

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.metaTitle || article.titre,
          description: article.metaDescription || article.extrait,
          image: article.imagePrincipale ? `${siteConfig.url}${article.imagePrincipale}` : undefined,
          author: { '@type': 'Organization', name: article.author.name || siteConfig.name },
          datePublished: article.createdAt.toISOString(),
          dateModified: article.updatedAt.toISOString(),
          wordCount: article.contenu.split(/\s+/).length,
          timeRequired: `PT${article.tempsLecture}M`,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
            { '@type': 'ListItem', position: 3, name: article.titre, item: `${siteConfig.url}/blog/${article.slug}` },
          ],
        }}
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white font-medium">{article.titre}</span>
          </nav>
          <span className="inline-block px-3 py-1 bg-white/10 text-violet-200 font-heading font-medium text-xs sm:text-sm rounded-full mb-4 backdrop-blur-sm">
            {categoriesLabels[article.categorie] || article.categorie}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">{article.titre}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-violet-200/80">
            <span>{article.author.name || siteConfig.name}</span>
            <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>{article.tempsLecture} min de lecture</span>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.imagePrincipale && (
            <img src={article.imagePrincipale} alt={article.titre} className="w-full rounded-2xl mb-10 shadow-lg" />
          )}
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contenuHTML }} />
          </div>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}