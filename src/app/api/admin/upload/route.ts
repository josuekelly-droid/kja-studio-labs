// src/app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const fichier = formData.get('fichier') as File;
    const dossier = (formData.get('dossier') as string) || 'projets';
    const type = (formData.get('type') as string) || 'GALERIE';
    const projetId = formData.get('projetId') as string | null;
    const alt = (formData.get('alt') as string) || '';

    if (!fichier) {
      return NextResponse.json({ erreur: 'Fichier requis' }, { status: 400 });
    }

    const typesAutorises = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!typesAutorises.includes(fichier.type)) {
      return NextResponse.json({ erreur: 'Format non supporté' }, { status: 400 });
    }

    if (fichier.size > 10 * 1024 * 1024) {
      return NextResponse.json({ erreur: 'Fichier trop volumineux (max 10MB)' }, { status: 400 });
    }

    // Convertir le fichier en base64 pour Cloudinary
    const buffer = Buffer.from(await fichier.arrayBuffer());
    const base64 = `data:${fichier.type};base64,${buffer.toString('base64')}`;

    // Upload vers Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: `kja-studio-labs/${dossier}`,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
      ],
    });

    const url = result.secure_url;

    // Sauvegarder dans la BDD si projetId fourni
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
          format: result.format,
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
        format: result.format,
      },
    });

  } catch (erreur) {
    console.error('Erreur upload:', erreur);
    return NextResponse.json({ erreur: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}