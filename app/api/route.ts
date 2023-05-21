import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// i only have to use get to refetch with react query, others are now unused because of server actions
export async function GET() {
  const { userId } = auth();

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return new NextResponse(JSON.stringify(notes));
}

// export async function POST(req: Request) {
//   const body = await req.json();

//   await prisma.note.create({
//     data: {
//       title: body.title,
//       content: body.content,
//       userId: body.userId,
//     },
//   });

//   return new NextResponse(
//     JSON.stringify({ title: body.title, content: body.content })
//   );
// }

// export async function PUT(req: Request) {
//   const body = await req.json();

//   await prisma.note.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       title: body.title,
//       content: body.content,
//     },
//   });

//   return new NextResponse(
//     JSON.stringify({ title: body.title, content: body.content })
//   );
// }

// export async function DELETE(req: Request) {
//   const body = await req.json();

//   await prisma.note.delete({
//     where: {
//       id: body.id,
//     },
//   });

//   return new NextResponse(JSON.stringify({ id: body.id }));
// }
