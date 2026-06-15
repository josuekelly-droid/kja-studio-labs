// src/app/admin/projets/[id]/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ProjetForm } from '../ProjetForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Modifier le projet - Admin',
  robots: { index: false, follow: false },
};

export default async function ModifierProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projet = await prisma.projet.findUnique({
    where: { id },
    include: {
      images: { orderBy: { ordre: 'asc' } },
      technologies: { include: { technologie: true } },
    },
  });

  if (!projet) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">
        Modifier le projet
      </h1>
      <ProjetForm projet={JSON.parse(JSON.stringify(projet))} />
    </div>
  );
}