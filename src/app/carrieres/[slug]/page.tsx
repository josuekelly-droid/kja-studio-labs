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

  const expirationDate = offre.dateExpiration 
    ? offre.dateExpiration.toISOString() 
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-screen">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: offre.titre,
        description: offre.description.slice(0, 300),
        datePosted: offre.createdAt.toISOString(),
        validThrough: expirationDate,
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
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        {/* Halo lumineux d'arrière-plan haute précision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <nav className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/15 text-xs text-violet-300 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <span className="text-gray-600 shrink-0">/</span>
            <Link href="/carrieres" className="hover:text-white transition-colors shrink-0">Carrières</Link>
            <span className="text-gray-600 shrink-0">/</span>
            <span className="text-white font-medium break-words">{offre.titre}</span>
          </nav>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold block">
              // CAREER OPPORTUNITY
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tight break-words">
              {offre.titre}
            </h1>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 pt-2 font-mono text-xs">
            <span className="px-3.5 py-1.5 bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded-full font-semibold uppercase tracking-widest">
              {contratsLabels[offre.typeContrat] || offre.typeContrat}
            </span>
            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full font-light">
               {offre.localisation}
            </span>
            {offre.salaire && (
              <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-emerald-400 rounded-full font-medium">
                 {offre.salaire}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Description HTML */}
          <div className="prose prose-invert max-w-none rounded-3xl bg-[#0c0616]/85 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-gray-300 font-light leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
          </div>

          {/* Compétences recherchées */}
          {offre.competences.length > 0 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <h3 className="font-heading font-black text-xl text-white mb-6 tracking-tight flex items-center gap-2">
                <span className="text-violet-400 font-mono text-xs">// 01.</span>
                <span>Compétences recherchées</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {offre.competences.map((comp) => (
                  <span 
                    key={comp} 
                    className="px-4 py-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono font-medium rounded-full backdrop-blur-xl"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Call to action de candidature */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0616]/90 backdrop-blur-2xl border border-violet-500/40 shadow-[0_10px_50px_rgba(139,92,246,0.2)] text-center space-y-6">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Cette offre vous intéresse ?
            </h3>
            <p className="text-gray-400 font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Envoyez votre dossier de candidature (CV, portfolio ou réalisations marquantes) directement à notre équipe.
            </p>
            <div className="pt-2">
              <a 
                href={`mailto:${offre.emailContact}?subject=Candidature - ${encodeURIComponent(offre.titre)}`} 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-950 font-heading font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105"
              >
                Postuler par Email ({offre.emailContact})
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}