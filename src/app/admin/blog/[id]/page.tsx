// src/app/admin/blog/[id]/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BlogForm } from '../BlogForm';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Modifier l\'article - Admin',
  robots: { index: false, follow: false },
};

export default async function ModifierArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.blogArticle.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">
        Modifier l&apos;article
      </h1>
      <BlogForm article={JSON.parse(JSON.stringify(article))} />
    </div>
  );
}