export const dynamic = "auto";

import prisma from "@/prisma/client";
import SingleNote from "./SingleNote";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = parseInt(params.slug);

  const note = await prisma.note.findUnique({
    where: { id },
  });

  return <>{note !== null && <SingleNote note={note} />}</>;
}
