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
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import LoadingSpinner from "./LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { editNote } from "@/app/actions";

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
  const [isPending, startTransition] = useTransition();
  // const [opened, setOpened] = useState(false); // have to click edit icon twice after saving the note
  // console.log(opened);

  const [formTitle, setFormTitle] = useState(title);
  const [formContent, setFormContent] = useState(content);

  const queryClient = useQueryClient();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="duration-200 md:hover:text-purple-400"
          // onClick={() => {
          //   setOpened(true);
          // }}
        >
          <Pencil />
        </button>
      </DialogTrigger>
      {/* {opened && ( */}
      {true && (
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={async (formData) => {
              const [newTitle, newContent] = [
                formData.get("title"),
                formData.get("content"),
              ];
              // setOpened(false);
              if (
                newTitle?.toString() !== title ||
                newContent?.toString() !== content
              ) {
                setFormTitle(newTitle?.toString() ?? title);
                setFormContent(newContent?.toString() ?? content);
                startTransition(
                  async () =>
                    await editNote(
                      noteId,
                      newTitle?.toString() ?? "",
                      newContent?.toString()
                    ).then(() => {
                      queryClient.invalidateQueries(["notes"]);
                      queryClient.invalidateQueries(["note"]);
                    })
                );
              }
            }}
            // ref={ref.current}
          >
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
                <Input
                  id="title"
                  name="title"
                  defaultValue={formTitle}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={formContent}
                  className="col-span-3"
                />
              </div>
            </div>
            {/* <DialogFooter> */}
            <div className="flex justify-between">
              <div
                className={`-mb-6 flex items-center justify-center gap-2 ${
                  isPending ? "opacity-100" : "opacity-0"
                }`}
              >
                <LoadingSpinner size={5} />
                <p>Saving..</p>
              </div>
              <Button type="submit">Save changes</Button>
            </div>
            {/* </DialogFooter> */}
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
