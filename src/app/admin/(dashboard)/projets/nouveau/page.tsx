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
    <div className="space-y-6">
      <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 backdrop-blur-md">
        <Link href="/admin/projets" className="hover:text-white transition-colors">Projets</Link>
        <span>/</span>
        <span className="text-white font-medium">Nouveau projet</span>
      </nav>

      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
          Nouveau projet
        </h1>
      </div>

      <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <ProjetForm />
      </div>
    </div>
  );
}