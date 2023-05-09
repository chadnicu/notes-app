"use server";

import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function getNotes(userId: string | null | undefined) {
  const notes = prisma.note.findMany({
    where: {
      userId,
    },
  });
  return notes;
}

export async function addNote(
  title: string,
  content: string | undefined,
  userId: string | null | undefined
) {
  await prisma.note.create({
    data: {
      title,
      content,
      userId,
    },
  });
  // revalidatePath("/notes");  // added optimistic updates 

  // return new NextResponse(JSON.stringify({ title, content }));
}

export async function deleteNote(id: number) {
  await prisma.note.delete({ where: { id } });
  revalidatePath("/notes");
}

export async function editNote(
  noteId: number,
  title: string,
  content: string | undefined
) {
  await prisma.note.update({
    where: { id: noteId },
    data: {
      title,
      content,
    },
  });
  revalidatePath("/notes");

  // return new NextResponse(JSON.stringify({ title, content }));
}
