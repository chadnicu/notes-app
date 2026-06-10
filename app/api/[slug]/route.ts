import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await params;
  const id = parseInt(slug);

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  return new NextResponse(JSON.stringify(note));
}
