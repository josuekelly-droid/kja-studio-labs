// src/app/admin/dashboard/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { IndexAllButton } from './IndexAllButton';

export const metadata: Metadata = {
  title: 'Dashboard - Admin Studio',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [totalProjets, totalArticles, totalAvis, avisEnAttente, totalOffres, offresPubliees, messagesNonLus] = await Promise.all([
    prisma.projet.count(),
    prisma.blogArticle.count(),
    prisma.avis.count(),
    prisma.avis.count({ where: { estApprouve: false } }),
    prisma.jobPosting.count(),
    prisma.jobPosting.count({ where: { estPublie: true } }),
    prisma.contactMessage.count({ where: { traite: false } }),
  ]);

  const stats = [
    {
      label: 'Projets',
      valeur: totalProjets,
      href: '/admin/projets',
      accent: 'from-violet-500/20 to-purple-500/0 border-violet-500/30 text-violet-300',
      glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]',
      icon: (
        <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5-13.5h16.5" />
        </svg>
      ),
    },
    {
      label: 'Articles',
      valeur: totalArticles,
      href: '/admin/blog',
      accent: 'from-blue-500/20 to-cyan-500/0 border-blue-500/30 text-blue-300',
      glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      label: 'Avis en attente',
      valeur: avisEnAttente,
      href: '/admin/avis',
      accent: 'from-amber-500/20 to-yellow-500/0 border-amber-500/30 text-amber-300',
      glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      badge: avisEnAttente > 0 ? 'Urgent' : undefined,
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.486-.412.872-.835.613l-4.703-2.88a.562.562 0 00-.582 0l-4.703 2.88c-.423.259-.951-.127-.835-.613l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      label: 'Offres publiées',
      valeur: `${offresPubliees}/${totalOffres}`,
      href: '/admin/jobs',
      accent: 'from-indigo-500/20 to-purple-500/0 border-indigo-500/30 text-indigo-300',
      glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 01-.75-.75v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 14.15m16.5 0s0-3.75-2.25-3.75S12 12.75 12 12.75s-3.75-2.35-6-2.35S3 14.15 3 14.15" />
        </svg>
      ),
    },
    {
      label: 'Messages reçus',
      valeur: messagesNonLus,
      href: '/admin/messages',
      accent: 'from-emerald-500/20 to-teal-500/0 border-emerald-500/30 text-emerald-300',
      glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      badge: messagesNonLus > 0 ? `${messagesNonLus} non lus` : undefined,
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative space-y-10">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* Header d'exception avec statut système */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-semibold">Studio Operating System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            Dashboard
          </h1>
        </div>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Performance Core</p>
            <p className="text-xs font-medium text-violet-300">Awwwards Status : Optimal</p>
          </div>
          <div className="w-2 h-8 bg-gradient-to-t from-violet-500 to-emerald-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Briques de Métriques Awwwards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group relative overflow-hidden rounded-3xl bg-[#0c0616]/80 border bg-gradient-to-b ${stat.accent} p-5 transition-all duration-500 hover:-translate-y-1.5 ${stat.glow}`}
          >
            {/* Effet d'éclairage interne au survol */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />

            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                {stat.icon}
              </div>
              {stat.badge ? (
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse">
                  {stat.badge}
                </span>
              ) : (
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </div>

            <div className="relative z-10">
              <div className="text-3xl font-heading font-black text-white tracking-tight mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                {stat.valeur}
              </div>
              <div className="text-xs font-light text-gray-400 group-hover:text-gray-200 transition-colors">
                {stat.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Cartes d'Aperçu Haute Scénographie */}
      <div className="grid lg:grid-cols-3 gap-6">
        <DashboardCard titre="Derniers projets" href="/admin/projets" subtitle="Showcase Studio">
          <ProjetsRecents />
        </DashboardCard>
        <DashboardCard titre="Derniers articles" href="/admin/blog" subtitle="Editorial & Insights">
          <ArticlesRecents />
        </DashboardCard>
        <DashboardCard titre="Offres d'emploi" href="/admin/jobs" subtitle="Recrutement Talent">
          <OffresRecentes />
        </DashboardCard>
      </div>

      {/* Action Globale SEO */}
      <div className="relative">
        <div className="absolute inset-0 bg-violet-600/10 blur-2xl rounded-3xl" />
        <IndexAllButton />
      </div>
    </div>
  );
}

function DashboardCard({ titre, href, subtitle, children }: { titre: string; href: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="relative group rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:border-violet-500/30 transition-all duration-500">
      <div>
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-mono text-violet-400 font-semibold">{subtitle}</span>
            <h2 className="font-heading font-bold text-white text-base tracking-tight">{titre}</h2>
          </div>
          <Link href={href} className="text-xs font-mono text-violet-300 hover:text-white transition-colors flex items-center gap-1 group/link">
            <span>EXPLORER</span>
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

async function ProjetsRecents() {
  const projets = await prisma.projet.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, titre: true, estPublie: true, createdAt: true },
  });

  if (projets.length === 0) return <p className="text-gray-500 text-xs py-8 text-center font-light">Aucune création répertoriée.</p>;

  return (
    <ul className="space-y-3.5 divide-y divide-white/5">
      {projets.map((p) => (
        <li key={p.id} className="flex items-center justify-between pt-3.5 first:pt-0 group/item">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs font-semibold text-gray-200 group-hover/item:text-violet-300 transition-colors truncate">{p.titre || 'Projet sans nom'}</p>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{new Date(p.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium shrink-0 border ${p.estPublie ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
            {p.estPublie ? 'LIVE' : 'DRAFT'}
          </span>
        </li>
      ))}
    </ul>
  );
}

async function ArticlesRecents() {
  const articles = await prisma.blogArticle.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, titre: true, estPublie: true, createdAt: true },
  });

  if (articles.length === 0) return <p className="text-gray-500 text-xs py-8 text-center font-light">Aucun article publié.</p>;

  return (
    <ul className="space-y-3.5 divide-y divide-white/5">
      {articles.map((a) => (
        <li key={a.id} className="flex items-center justify-between pt-3.5 first:pt-0 group/item">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs font-semibold text-gray-200 group-hover/item:text-blue-300 transition-colors truncate">{a.titre || 'Article sans nom'}</p>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{new Date(a.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium shrink-0 border ${a.estPublie ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
            {a.estPublie ? 'LIVE' : 'DRAFT'}
          </span>
        </li>
      ))}
    </ul>
  );
}

async function OffresRecentes() {
  const offres = await prisma.jobPosting.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, titre: true, estPublie: true, typeContrat: true, createdAt: true },
  });

  if (offres.length === 0) return <p className="text-gray-500 text-xs py-8 text-center font-light">Aucune opportunité ouverte.</p>;

  const contratsLabels: Record<string, string> = {
    CDI: 'CDI', CDD: 'CDD', FREELANCE: 'FREELANCE', STAGE: 'STAGE', ALTERNANCE: 'ALTERNANCE',
  };

  return (
    <ul className="space-y-3.5 divide-y divide-white/5">
      {offres.map((o) => (
        <li key={o.id} className="flex items-center justify-between pt-3.5 first:pt-0 group/item">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs font-semibold text-gray-200 group-hover/item:text-indigo-300 transition-colors truncate">{o.titre || 'Poste sans nom'}</p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 mt-0.5">
              <span className="text-indigo-400">{contratsLabels[o.typeContrat]}</span>
              <span>•</span>
              <span>{new Date(o.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
            </div>
          </div>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium shrink-0 border ${o.estPublie ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
            {o.estPublie ? 'LIVE' : 'DRAFT'}
          </span>
        </li>
      ))}
    </ul>
  );
}