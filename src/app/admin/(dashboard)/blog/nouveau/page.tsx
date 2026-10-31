// src/app/admin/blog/nouveau/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogForm } from '../BlogForm';

export const metadata: Metadata = {
  title: 'Nouvel article - Admin',
  robots: { index: false, follow: false },
};

export default function NouvelArticlePage() {
  return (
    <div className="space-y-6">
      <nav className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-violet-200/80 backdrop-blur-md">
        <Link href="/admin/blog" className="hover:text-white transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-white font-medium">Nouvel article</span>
      </nav>

      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
          Nouvel article
        </h1>
      </div>

      <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <BlogForm />
      </div>
    </div>
  );
}