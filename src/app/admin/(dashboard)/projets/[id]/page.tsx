// src/app/admin/projets/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProjetForm } from '../ProjetForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Modifier le projet - Admin Studio',
  robots: { index: false, follow: false },
};

export default async function ModifierProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projet = await prisma.projet.findUnique({
    where: { id },
    include: { images: { orderBy: { ordre: 'asc' } }, technologies: { include: { technologie: true } } },
  });
  if (!projet) notFound();

  return (
    <div className="relative space-y-8 pb-12">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* En-tête & Fil d'Ariane */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <nav className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs text-violet-300/80 backdrop-blur-md">
            <Link href="/admin/projets" className="hover:text-white transition-colors">Projets</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium truncate max-w-[220px]">{projet.titre || 'Modifier'}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
            Modifier la création
          </h1>
        </div>

        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shrink-0">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-mono text-gray-300">ID: {projet.id.slice(0, 8)}...</span>
        </div>
      </div>

      {/* Formulaire encapsulé dans un écrin Dark Luxury */}
      <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <ProjetForm projet={JSON.parse(JSON.stringify(projet))} />
      </div>
    </div>
  );
}