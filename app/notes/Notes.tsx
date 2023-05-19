"use client";

import { Note as NoteType } from "@prisma/client";
import PencilSquare from "@/components/PencilSquare";
import {
  experimental_useOptimistic as useOptimistic,
  useTransition,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { addNote } from "@/lib/actions";
import Note from "./Note";
import FormPopover from "@/components/FormPopover";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

async function fetchNotes() {
  // const res = await fetch("/api", {
  //   method: "GET",
  //   headers: { "Content-Type": "Application/json" },
  // });
  // const data = await res.json();
  const { data } = await axios.get("/api");
  return data;
}

export default function Notes({ notes }: { notes: NoteType[] }) {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    initialData: notes,
  });

  console.log(data, "NIGEEERR");

  const [isPending, startTransition] = useTransition();

  // const [optimisticNotes, addOptimisticNotes] = useOptimistic(
  //   // notes,
  //   data,
  //   (state, newNote: any) => [...state, newNote]
  // );

  async function addTheNote(formData: FormData) {
    {
      const [title, content] = [
        formData.get("title")?.toString(),
        formData.get("content")?.toString(),
      ];
      // console.log(title, content);
      // if (title && content != undefined && userId) {
      //   addOptimisticNotes({
      //     title,
      //     content,
      //     userId,
      //   });
      // }
      startTransition(
        async () =>
          await addNote(title ?? "", content, userId).then(() => {
            queryClient.invalidateQueries(["notes"]);
            queryClient.invalidateQueries(["note"]);
          })
        // .then(() => console.log(data, "UNGABHDKS"))
      );
    }
  }

  return (
    <div>
      <div className="relative flex justify-end px-12">
        <FormPopover addNote={addTheNote} />
        <div className="absolute inset-0 m-auto h-fit w-fit">
          {(isPending || isLoading) && (
            <div className="flex h-fit w-fit items-center justify-center gap-2">
              <LoadingSpinner size={5} />
              <p>Syncing..</p>
            </div>
          )}
        </div>
      </div>

      {isError ? (
        <p className="absolute inset-0 m-auto flex h-6 w-fit justify-center text-center">
          Something went wrong
        </p>
      ) : (
        <div className="mb-16 grid grid-cols-1 place-items-center gap-10 py-10 md:grid-cols-2 md:place-items-start md:p-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.length === 0 && (
            <p className="absolute inset-0 m-auto flex h-6 w-80 justify-center gap-1 text-center">
              There{"'"}s no notes. Click <PencilSquare size={5} />
              to add some
            </p>
          )}
          {data?.map((note: NoteType) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content ?? ""}
              // published={note.published}
            />
          ))}
        </div>
      )}
    </div>
  );
}
