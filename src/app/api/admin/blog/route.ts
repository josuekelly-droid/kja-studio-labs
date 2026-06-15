// src/app/api/admin/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import slugify from 'slugify';

// GET : Lister tous les articles
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categorie = searchParams.get('categorie');
  const statut = searchParams.get('statut');

  const where: any = {};
  if (categorie) where.categorie = categorie;
  if (statut === 'publie') where.estPublie = true;
  if (statut === 'brouillon') where.estPublie = false;

  const articles = await prisma.blogArticle.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      author: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json(articles);
}

// POST : Créer un article
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Générer un slug unique
    let slug = slugify(data.titre, { lower: true, strict: true });
    const slugExistant = await prisma.blogArticle.findUnique({ where: { slug } });
    if (slugExistant) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Calculer le temps de lecture
    const mots = (data.contenu || '').split(/\s+/).length;
    const tempsLecture = Math.max(1, Math.ceil(mots / 200));

    const article = await prisma.blogArticle.create({
      data: {
        titre: data.titre,
        slug,
        contenu: data.contenu || '',
        extrait: data.extrait || '',
        categorie: data.categorie || 'ACTUALITE',
        tags: data.tags || [],
        imagePrincipale: data.imagePrincipale || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || [],
        tempsLecture,
        featured: data.featured || false,
        estPublie: data.estPublie || false,
        authorId: session.user.id,
      },
    });

    // Si publié, notifier Google
    if (article.estPublie) {
      await notifyGoogleIndex(`/blog/${article.slug}`, 'URL_UPDATED');
    }

    return NextResponse.json(article, { status: 201 });

  } catch (erreur) {
    console.error('Erreur création article:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    );
  }
}