// src/app/api/admin/avis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET : Lister tous les avis
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statut = searchParams.get('statut');

  const where: any = {};
  if (statut === 'approuve') where.estApprouve = true;
  if (statut === 'en_attente') where.estApprouve = false;

  const avis = await prisma.avis.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      projet: { select: { titre: true } },
    },
  });

  return NextResponse.json(avis);
}

// POST : Créer un avis (depuis le formulaire public ou admin)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const avis = await prisma.avis.create({
      data: {
        nomClient: data.nomClient,
        entreprise: data.entreprise || null,
        poste: data.poste || null,
        note: data.note || 5,
        commentaire: data.commentaire,
        projetId: data.projetId || null,
        estApprouve: false,
        estAffiché: false,
      },
    });

    return NextResponse.json(avis, { status: 201 });

  } catch (erreur) {
    console.error('Erreur création avis:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la création de l\'avis' },
      { status: 500 }
    );
  }
}