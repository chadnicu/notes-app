export const dynamic = "auto";

import prisma from "@/prisma/client";
import SingleNote from "./SingleNote";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = parseInt(slug);

  const note = await prisma.note.findUnique({
    where: { id },
  });

  return <>{note !== null && <SingleNote note={note} />}</>;
}
