// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Akplogan292003@', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'kelly.webnux@gmail.com' },
    update: { passwordHash: hash, role: 'SUPER_ADMIN' },
    create: {
      email: 'kelly.webnux@gmail.com',
      passwordHash: hash,
      name: 'Admin KJA',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Admin créé:', admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });