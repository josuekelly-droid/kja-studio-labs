// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/services/design-ui-ux`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/services/developpement-fullstack`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/services/connect`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/avis`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  // Pages dynamiques : Projets
  const projets = await prisma.projet.findMany({
    where: { estPublie: true },
    select: { slug: true, updatedAt: true },
  });

  const projetPages = projets.map((projet) => ({
    url: `${SITE_URL}/portfolio/${projet.slug}`,
    lastModified: projet.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Pages dynamiques : Blog
  const articles = await prisma.blogArticle.findMany({
    where: { estPublie: true },
    select: { slug: true, updatedAt: true },
  });

  const blogPages = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projetPages, ...blogPages];
}