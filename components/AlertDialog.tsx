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
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function AlertDialogDelete({ noteId }: { noteId: number }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleDelete() {
    await fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteId,
      }),
    });

    if (pathname !== "/notes") {
      router.replace("/notes");
    }

    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="duration-200 md:hover:text-purple-400">
          <Trash />
        </button>
      </AlertDialogTrigger> 
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
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
