// src/app/api/admin/blog/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import slugify from 'slugify';

// GET : Détail d'un article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;

  const article = await prisma.blogArticle.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, email: true } },
    },
  });

  if (!article) {
    return NextResponse.json({ erreur: 'Article non trouvé' }, { status: 404 });
  }

  return NextResponse.json(article);
}

// PUT : Modifier un article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    let slug = data.slug;
    if (data.titre) {
      slug = slugify(data.titre, { lower: true, strict: true });
      const slugExistant = await prisma.blogArticle.findFirst({
        where: { slug, id: { not: id } },
      });
      if (slugExistant) {
        slug = `${slug}-${Date.now().toString(36)}`;
      }
    }

    const mots = (data.contenu || '').split(/\s+/).length;
    const tempsLecture = Math.max(1, Math.ceil(mots / 200));

    const article = await prisma.blogArticle.update({
      where: { id },
      data: {
        titre: data.titre,
        slug,
        contenu: data.contenu,
        extrait: data.extrait,
        categorie: data.categorie,
        tags: data.tags,
        imagePrincipale: data.imagePrincipale,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        tempsLecture,
        featured: data.featured,
        estPublie: data.estPublie,
      },
    });

    // Notifier Google
    if (article.estPublie) {
      await notifyGoogleIndex(`/blog/${article.slug}`, 'URL_UPDATED');
    } else {
      await notifyGoogleIndex(`/blog/${article.slug}`, 'URL_DELETED');
    }

    return NextResponse.json(article);

  } catch (erreur) {
    console.error('Erreur modification article:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la modification' },
      { status: 500 }
    );
  }
}

// DELETE : Supprimer un article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;

  const article = await prisma.blogArticle.findUnique({ where: { id } });

  if (!article) {
    return NextResponse.json({ erreur: 'Article non trouvé' }, { status: 404 });
  }

  await prisma.blogArticle.delete({ where: { id } });

  await notifyGoogleIndex(`/blog/${article.slug}`, 'URL_DELETED');

  return NextResponse.json({ succes: true });
}