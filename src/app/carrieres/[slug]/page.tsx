// src/app/carrieres/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';

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
    openGraph: {
      title: `${offre.titre} | Carrières KJA Studio Labs`,
      description: offre.description.slice(0, 160),
      url: `${siteConfig.url}/carrieres/${slug}`,
    },
  };
}

const contratsLabels: Record<string, string> = {
  CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
};

export default async function OffrePage({ params }: Props) {
  const { slug } = await params;
  const offre = await prisma.jobPosting.findUnique({ where: { slug, estPublie: true } });
  if (!offre) notFound();

  const descriptionHTML = (offre.description || '')
    .split(/\n\n+/)
    .map((p: string) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
    .join('');

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: offre.titre,
        description: offre.description.slice(0, 300),
        datePosted: offre.createdAt.toISOString(),
        validThrough: offre.dateExpiration?.toISOString() || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        employmentType: offre.typeContrat,
        directApply: true,
        industry: 'Technologie, Design, Développement Web',
        qualifications: offre.competences.join(', '),
        responsibilities: offre.description.slice(0, 500),
        workHours: 'Temps plein',
        hiringOrganization: { 
          '@type': 'Organization', 
          name: siteConfig.name, 
          sameAs: siteConfig.url,
          logo: `${siteConfig.url}${siteConfig.logo}`
        },
        jobLocation: { 
          '@type': 'Place', 
          address: { 
            '@type': 'PostalAddress', 
            addressLocality: 'Cotonou',
            addressRegion: 'Littoral',
            addressCountry: 'BJ',
            postalCode: '0.1 B.P.',
            streetAddress: 'Fidjrossè'
          } 
        },
        baseSalary: offre.salaire ? { 
          '@type': 'MonetaryAmount', 
          currency: 'XOF', 
          value: { 
            '@type': 'QuantitativeValue', 
            value: offre.salaire, 
            unitText: 'MONTH' 
          } 
        } : undefined,
        identifier: {
          '@type': 'PropertyValue',
          name: siteConfig.name,
          value: offre.id
        },
        applicationContact: {
          '@type': 'ContactPoint',
          email: offre.emailContact
        }
      }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Carrières', item: `${siteConfig.url}/carrieres` }, { '@type': 'ListItem', position: 3, name: offre.titre, item: `${siteConfig.url}/carrieres/${offre.slug}` }] }} />

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
            <Link href="/carrieres" className="hover:text-white transition-colors shrink-0">Carrières</Link>
            <span className="shrink-0">/</span>
            <span className="text-white font-medium break-words">{offre.titre}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6 break-words">
            {offre.titre}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-gray-300">
            <span className="px-3.5 py-1.5 bg-violet-600/25 text-violet-300 border border-violet-500/40 rounded-full uppercase tracking-wider font-semibold">
              {contratsLabels[offre.typeContrat]}
            </span>
            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full font-light">
              {offre.localisation}
            </span>
            {offre.salaire && (
              <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full font-light">
                {offre.salaire}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#05020a] relative border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none bg-[#0c0616]/70 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-gray-300 font-light leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
          </div>

          {offre.competences.length > 0 && (
            <div className="mt-12 p-8 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-6 tracking-tight">
                Compétences recherchées
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {offre.competences.map((comp) => (
                  <span 
                    key={comp} 
                    className="px-4 py-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-full backdrop-blur-md"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-violet-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3 tracking-tight">
              Cette offre vous intéresse ?
            </h3>
            <p className="text-gray-400 font-light text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Envoyez votre dossier de candidature directement à notre équipe à l&apos;adresse ci-dessous.
            </p>
            <a 
              href={`mailto:${offre.emailContact}?subject=Candidature - ${encodeURIComponent(offre.titre)}`} 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 font-heading font-bold text-sm sm:text-base rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Postuler : {offre.emailContact}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}