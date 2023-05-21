import { auth } from "@clerk/nextjs";
import Notes from "./Notes";
import prisma from "@/prisma/client";

export default async function Home() {
  const { userId } = auth();

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return <Notes notes={notes} />;
}
