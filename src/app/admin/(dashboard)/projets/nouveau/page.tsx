// src/app/admin/projets/nouveau/page.tsx
import type { Metadata } from 'next';
import { ProjetForm } from '../ProjetForm';

export const metadata: Metadata = {
  title: 'Nouveau projet - Admin',
  robots: { index: false, follow: false },
};

export default function NouveauProjetPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">
        Nouveau projet
      </h1>
      <ProjetForm />
    </div>
  );
}