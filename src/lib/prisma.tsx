// lib/prisma.ts
import { PrismaClient } from '@/generated/prisma/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const libsql = createClient({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});


const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma: PrismaClient = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient({ adapter });
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient({ adapter });
    }
    return global.prisma;
  }
})();

export default prisma;
