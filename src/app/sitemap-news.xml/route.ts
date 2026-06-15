// src/app/sitemap-news.xml/route.ts
import { prisma } from '@/lib/prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_NAME = 'KJA Studio Labs';

export async function GET() {
  const articles = await prisma.blogArticle.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
    select: { titre: true, slug: true, createdAt: true },
    take: 100,
  });

  const projets = await prisma.projet.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
    select: { titre: true, slug: true, createdAt: true },
    take: 100,
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles.map((article) => `
  <url>
    <loc>${SITE_URL}/blog/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${article.createdAt.toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.titre)}</news:title>
    </news:news>
  </url>`).join('')}
${projets.map((projet) => `
  <url>
    <loc>${SITE_URL}/portfolio/${projet.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${projet.createdAt.toISOString()}</news:publication_date>
      <news:title>${escapeXml(projet.titre)}</news:title>
    </news:news>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}