// lib/prisma.ts
import { PrismaClient } from '@/generated/prisma/client';

// Déclaration globale pour le type
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
})();

export default prisma;