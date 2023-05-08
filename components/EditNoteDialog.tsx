import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Pencil from "./Pencil";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";
// neeeds work
export function EditNoteDialog({
  noteId,
  title,
  content,
  userId,
}: {
  noteId: number;
  title: string;
  content: string;
  userId: string;
}) {
  const router = useRouter();

  async function handleEdit() {
    await fetch("/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteId,
        title,
        content,
        userId,
      }),
    });

    router.refresh();
  }

  return (
    <form action="">
      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={handleEdit}
            className="duration-200 md:hover:text-purple-400"
          >
            <Pencil />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit note</DialogTitle>
            <DialogDescription>
              Make changes to your note here. Click save when you{"'"}re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea id="content" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
