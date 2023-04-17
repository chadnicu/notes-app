import prisma from '@/prisma/client';

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      userId: body.userId,
    },
  });

  return new Response(
    JSON.stringify({ title: body.title, content: body.content })
  );
}

export async function PUT(req: Request) {
  const body = await req.json();

  await prisma.note.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return new Response(
    JSON.stringify({ title: body.title, content: body.content })
  );
}

export async function DELETE(req: Request) {
  const body = await req.json();
  
  await prisma.note.delete({
    where: {
      id: body.id,
    },
  });

  return new Response(JSON.stringify({ id: body.id }));
}

// clerk
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getAuth } from '@clerk/nextjs/server';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId } = getAuth(req);
//   if (!userId) {
//     res.status(401).json({ error: 'Unauthorized' });
//     return;
//   }
//   // retrieve data from your database
//   res.status(200).json({});
// }
