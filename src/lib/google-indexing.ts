// src/lib/google-indexing.ts
import { google } from 'googleapis';
import { prisma } from './prisma';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export interface GoogleIndexResult {
  succes: boolean;
  dev?: boolean;
  data?: unknown;
  erreur?: string;
}

function getIndexingClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google Indexing API credentials non configurées dans les variables d\'environnement.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  return google.indexing({ version: 'v3', auth });
}

export async function notifyGoogleIndex(
  urlPath: string,
  action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<GoogleIndexResult> {
  const formattedPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  const urlComplete = `${SITE_URL}${formattedPath}`;

  const logEntry = await prisma.seoLog.create({
    data: { url: urlComplete, action, status: 'PENDING' },
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`[SEO DEV] ${action}: ${urlComplete}`);
    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: { status: 'DEV_SKIPPED', response: { url: urlComplete, action } as any },
    });
    return { succes: true, dev: true };
  }

  try {
    const indexing = getIndexingClient();
    const response = await indexing.urlNotifications.publish({
      requestBody: { url: urlComplete, type: action },
    });

    const responseData = response.data ? (JSON.parse(JSON.stringify(response.data)) as Record<string, unknown>) : {};

    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: { status: 'SUCCESS', response: responseData as any },
    });

    console.log(`[SEO] ✅ Indexé avec succès: ${urlComplete}`);
    return { succes: true, data: response.data };
  } catch (erreur: unknown) {
    const errorMessage = erreur instanceof Error ? erreur.message : 'Erreur inconnue lors de l\'indexation Google';
    console.error(`[SEO] ❌ Erreur d'indexation: ${urlComplete}`, errorMessage);

    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: { status: 'ERROR', response: { erreur: errorMessage } as any },
    });

    return { succes: false, erreur: errorMessage };
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

  const [projets, articles, offres] = await Promise.all([
    prisma.projet.findMany({ where: { estPublie: true }, select: { slug: true } }),
    prisma.blogArticle.findMany({ where: { estPublie: true }, select: { slug: true } }),
    prisma.jobPosting.findMany({ where: { estPublie: true }, select: { slug: true } }),
  ]);

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