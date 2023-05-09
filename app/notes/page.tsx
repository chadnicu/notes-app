export const dynamic = "auto";

import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import Notes from "./Notes";

export default async function Home() {
  const { userId } = auth();

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return <Notes notes={notes} />;
}
