import prisma from '@/prisma/client';

import { cache } from 'react';

export const getNotes = cache(async () => {
  const data = await prisma.note.findMany();

  return data;
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return new Response(
    JSON.stringify({ title: body.title, content: body.content })
  );
}
