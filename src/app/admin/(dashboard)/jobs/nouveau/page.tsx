// src/app/admin/jobs/nouveau/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { JobForm } from '../JobForm';

export const metadata: Metadata = {
  title: 'Nouvelle offre - Admin',
  robots: { index: false, follow: false },
};

export default function NouvelleOffrePage() {
  return (
    <div>
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/admin/jobs" className="hover:text-violet transition-colors">Offres</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">Nouvelle offre</span>
      </nav>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Nouvelle offre d&apos;emploi</h1>
      <JobForm />
    </div>
  );
}