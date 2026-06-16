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
    { label: 'Projets', valeur: totalProjets, href: '/admin/projets', couleur: 'bg-violet-50 text-violet-700', icone: '📁' },
    { label: 'Articles', valeur: totalArticles, href: '/admin/blog', couleur: 'bg-blue-50 text-blue-700', icone: '📝' },
    { label: 'Avis en attente', valeur: avisEnAttente, href: '/admin/avis', couleur: 'bg-yellow-50 text-yellow-700', icone: '⭐' },
    { label: 'Offres', valeur: `${offresPubliees}/${totalOffres}`, href: '/admin/jobs', couleur: 'bg-indigo-50 text-indigo-700', icone: '💼' },
    { label: 'Messages', valeur: messagesNonLus, href: '/admin/messages', couleur: 'bg-green-50 text-green-700', icone: '✉️' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Vue d&apos;ensemble de votre studio</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`${stat.couleur} rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow group`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{stat.icone}</span>
              <svg className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold mb-0.5">{stat.valeur}</div>
            <div className="text-xs font-medium opacity-70">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
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
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading font-semibold text-gray-900 text-sm">{titre}</h2>
        <Link href={href} className="text-xs text-violet hover:underline font-medium shrink-0">Voir tout</Link>
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

  if (projets.length === 0) return <p className="text-gray-400 text-xs py-4 text-center">Aucun projet.</p>;

  return (
    <ul className="space-y-2">
      {projets.map((p) => (
        <li key={p.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
          <div className="min-w-0 flex-1 mr-2">
            <p className="text-xs font-medium text-gray-900 truncate">{p.titre || 'Sans titre'}</p>
            <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${p.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{p.estPublie ? 'Publié' : 'Brouillon'}</span>
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

  if (articles.length === 0) return <p className="text-gray-400 text-xs py-4 text-center">Aucun article.</p>;

  return (
    <ul className="space-y-2">
      {articles.map((a) => (
        <li key={a.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
          <div className="min-w-0 flex-1 mr-2">
            <p className="text-xs font-medium text-gray-900 truncate">{a.titre || 'Sans titre'}</p>
            <p className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${a.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{a.estPublie ? 'Publié' : 'Brouillon'}</span>
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

  if (offres.length === 0) return <p className="text-gray-400 text-xs py-4 text-center">Aucune offre.</p>;

  const contratsLabels: Record<string, string> = {
    CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
  };

  return (
    <ul className="space-y-2">
      {offres.map((o) => (
        <li key={o.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
          <div className="min-w-0 flex-1 mr-2">
            <p className="text-xs font-medium text-gray-900 truncate">{o.titre || 'Sans titre'}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>{contratsLabels[o.typeContrat]}</span>
              <span>·</span>
              <span>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${o.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{o.estPublie ? 'Publié' : 'Brouillon'}</span>
        </li>
      ))}
    </ul>
  );
}