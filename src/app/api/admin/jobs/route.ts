// src/app/api/admin/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import slugify from 'slugify';

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });

  const jobs = await prisma.jobPosting.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });

  try {
    const data = await request.json();

    let slug = slugify(data.titre, { lower: true, strict: true });
    const existant = await prisma.jobPosting.findUnique({ where: { slug } });
    if (existant) slug = `${slug}-${Date.now().toString(36)}`;

    const job = await prisma.jobPosting.create({
      data: {
        titre: data.titre,
        slug,
        typeContrat: data.typeContrat,
        localisation: data.localisation,
        description: data.description || '',
        competences: data.competences || [],
        salaire: data.salaire || null,
        emailContact: data.emailContact,
        dateExpiration: data.dateExpiration ? new Date(data.dateExpiration) : null,
        estPublie: data.estPublie || false,
      },
    });

    if (job.estPublie) {
      await notifyGoogleIndex(`/carrieres/${job.slug}`, 'URL_UPDATED');
    }

    return NextResponse.json(job, { status: 201 });

  } catch (erreur) {
    console.error('Erreur création offre:', erreur);
    return NextResponse.json({ erreur: 'Erreur lors de la création de l\'offre' }, { status: 500 });
  }
}