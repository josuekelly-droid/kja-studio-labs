// src/app/admin/projets/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProjetForm } from '../ProjetForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Modifier le projet - Admin',
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
    <div>
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/admin/projets" className="hover:text-violet transition-colors">Projets</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium truncate max-w-[200px]">{projet.titre || 'Modifier'}</span>
      </nav>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Modifier le projet</h1>
      <ProjetForm projet={JSON.parse(JSON.stringify(projet))} />
    </div>
  );
}