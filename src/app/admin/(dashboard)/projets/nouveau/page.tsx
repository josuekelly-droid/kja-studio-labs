// src/app/admin/projets/nouveau/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjetForm } from '../ProjetForm';

export const metadata: Metadata = {
  title: 'Nouveau projet - Admin',
  robots: { index: false, follow: false },
};

export default function NouveauProjetPage() {
  return (
    <div>
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/admin/projets" className="hover:text-violet transition-colors">Projets</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">Nouveau projet</span>
      </nav>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Nouveau projet</h1>
      <ProjetForm />
    </div>
  );
}