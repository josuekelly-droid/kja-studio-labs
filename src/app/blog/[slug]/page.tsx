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

  // Convertir Markdown en HTML avec paragraphes
  const contenuHTML = article.contenu
    .split(/\n\n+/)
    .map((p: string) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
    .join('');

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

      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 bg-[#05020a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 mb-8 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <span className="shrink-0">/</span>
            <Link href="/blog" className="hover:text-white transition-colors shrink-0">Blog</Link>
            <span className="shrink-0">/</span>
            <span className="text-white font-medium break-words text-center">{article.titre}</span>
          </nav>
          
          <span className="inline-block px-3.5 py-1.5 bg-violet-600/25 text-violet-300 border border-violet-500/40 font-heading font-medium text-xs rounded-full mb-6 backdrop-blur-md uppercase tracking-wider">
            {categoriesLabels[article.categorie] || article.categorie}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6 break-words">
            {article.titre}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-400 font-light">
            <span className="text-white font-medium">{article.author.name || siteConfig.name}</span>
            <span>•</span>
            <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>{article.tempsLecture} min de lecture</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.imagePrincipale && (
            <div className="rounded-3xl overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-white/5">
              <img src={article.imagePrincipale} alt={article.titre} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none bg-[#0c0616]/70 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-gray-300 font-light leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: contenuHTML }} />
          </div>

          {article.tags.length > 0 && (
            <div className="mt-12 p-6 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 flex flex-wrap gap-2.5 items-center">
              <span className="text-xs text-gray-400 font-light mr-2">Tags :</span>
              {article.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-full backdrop-blur-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}