"use client";

import { Note as NoteType } from "@prisma/client";
import PencilSquare from "@/components/PencilSquare";
import Note from "../../components/Note";
import FormPopover from "@/components/FormPopover";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function getNotes() {
  const { data } = await axios.get("/api");
  return data;
}

export default function Notes({ notes }: { notes: NoteType[] }) {
  // optimistic updates dont work
  // const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    initialData: notes,
    // onMutate: async (newNote: NoteType) => {
    //   await queryClient.cancelQueries({ queryKey: ["notes"] });
    //   const previousTodos = queryClient.getQueryData(["notes"]);
    //   queryClient.setQueriesData(["notes"], (old: any) => [...old, newNote]);
    //   return { previousTodos };
    // },
    // onError: (err: any, newTodo: any, context: any) => {
    //   queryClient.setQueryData(["notes"], context.previousTodos);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["notes"] });
    // },
  });

  return (
    <div>
      <section className="relative flex justify-end px-12">
        {isLoading && (
          <div className="absolute inset-0 m-auto h-fit w-fit">
            <div className="flex h-fit w-fit items-center justify-center gap-2">
              <LoadingSpinner size={5} />
              <p>Loading..</p>
            </div>
          </div>
        )}
        <FormPopover />
      </section>

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
