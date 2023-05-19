export const dynamic = "auto";
// export const fetchCache = "force-no-store";
// export const revalidate = 0;

import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/app-beta";
import ClientPage from "./ClientPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();

  const note = await prisma.note.findFirst({
    where: { id: parseInt(params.slug), userId },
  });

  return <ClientPage id={parseInt(params.slug)} note={note} />;
}
