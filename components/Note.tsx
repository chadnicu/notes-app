"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ArrowTopRight from "@/components/ArrowTopRight";
import { useAuth } from "@clerk/nextjs";
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

  const pathname = usePathname();

  return (
    <div className="flex h-fit w-72 flex-col gap-3 break-words rounded-md border-2 p-5 text-center">
      <div className="flex items-start justify-between">
        <EditNoteDialog
          noteId={id ?? 0}
          title={title}
          content={content}
          userId={userId ?? ""}
        />
        <AlertDialogDelete noteId={id ?? 0} />
      </div>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-lg">{content}</p>
      <div className="flex items-end justify-between">
        <p className="text-xs">
          {published !== undefined
            ? JSON.stringify(published).slice(1, 11)
            : ""}
        </p>
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
