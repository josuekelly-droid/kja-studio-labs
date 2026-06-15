// src/app/api/admin/projets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import slugify from 'slugify';

// GET : Lister tous les projets
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

  const projets = await prisma.projet.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      images: { orderBy: { ordre: 'asc' } },
      technologies: { include: { technologie: true } },
    },
  });

  return NextResponse.json(projets);
}

// POST : Créer un projet
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Générer un slug unique
    let slug = slugify(data.titre, { lower: true, strict: true });
    const slugExistant = await prisma.projet.findUnique({ where: { slug } });
    if (slugExistant) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const projet = await prisma.projet.create({
      data: {
        titre: data.titre,
        slug,
        descriptionCourte: data.descriptionCourte || '',
        contenuComplet: data.contenuComplet || '',
        categorie: data.categorie || 'FULLSTACK',
        client: data.client || null,
        dateRealisation: data.dateRealisation ? new Date(data.dateRealisation) : null,
        lienProjet: data.lienProjet || null,
        lienFigma: data.lienFigma || null,
        lienGithub: data.lienGithub || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || [],
        featured: data.featured || false,
        estPublie: data.estPublie || false,
        authorId: session.user.id,
        // Technologies
        technologies: data.technologies?.length > 0 ? {
          create: data.technologies.map((techId: string) => ({
            technologie: { connect: { id: techId } },
          })),
        } : undefined,
      },
    });

    // Si publié, notifier Google
    if (projet.estPublie) {
      await notifyGoogleIndex(`/portfolio/${projet.slug}`, 'URL_UPDATED');
    }

    return NextResponse.json(projet, { status: 201 });

  } catch (erreur) {
    console.error('Erreur création projet:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}