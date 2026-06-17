// scripts/generate-assets.ts
import sharp from 'sharp';
import { join } from 'path';
import { mkdir } from 'fs/promises';

const LOGO_SOURCE = join(process.cwd(), 'public/logo/kja-studio-labs.jpg');
const OUTPUT_DIR = join(process.cwd(), 'public/logo');

async function generateAssets() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Favicon SVG (32x32)
  await sharp(LOGO_SOURCE)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(join(OUTPUT_DIR, 'kja-favicon.png'));

  // Apple Touch Icon (180x180)
  await sharp(LOGO_SOURCE)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(OUTPUT_DIR, 'kja-apple-touch.png'));

  // Open Graph Image (1200x630)
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 79, g: 25, b: 164, alpha: 1 }, // #4F19A4
    },
  })
    .composite([
      { input: await sharp(LOGO_SOURCE).resize(200, 200, { fit: 'contain' }).toBuffer(), gravity: 'center' },
    ])
    .jpeg({ quality: 90 })
    .toFile(join(OUTPUT_DIR, 'kja-og-image.jpg'));

  // Logo blanc (pour fond sombre)
  await sharp(LOGO_SOURCE)
  .resize(200, 200, { fit: 'contain' })
  .negate()
  .png()
  .toFile(join(OUTPUT_DIR, 'kja-logo-white.png'));

  console.log('✅ Assets générés avec succès !');
}

generateAssets().catch(console.error);