// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { cache } from 'react';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : [],
});

if (process.env.NODE_ENV === 'development') {
  prisma.$connect()
    .then(() => console.log('✅ Prisma connecté'))
    .catch((e) => console.log('⏳ Prisma - connexion différée:', e.message));
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const getProjetsRecents = cache(async () => {
  return prisma.projet.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      slug: true,
      titre: true,
      descriptionCourte: true,
      categorie: true,
      imagePrincipale: true,
    },
  });
});

export const getArticlesRecents = cache(async () => {
  return prisma.blogArticle.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
    select: {
      id: true,
      slug: true,
      titre: true,
      extrait: true,
      categorie: true,
      imagePrincipale: true,
      tempsLecture: true,
      createdAt: true,
    },
  });
});

export const getAvisRecents = cache(async () => {
  return prisma.avis.findMany({
    where: { estApprouve: true, estAffiché: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
    select: {
      id: true,
      nomClient: true,
      entreprise: true,
      poste: true,
      note: true,
      commentaire: true,
    },
  });
});

export const getTotalProjets = cache(async () => {
  return prisma.projet.count({ where: { estPublie: true } });
});

export const getTotalArticles = cache(async () => {
  return prisma.blogArticle.count({ where: { estPublie: true } });
});