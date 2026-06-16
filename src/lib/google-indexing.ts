// src/lib/google-indexing.ts
import { google } from 'googleapis';
import { prisma } from './prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function getIndexingClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  return google.indexing({ version: 'v3', auth });
}

export async function notifyGoogleIndex(
  url: string,
  action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
) {
  const urlComplete = `${SITE_URL}${url}`;

  const logEntry = await prisma.seoLog.create({
    data: { url: urlComplete, action, status: 'PENDING' },
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`[SEO DEV] ${action}: ${urlComplete}`);
    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: { status: 'DEV_SKIPPED', response: { url: urlComplete, action } },
    });
    return { succes: true, dev: true };
  }

  try {
    const indexing = getIndexingClient();
    const response = await indexing.urlNotifications.publish({
      requestBody: { url: urlComplete, type: action },
    });

    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: { status: 'SUCCESS', response: response.data as any },
    });

    console.log(`[SEO] ✅ Indexé: ${urlComplete}`);
    return { succes: true, data: response.data };
  } catch (erreur: any) {
    console.error(`[SEO] ❌ Erreur indexation: ${urlComplete}`, erreur.message);
    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: { status: 'ERROR', response: { erreur: erreur.message } },
    });
    return { succes: false, erreur: erreur.message };
  }
}

export async function indexAllPages() {
  const staticPages = [
    '/',
    '/portfolio',
    '/portfolio/ui-ux-design',
    '/portfolio/fullstack',
    '/portfolio/connect',
    '/services',
    '/services/design-ui-ux',
    '/services/developpement-fullstack',
    '/services/connect',
    '/blog',
    '/a-propos',
    '/avis',
    '/laisser-un-avis',
    '/carrieres',
    '/contact',
    '/mentions-legales',
    '/politique-confidentialite',
    '/cgv',
  ];

  // Pages dynamiques
  const projets = await prisma.projet.findMany({ where: { estPublie: true }, select: { slug: true } });
  const articles = await prisma.blogArticle.findMany({ where: { estPublie: true }, select: { slug: true } });
  const offres = await prisma.jobPosting.findMany({ where: { estPublie: true }, select: { slug: true } });

  const allPages = [
    ...staticPages,
    ...projets.map((p) => `/portfolio/${p.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
    ...offres.map((o) => `/carrieres/${o.slug}`),
  ];

  const resultats = [];
  for (const page of allPages) {
    const resultat = await notifyGoogleIndex(page);
    resultats.push({ page, ...resultat });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return resultats;
}