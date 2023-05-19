import { auth, useAuth } from "@clerk/nextjs";
import Notes from "./Notes";
import prisma from "@/prisma/client";

export default async function Home() {
  const { userId } = auth(); // on server use auth()

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <Notes notes={notes} />
    </>
  );
}
