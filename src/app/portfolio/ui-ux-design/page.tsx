// src/app/portfolio/ui-ux-design/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Projets UI/UX Design',
  description: 'Projets de Design UI/UX par KJA Studio Labs. Interfaces, prototypes, design systems.',
  alternates: { canonical: '/portfolio/ui-ux-design' },
};

export default async function PortfolioUIUXPage() {
  const projets = await prisma.projet.findMany({ where: { estPublie: true, categorie: 'UI_UX_DESIGN' }, orderBy: { createdAt: 'desc' } });

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.url}/portfolio` }, { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: `${siteConfig.url}/portfolio/ui-ux-design` }] }} />
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-violet-300 rounded-full blur-[100px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white">Accueil</Link><span>/</span><Link href="/portfolio" className="hover:text-white">Portfolio</Link><span>/</span><span className="text-white font-medium">UI/UX Design</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">UI/UX Design</h1>
          <p className="text-violet-200">Interfaces modernes et expériences utilisateur pensées</p>
        </div>
      </section>
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projets.length === 0 ? <div className="text-center py-12"><p className="text-gray-500">Aucun projet dans cette catégorie.</p></div> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {projets.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="card overflow-hidden group block">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">{p.imagePrincipale ? <img src={p.imagePrincipale} alt={p.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <span>🖼️</span>}</div>
                  <div className="p-4"><h3 className="font-heading font-bold text-gray-900 group-hover:text-violet">{p.titre}</h3><p className="text-sm text-gray-600 line-clamp-2">{p.descriptionCourte}</p></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}