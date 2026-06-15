// src/app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Vérification simplifiée de la session
    const cookieStore = await cookies();
    const token = cookieStore.get('kja_admin_token')?.value;

    if (!token) {
      console.log('❌ Upload: aucun token');
      return NextResponse.json({ erreur: 'Non autorisé - Token manquant' }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      console.log('❌ Upload: session invalide ou expirée');
      return NextResponse.json({ erreur: 'Non autorisé - Session expirée' }, { status: 401 });
    }

    const formData = await request.formData();
    const fichier = formData.get('fichier') as File;
    const dossier = (formData.get('dossier') as string) || 'projets';
    const type = (formData.get('type') as string) || 'GALERIE';
    const projetId = formData.get('projetId') as string | null;
    const alt = (formData.get('alt') as string) || '';

    if (!fichier) {
      return NextResponse.json({ erreur: 'Fichier requis' }, { status: 400 });
    }

    console.log('✅ Upload: session OK, fichier:', fichier.name, 'taille:', fichier.size);

    // Upload vers Cloudinary
    const buffer = Buffer.from(await fichier.arrayBuffer());
    const base64 = `data:${fichier.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: `kja-studio-labs/${dossier}`,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
      ],
    });

    const url = result.secure_url;
    console.log('✅ Upload Cloudinary OK:', url);

    // Sauvegarder dans la BDD
    let imageDB = null;
    if (projetId) {
      imageDB = await prisma.image.create({
        data: {
          projetId,
          nomFichier: result.public_id,
          url,
          taille: result.bytes,
          largeur: result.width,
          hauteur: result.height,
          alt,
          typeMime: 'image/webp',
          format: result.format || 'webp',
          qualite: 85,
          type: type as any,
          estOptimise: true,
          ordre: 0,
        },
      });

      if (type === 'PRINCIPALE') {
        await prisma.projet.update({
          where: { id: projetId },
          data: { imagePrincipale: url },
        });
      }
    }

    return NextResponse.json({
      succes: true,
      image: {
        id: imageDB?.id || null,
        url,
        nomFichier: result.public_id,
        largeur: result.width,
        hauteur: result.height,
        taille: result.bytes,
        format: result.format || 'webp',
      },
    });

  } catch (erreur: any) {
    console.error('❌ Erreur upload:', erreur);
    return NextResponse.json(
      { erreur: erreur.message || 'Erreur lors de l\'upload' },
      { status: 500 }
    );
  }
}