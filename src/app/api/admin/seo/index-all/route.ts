// src/app/api/admin/seo/index-all/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { indexAllPages } from '@/lib/google-indexing';

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });

  try {
    const resultats = await indexAllPages();
    return NextResponse.json({ succes: true, total: resultats.length, resultats });
  } catch (erreur) {
    return NextResponse.json({ erreur: 'Erreur lors de l\'indexation' }, { status: 500 });
  }
}