export const dynamic = "auto";

import prisma from "@/prisma/client";
import Note from "../Note";
import Link from "next/link";
import ArrowLeft from "@/components/ArrowLeft";
import { auth } from "@clerk/nextjs/app-beta";
import { Suspense } from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();

  const data = await prisma.note.findFirst({
    where: { id: parseInt(params.slug), userId: userId },
  });

  return (
      <main className="absolute inset-0 m-auto grid h-fit w-fit place-items-center gap-6">
        {data === null ? (
          <p className="text-xl">Unauthorized</p>
        ) : (
          <Note
            id={data.id}
            title={data.title}
            content={data.content ?? ""}
            published={data.published}
          />
        )}
        <Link
          href="/notes"
          className="flex items-center gap-1 duration-200 md:hover:text-purple-400"
        >
          <ArrowLeft />
          <p>Go back</p>
        </Link>
      </main>
  );
}
