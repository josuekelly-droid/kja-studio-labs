// src/lib/google-indexing.ts
import { google } from 'googleapis';
import { prisma } from './prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Initialiser le client Google
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

/**
 * Notifier Google de l'indexation d'une URL
 */
export async function notifyGoogleIndex(
  url: string,
  action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
) {
  const urlComplete = `${SITE_URL}${url}`;

  // Logger dans la BDD
  const logEntry = await prisma.seoLog.create({
    data: {
      url: urlComplete,
      action,
      status: 'PENDING',
    },
  });

  // En développement, on ne fait pas l'appel API
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
      requestBody: {
        url: urlComplete,
        type: action,
      },
    });

    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: {
        status: 'SUCCESS',
        response: response.data as any,
      },
    });

    console.log(`[SEO] ✅ Indexé: ${urlComplete}`);
    return { succes: true, data: response.data };
  } catch (erreur: any) {
    console.error(`[SEO] ❌ Erreur indexation: ${urlComplete}`, erreur.message);

    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: {
        status: 'ERROR',
        response: { erreur: erreur.message },
      },
    });

    return { succes: false, erreur: erreur.message };
  }
}

/**
 * Indexer toutes les pages d'un site
 */
export async function indexAllPages() {
  const pages = [
    '/',
    '/portfolio',
    '/services',
    '/services/design-ui-ux',
    '/services/developpement-fullstack',
    '/services/connect',
    '/blog',
    '/a-propos',
    '/avis',
    '/contact',
  ];

  const resultats = [];
  
  for (const page of pages) {
    const resultat = await notifyGoogleIndex(page);
    resultats.push({ page, ...resultat });
    // Attendre 1 seconde entre chaque appel (rate limit Google)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return resultats;
}