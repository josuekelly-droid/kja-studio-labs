// src/app/api/admin/projets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import slugify from 'slugify';

// GET : Détail d'un projet
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;

  const projet = await prisma.projet.findUnique({
    where: { id },
    include: {
      images: { orderBy: { ordre: 'asc' } },
      technologies: { include: { technologie: true } },
      avis: true,
    },
  });

  if (!projet) {
    return NextResponse.json({ erreur: 'Projet non trouvé' }, { status: 404 });
  }

  return NextResponse.json(projet);
}

// PUT : Modifier un projet
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

    // Mettre à jour le slug si le titre change
    let slug = data.slug;
    if (data.titre && data.titre !== data.ancienTitre) {
      slug = slugify(data.titre, { lower: true, strict: true });
      const slugExistant = await prisma.projet.findFirst({
        where: { slug, id: { not: id } },
      });
      if (slugExistant) {
        slug = `${slug}-${Date.now().toString(36)}`;
      }
    }

    const projet = await prisma.projet.update({
      where: { id },
      data: {
        titre: data.titre,
        slug: slug,
        descriptionCourte: data.descriptionCourte,
        contenuComplet: data.contenuComplet,
        categorie: data.categorie,
        client: data.client,
        dateRealisation: data.dateRealisation ? new Date(data.dateRealisation) : null,
        lienProjet: data.lienProjet,
        lienFigma: data.lienFigma,
        lienGithub: data.lienGithub,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        featured: data.featured,
        estPublie: data.estPublie,
        // Mise à jour des technologies
        technologies: data.technologies ? {
          deleteMany: {},
          create: data.technologies.map((techId: string) => ({
            technologie: { connect: { id: techId } },
          })),
        } : undefined,
      },
      include: {
        images: { orderBy: { ordre: 'asc' } },
        technologies: { include: { technologie: true } },
      },
    });

    // Notifier Google
    if (projet.estPublie) {
      await notifyGoogleIndex(`/portfolio/${projet.slug}`, 'URL_UPDATED');
    } else {
      await notifyGoogleIndex(`/portfolio/${projet.slug}`, 'URL_DELETED');
    }

    return NextResponse.json(projet);

  } catch (erreur) {
    console.error('Erreur modification projet:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la modification' },
      { status: 500 }
    );
  }
}

// DELETE : Supprimer un projet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;

  const projet = await prisma.projet.findUnique({ where: { id } });

  if (!projet) {
    return NextResponse.json({ erreur: 'Projet non trouvé' }, { status: 404 });
  }

  await prisma.projet.delete({ where: { id } });

  // Notifier Google de la suppression
  await notifyGoogleIndex(`/portfolio/${projet.slug}`, 'URL_DELETED');

  return NextResponse.json({ succes: true });
}