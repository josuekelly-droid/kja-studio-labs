// src/app/sitemap-jobs.xml/route.ts
import { prisma } from '@/lib/prisma';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export async function GET() {
  const now = new Date();

  // Seules les offres publiées et non expirées sont incluses
  const offres = await prisma.jobPosting.findMany({
    where: {
      estPublie: true,
      OR: [
        { dateExpiration: null },
        { dateExpiration: { gte: now } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    select: { slug: true, createdAt: true, updatedAt: true },
    take: 100,
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${offres
  .map(
    (offre) => `  <url>
    <loc>${SITE_URL}/carrieres/${offre.slug}</loc>
    <lastmod>${(offre.updatedAt || offre.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}