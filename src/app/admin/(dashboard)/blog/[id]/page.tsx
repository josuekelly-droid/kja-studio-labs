// src/app/admin/blog/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BlogForm } from '../BlogForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Modifier l\'article - Admin',
  robots: { index: false, follow: false },
};

export default async function ModifierArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.blogArticle.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/admin/blog" className="hover:text-violet transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium truncate max-w-[200px]">{article.titre || 'Modifier'}</span>
      </nav>
      <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Modifier l&apos;article</h1>
      <BlogForm article={JSON.parse(JSON.stringify(article))} />
    </div>
  );
}