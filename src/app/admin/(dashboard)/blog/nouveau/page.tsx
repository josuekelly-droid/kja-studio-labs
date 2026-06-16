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
    <div>
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/admin/blog" className="hover:text-violet transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">Nouvel article</span>
      </nav>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Nouvel article</h1>
      <BlogForm />
    </div>
  );
}