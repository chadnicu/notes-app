import { auth } from "@clerk/nextjs/server";
import Notes from "./Notes";
import prisma from "@/prisma/client";

export default async function Home() {
  const { userId } = await auth();

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return <Notes notes={notes} />;
}
