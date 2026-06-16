// src/app/admin/jobs/nouveau/page.tsx
import type { Metadata } from 'next';
import { JobForm } from '../JobForm';

export const metadata: Metadata = {
  title: 'Nouvelle offre - Admin',
  robots: { index: false, follow: false },
};

export default function NouvelleOffrePage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">Nouvelle offre d&apos;emploi</h1>
      <JobForm />
    </div>
  );
}