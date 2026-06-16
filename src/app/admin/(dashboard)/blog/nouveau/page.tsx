// src/app/admin/blog/nouveau/page.tsx
import type { Metadata } from 'next';
import { BlogForm } from '../BlogForm';

export const metadata: Metadata = {
  title: 'Nouvel article - Admin',
  robots: { index: false, follow: false },
};

export default function NouvelArticlePage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">
        Nouvel article
      </h1>
      <BlogForm />
    </div>
  );
}