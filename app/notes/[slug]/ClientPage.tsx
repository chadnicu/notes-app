"use client";

import Note from "../Note";
import ArrowLeft from "@/components/ArrowLeft";
import { Note as NoteType } from "@prisma/client";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import NoteSkeleton from "@/components/NoteSkeleton";

async function fetchNote(id: number) {
  const { data } = await axios.get(`/api/${id}`);
  return data;
}

export default function ClientPage({
  note,
  id,
}: {
  note: NoteType | null;
  id: number;
}) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["note"],
    queryFn: async () => fetchNote(id),
    initialData: note,
  });

  return (
    <main className="absolute inset-0 m-auto grid h-fit w-fit place-items-center gap-6">
      {isLoading ? (
        <NoteSkeleton />
      ) : isError ? (
        <p className="text-center">Something went wrong</p>
      ) : (
        <div>
          {data === null ? (
            <p className="text-center text-2xl font-bold">404 note not found</p>
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
            className="mt-5 flex items-center justify-center gap-1 duration-200 md:hover:text-purple-400"
          >
            <ArrowLeft />
            <p>Go back</p>
          </Link>
        </div>
      )}
    </main>
  );
}

// termina asta
