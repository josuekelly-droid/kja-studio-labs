// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';

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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <span className="text-gray-600 shrink-0">/</span>
            <Link href="/blog" className="hover:text-white transition-colors shrink-0">Blog</Link>
            <span className="text-gray-600 shrink-0">/</span>
            <span className="text-white font-medium break-words text-center">{article.titre}</span>
          </nav>
          
          <div>
            <span className="inline-block px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono font-semibold text-[10px] rounded-full uppercase tracking-widest mb-4">
              {categoriesLabels[article.categorie] || article.categorie}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight mb-6 break-words">
              {article.titre}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <span className="text-white font-semibold">{article.author.name || siteConfig.name}</span>
            <span className="text-gray-600">•</span>
            <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-gray-600">•</span>
            <span className="text-violet-300">{article.tempsLecture} min de lecture</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-3xl mx-auto space-y-12">
          {article.imagePrincipale && (
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-[#0c0616]/80 backdrop-blur-2xl">
              <img src={article.imagePrincipale} alt={article.titre} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-gray-300 font-light leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: contenuHTML }} />
          </div>

          {article.tags.length > 0 && (
            <div className="p-8 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 flex flex-wrap gap-2.5 items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider mr-2">// Tags :</span>
              {article.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono font-medium rounded-full backdrop-blur-xl"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}