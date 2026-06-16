// src/app/api/admin/jobs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import slugify from 'slugify';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { id } });
  if (!job) return NextResponse.json({ erreur: 'Offre non trouvée' }, { status: 404 });

  return NextResponse.json(job);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });

  const { id } = await params;

  try {
    const data = await request.json();

    let slug = data.slug;
    if (data.titre) {
      slug = slugify(data.titre, { lower: true, strict: true });
      const existant = await prisma.jobPosting.findFirst({ where: { slug, id: { not: id } } });
      if (existant) slug = `${slug}-${Date.now().toString(36)}`;
    }

    const job = await prisma.jobPosting.update({
      where: { id },
      data: {
        titre: data.titre,
        slug,
        typeContrat: data.typeContrat,
        localisation: data.localisation,
        description: data.description,
        competences: data.competences,
        salaire: data.salaire,
        emailContact: data.emailContact,
        dateExpiration: data.dateExpiration ? new Date(data.dateExpiration) : null,
        estPublie: data.estPublie,
      },
    });

    if (job.estPublie) {
      await notifyGoogleIndex(`/carrieres/${job.slug}`, 'URL_UPDATED');
    } else {
      await notifyGoogleIndex(`/carrieres/${job.slug}`, 'URL_DELETED');
    }

    return NextResponse.json(job);

  } catch (erreur) {
    console.error('Erreur modification offre:', erreur);
    return NextResponse.json({ erreur: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });

  const { id } = await params;

  const job = await prisma.jobPosting.findUnique({ where: { id } });
  if (!job) return NextResponse.json({ erreur: 'Offre non trouvée' }, { status: 404 });

  await prisma.jobPosting.delete({ where: { id } });

  await notifyGoogleIndex(`/carrieres/${job.slug}`, 'URL_DELETED');

  return NextResponse.json({ succes: true });
}