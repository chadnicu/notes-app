import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const id = parseInt(params.slug);

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  return new NextResponse(JSON.stringify(note));
}
