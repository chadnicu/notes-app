import prisma from '@/prisma/client';

export async function POST(req: Request) {
  const body = await req.json();

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
