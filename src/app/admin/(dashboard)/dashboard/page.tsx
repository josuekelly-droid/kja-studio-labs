// src/app/admin/dashboard/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { IndexAllButton } from './IndexAllButton';

export const metadata: Metadata = {
  title: 'Dashboard - Admin',
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
    { label: 'Projets', valeur: totalProjets, href: '/admin/projets', icone: '📁', textCol: 'text-violet-300' },
    { label: 'Articles', valeur: totalArticles, href: '/admin/blog', icone: '📝', textCol: 'text-blue-300' },
    { label: 'Avis en attente', valeur: avisEnAttente, href: '/admin/avis', icone: '⭐', textCol: 'text-amber-300' },
    { label: 'Offres', valeur: `${offresPubliees}/${totalOffres}`, href: '/admin/jobs', icone: '💼', textCol: 'text-indigo-300' },
    { label: 'Messages', valeur: messagesNonLus, href: '/admin/messages', icone: '✉️', textCol: 'text-emerald-300' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">Vue d&apos;ensemble de votre studio</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-5 hover:border-violet-500/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icone}</span>
              <svg className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-heading font-bold mb-1 ${stat.textCol}`}>{stat.valeur}</div>
              <div className="text-xs font-light text-gray-400">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <DashboardCard titre="Derniers projets" href="/admin/projets">
          <ProjetsRecents />
        </DashboardCard>
        <DashboardCard titre="Derniers articles" href="/admin/blog">
          <ArticlesRecents />
        </DashboardCard>
        <DashboardCard titre="Offres d&apos;emploi" href="/admin/jobs">
          <OffresRecentes />
        </DashboardCard>
      </div>

      <IndexAllButton />
    </div>
  );
}

function DashboardCard({ titre, href, children }: { titre: string; href: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-bold text-white text-sm tracking-tight">{titre}</h2>
        <Link href={href} className="text-xs text-violet-300 hover:text-white transition-colors font-medium shrink-0">
          Voir tout →
        </Link>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

async function ProjetsRecents() {
  const projets = await prisma.projet.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, titre: true, estPublie: true, createdAt: true },
  });

  if (projets.length === 0) return <p className="text-gray-500 text-xs py-6 text-center font-light">Aucun projet.</p>;

  return (
    <ul className="space-y-3 divide-y divide-white/5">
      {projets.map((p) => (
        <li key={p.id} className="flex items-center justify-between pt-3 first:pt-0">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs font-medium text-white truncate">{p.titre || 'Sans titre'}</p>
            <p className="text-xs text-gray-400 font-light mt-0.5">{new Date(p.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 border ${p.estPublie ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
            {p.estPublie ? 'Publié' : 'Brouillon'}
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

  if (articles.length === 0) return <p className="text-gray-500 text-xs py-6 text-center font-light">Aucun article.</p>;

  return (
    <ul className="space-y-3 divide-y divide-white/5">
      {articles.map((a) => (
        <li key={a.id} className="flex items-center justify-between pt-3 first:pt-0">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs font-medium text-white truncate">{a.titre || 'Sans titre'}</p>
            <p className="text-xs text-gray-400 font-light mt-0.5">{new Date(a.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 border ${a.estPublie ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
            {a.estPublie ? 'Publié' : 'Brouillon'}
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

  if (offres.length === 0) return <p className="text-gray-500 text-xs py-6 text-center font-light">Aucune offre.</p>;

  const contratsLabels: Record<string, string> = {
    CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
  };

  return (
    <ul className="space-y-3 divide-y divide-white/5">
      {offres.map((o) => (
        <li key={o.id} className="flex items-center justify-between pt-3 first:pt-0">
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-xs font-medium text-white truncate">{o.titre || 'Sans titre'}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-light mt-0.5">
              <span>{contratsLabels[o.typeContrat]}</span>
              <span>·</span>
              <span>{new Date(o.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 border ${o.estPublie ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
            {o.estPublie ? 'Publié' : 'Brouillon'}
          </span>
        </li>
      ))}
    </ul>
  );
}