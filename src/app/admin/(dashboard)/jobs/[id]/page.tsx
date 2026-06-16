// src/app/admin/jobs/[id]/page.tsx
import type { Metadata } from 'next';
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
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">Modifier l&apos;offre</h1>
      <JobForm offre={JSON.parse(JSON.stringify(offre))} />
    </div>
  );
}