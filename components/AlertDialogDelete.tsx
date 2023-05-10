import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Trash from "./Trash";
import { useTransition } from "react";
import { deleteNote } from "@/lib/actions";
import LoadingSpinner from "./LoadingSpinner";

export function AlertDialogDelete({ noteId }: { noteId: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <AlertDialog>
        {isPending ? (
          <LoadingSpinner size={7} />
        ) : (
          <AlertDialogTrigger asChild>
            <button className="duration-200 md:hover:text-purple-400">
              <Trash />
            </button>
          </AlertDialogTrigger>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => startTransition(() => deleteNote(noteId))}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
