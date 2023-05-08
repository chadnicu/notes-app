import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PencilSquare from "./PencilSquare";
import { Textarea } from "./ui/textarea";

export function FormPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-fit w-fit p-2">
          <PencilSquare size={8} />
          <span className="sr-only">Open form to add note</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="container mr-2 md:mr-12">
        <form action="">
          <div className="grid gap-6">
            <div className="space-y-2 ">
              <h4 className="font-medium leading-none">Add a new note</h4>
              <p className="text-sm text-muted-foreground">
                The title is mandatory
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue="" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  defaultValue=""
                  className="col-span-2 "
                />
              </div>

              <Button variant={"outline"}>Add</Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
