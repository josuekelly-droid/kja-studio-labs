// src/app/api/admin/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { erreur: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const user = await verifyPassword(email, password);

    if (!user) {
      return NextResponse.json(
        { erreur: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      succes: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

  } catch (erreur) {
    console.error('Erreur login:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur serveur' },
      { status: 500 }
    );
  }
}