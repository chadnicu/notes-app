import prisma from '@/prisma/client';

export async function getNotes() {
  const data = await prisma.note.findMany();

  return data;
}
