// src/app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

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

    // Créer le dossier
    const dossierPath = join(process.cwd(), 'public', 'uploads', dossier);
    await mkdir(dossierPath, { recursive: true });

    // Nom unique
    const nomBase = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    const nomFichier = `${nomBase}.webp`;

    const buffer = Buffer.from(await fichier.arrayBuffer());

    const configs = {
      PRINCIPALE: { largeur: 1920, hauteur: 1080, qualite: 85 },
      GALERIE: { largeur: 1600, hauteur: 1200, qualite: 80 },
      MINIATURE: { largeur: 600, hauteur: 400, qualite: 75 },
    };

    const config = configs[type as keyof typeof configs] || configs.GALERIE;

    const imageOptimisee = await sharp(buffer)
      .resize(config.largeur, config.hauteur, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: config.qualite })
      .toBuffer();

    const cheminComplet = join(dossierPath, nomFichier);
    await writeFile(cheminComplet, imageOptimisee);

    const metadata = await sharp(imageOptimisee).metadata();
    const url = `/uploads/${dossier}/${nomFichier}`;

    // Sauvegarder dans la BDD si projetId fourni
    let imageDB = null;
    if (projetId) {
      imageDB = await prisma.image.create({
        data: {
          projetId,
          nomFichier,
          url,
          taille: imageOptimisee.length,
          largeur: metadata.width || config.largeur,
          hauteur: metadata.height || config.hauteur,
          alt,
          typeMime: 'image/webp',
          format: 'webp',
          qualite: config.qualite,
          type: type as any,
          estOptimise: true,
          ordre: 0,
        },
      });

      // Si PRINCIPALE, mettre à jour le projet
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
        nomFichier,
        largeur: metadata.width || config.largeur,
        hauteur: metadata.height || config.hauteur,
        taille: imageOptimisee.length,
        format: 'webp',
      },
    });

  } catch (erreur) {
    console.error('Erreur upload:', erreur);
    return NextResponse.json({ erreur: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}