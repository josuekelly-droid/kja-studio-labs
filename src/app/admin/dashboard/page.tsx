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
    { label: 'Projets', valeur: totalProjets, href: '/admin/projets', couleur: 'bg-violet-50 text-violet-700' },
    { label: 'Articles', valeur: totalArticles, href: '/admin/blog', couleur: 'bg-blue-50 text-blue-700' },
    { label: 'Avis en attente', valeur: avisEnAttente, href: '/admin/avis', couleur: 'bg-yellow-50 text-yellow-700' },
    { label: 'Offres d\'emploi', valeur: `${offresPubliees}/${totalOffres}`, href: '/admin/jobs', couleur: 'bg-indigo-50 text-indigo-700' },
    { label: 'Messages', valeur: messagesNonLus, href: '/admin/messages', couleur: 'bg-green-50 text-green-700' },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className={`${stat.couleur} rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow`}>
            <div className="text-3xl sm:text-4xl font-heading font-bold mb-1">{stat.valeur}</div>
            <div className="text-sm font-medium opacity-80">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-gray-900">Derniers projets</h2>
            <Link href="/admin/projets" className="text-sm text-violet hover:underline">Voir tout</Link>
          </div>
          <ProjetsRecents />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-gray-900">Derniers articles</h2>
            <Link href="/admin/blog" className="text-sm text-violet hover:underline">Voir tout</Link>
          </div>
          <ArticlesRecents />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-gray-900">Offres d&apos;emploi</h2>
            <Link href="/admin/jobs" className="text-sm text-violet hover:underline">Voir tout</Link>
          </div>
          <OffresRecentes />
        </div>
      </div>

      <IndexAllButton />
    </div>
  );
}

async function ProjetsRecents() {
  const projets = await prisma.projet.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, titre: true, estPublie: true, createdAt: true },
  });

  if (projets.length === 0) return <p className="text-gray-500 text-sm">Aucun projet.</p>;

  return (
    <ul className="space-y-3">
      {projets.map((p) => (
        <li key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-900">{p.titre || 'Sans titre'}</p>
            <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{p.estPublie ? 'Publié' : 'Brouillon'}</span>
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

  if (articles.length === 0) return <p className="text-gray-500 text-sm">Aucun article.</p>;

  return (
    <ul className="space-y-3">
      {articles.map((a) => (
        <li key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-900">{a.titre || 'Sans titre'}</p>
            <p className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${a.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{a.estPublie ? 'Publié' : 'Brouillon'}</span>
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

  if (offres.length === 0) return <p className="text-gray-500 text-sm">Aucune offre.</p>;

  const contratsLabels: Record<string, string> = {
    CDI: 'CDI', CDD: 'CDD', FREELANCE: 'Freelance', STAGE: 'Stage', ALTERNANCE: 'Alternance',
  };

  return (
    <ul className="space-y-3">
      {offres.map((o) => (
        <li key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-900">{o.titre || 'Sans titre'}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{contratsLabels[o.typeContrat]}</span>
              <span>·</span>
              <span>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${o.estPublie ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{o.estPublie ? 'Publié' : 'Brouillon'}</span>
        </li>
      ))}
    </ul>
  );
}