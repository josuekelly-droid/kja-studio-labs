// src/app/admin/jobs/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { JobForm } from '../JobForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Modifier l\'offre - Admin',
  robots: { index: false, follow: false },
};

export default async function ModifierOffrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offre = await prisma.jobPosting.findUnique({ where: { id } });
  if (!offre) notFound();

  return (
    <div>
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/admin/jobs" className="hover:text-violet transition-colors">Offres</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium truncate max-w-[200px]">{offre.titre || 'Modifier'}</span>
      </nav>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Modifier l&apos;offre</h1>
      <JobForm offre={JSON.parse(JSON.stringify(offre))} />
    </div>
  );
}