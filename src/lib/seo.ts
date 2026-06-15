// src/lib/seo.ts
import { siteConfig } from '@/config/site';
import { prisma } from './prisma';

interface GenerateSeoMetadataProps {
  titre: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  auteurs?: { nom: string; url?: string }[];
  tags?: string[];
}

export function generateSeoMetadata({
  titre,
  description,
  url,
  image,
  type = 'website',
  publishedAt,
  modifiedAt,
  auteurs,
  tags,
}: GenerateSeoMetadataProps) {
  const urlComplete = `${siteConfig.url}${url}`;
  const imageUrl = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: titre,
    description,
    alternates: {
      canonical: urlComplete,
    },
    openGraph: {
      title: titre,
      description,
      url: urlComplete,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: siteConfig.locale,
      type,
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
      ...(auteurs && { authors: auteurs.map(a => a.url || null).filter(Boolean) }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: titre,
      description,
      images: [imageUrl],
    },
  };
}

// Notifier Google Indexing API après publication
export async function notifyGoogleIndex(url: string, action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  try {
    const logEntry = await prisma.seoLog.create({
      data: {
        url,
        action,
        status: 'PENDING',
      },
    });

    // TODO: Appel à Google Indexing API
    // const result = await googleIndexing.notify(url, action);
    
    await prisma.seoLog.update({
      where: { id: logEntry.id },
      data: {
        status: 'SUCCESS',
        response: {},
      },
    });

    return { succes: true };
  } catch (erreur) {
    console.error('Erreur notification Google:', erreur);
    
    await prisma.seoLog.create({
      data: {
        url,
        action,
        status: 'ERROR',
        response: { erreur: String(erreur) },
      },
    });

    return { succes: false, erreur };
  }
}