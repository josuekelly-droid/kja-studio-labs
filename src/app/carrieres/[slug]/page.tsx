// src/app/carrieres/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export const dynamic = 'force-dynamic';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offre = await prisma.jobPosting.findUnique({ where: { slug, estPublie: true }, select: { titre: true, description: true } });
  if (!offre) return { title: 'Offre non trouvée' };
  return {
    title: offre.titre,
    description: offre.description.slice(0, 160),
    alternates: { canonical: `/carrieres/${slug}` },
  };
}

const contratsLabels: Record<string, string> = {
  CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
};

export default async function OffrePage({ params }: Props) {
  const { slug } = await params;
  const offre = await prisma.jobPosting.findUnique({ where: { slug, estPublie: true } });
  if (!offre) notFound();

  const descriptionHTML = await marked(offre.description, { breaks: true, gfm: true });

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: offre.titre,
        description: offre.description.slice(0, 300),
        datePosted: offre.createdAt.toISOString(),
        validThrough: offre.dateExpiration?.toISOString() || '',
        employmentType: offre.typeContrat,
        hiringOrganization: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: offre.localisation } },
        baseSalary: offre.salaire ? { '@type': 'MonetaryAmount', currency: 'EUR', value: { '@type': 'QuantitativeValue', value: offre.salaire, unitText: 'YEAR' } } : undefined,
      }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Carrières', item: `${siteConfig.url}/carrieres` }, { '@type': 'ListItem', position: 3, name: offre.titre, item: `${siteConfig.url}/carrieres/${offre.slug}` }] }} />

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-[120px]" /></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-violet-200/70 mb-6"><Link href="/" className="hover:text-white shrink-0">Accueil</Link><span className="shrink-0">/</span><Link href="/carrieres" className="hover:text-white shrink-0">Carrières</Link><span className="shrink-0">/</span><span className="text-white font-medium break-words">{offre.titre}</span></nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 break-words">{offre.titre}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-violet-200/80">
            <span className="px-3 py-1 bg-white/10 rounded-full">{contratsLabels[offre.typeContrat]}</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">{offre.localisation}</span>
            {offre.salaire && <span className="px-3 py-1 bg-white/10 rounded-full">{offre.salaire}</span>}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
          </div>

          {offre.competences.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Compétences recherchées</h3>
              <div className="flex flex-wrap gap-2">
                {offre.competences.map((comp) => (
                  <span key={comp} className="px-3 py-1.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full">{comp}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 p-6 sm:p-8 bg-violet-50 rounded-2xl text-center">
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Cette offre vous intéresse ?</h3>
            <p className="text-gray-600 text-sm mb-4">Envoyez votre candidature à l&apos;adresse ci-dessous.</p>
            <a href={`mailto:${offre.emailContact}?subject=Candidature - ${encodeURIComponent(offre.titre)}`} className="btn-primary text-sm px-6 py-3">
              Postuler : {offre.emailContact}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}