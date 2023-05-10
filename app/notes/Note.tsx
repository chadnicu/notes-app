"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowTopRight from "@/components/ArrowTopRight";
import { useAuth } from "@clerk/nextjs";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogDelete } from "@/components/AlertDialogDelete";
import { EditNoteDialog } from "@/components/EditNoteDialog";

export default function Note({
  id,
  title,
  content,
  published,
}: {
  id?: number;
  title: string;
  content: string;
  published?: Date;
}) {
  const { userId } = useAuth();

  let newTitle = useRef(title);
  let newContent = useRef(content);

  function handleTitle(e: any) {
    newTitle.current = e.currentTarget.textContent;
  }

  function handleContent(e: any) {
    newContent.current = e.currentTarget.textContent;
  }

  const pathname = usePathname();

  return (
    <div className="flex h-fit w-72 flex-col gap-3 break-words rounded-md border-2 p-5 text-center">
      <div className="flex items-start justify-between">
        <EditNoteDialog
          noteId={id ?? 0}
          title={newTitle.current}
          content={newContent.current}
          userId={userId ?? ""}
        />
        <AlertDialogDelete noteId={id ?? 0} />
      </div>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-lg">{content}</p>
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
