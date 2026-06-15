// src/app/api/admin/avis/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// PUT : Approuver/Désapprouver un avis
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const avis = await prisma.avis.update({
    where: { id },
    data: {
      estApprouve: data.estApprouve ?? true,
      estAffiché: data.estAffiché ?? true,
    },
  });

  return NextResponse.json(avis);
}

// DELETE : Supprimer un avis
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.avis.delete({ where: { id } });

  return NextResponse.json({ succes: true });
}