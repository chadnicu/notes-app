"use client";

import Pencil from "@/components/Pencil";
import Check from "@/components/Check";
import Trash from "@/components/Trash";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowTopRight from "@/components/ArrowTopRight";
import { useAuth } from "@clerk/nextjs";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { EditNoteDialog } from "@/components/EditNoteDialog";

type NoteProps = {
  id?: number;
  title: string;
  content: string;
  published?: Date;
};

export default function Note({ id, title, content, published }: NoteProps) {
  const { userId } = useAuth();

  const router = useRouter();

  const [editable, setEditable] = useState(false);

  let newTitle = useRef(title);
  let newContent = useRef(content);

  function handleTitle(e: any) {
    newTitle.current = e.currentTarget.textContent;
  }

  function handleContent(e: any) {
    newContent.current = e.currentTarget.textContent;
  }

  async function handleEdit() {
    setEditable(!editable);
    if (!editable) {
      return;
    }

    await fetch("/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title: newTitle.current,
        content: newContent.current,
        userId,
      }),
    });

    router.refresh();
  }

  const pathname = usePathname();

  async function handleDelete() {
    await fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (pathname !== "/notes") {
      router.replace("/notes");
    }

    router.refresh();
  }

  return (
    <div className="flex h-fit w-72 flex-col gap-3 break-words rounded-md border-2 p-5 text-center">
      <div className="flex items-start justify-between">
        <EditNoteDialog
          noteId={id ?? 0}
          title={newTitle.current}
          content={newContent.current}
          userId={userId ?? ""}
        />
        {/* <button
          onClick={handleEdit}
          className="duration-200 md:hover:text-purple-400"
        >
          {editable ? <Check /> : <Pencil />}
        </button> */}
        <AlertDialogDelete noteId={id ?? 0} />
      </div>
      <h1
        onInput={handleTitle}
        contentEditable={editable}
        className={`text-2xl font-medium ${
          editable ? "border border-zinc-600 p-2" : ""
        }`}
      >
        {title}
      </h1>
      <p
        onInput={handleContent}
        contentEditable={editable}
        className={`text-lg ${editable ? "border border-zinc-600 p-2" : ""}`}
      >
        {content}
      </p>
      <div className="flex items-end justify-between">
        <p className="text-xs">{published?.toString().slice(0, 10)}</p>
        {pathname === "/notes" ? (
          <Link
            href={`/notes/${id}`}
            className="duration-200 md:hover:text-purple-400"
          >
            <ArrowTopRight />
          </Link>
        ) : (
          <p className="text-xs">id: {id}</p>
        )}
      </div>
    </div>
  );
}
