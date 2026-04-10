import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { boardSchema, type BoardInput } from "@/lib/validations/board";
import { boardService } from "@/services/board";

export default function AddBoard() {
  const form = useForm<BoardInput>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const { mutateAsync: signup, isPending } = useMutation({
    mutationFn: boardService.create,
    onSuccess: () => {
      toast.success("Board added");
      form.reset();
    },
    onError: (error: Error) => {
      toast.error("Login Failed", {
        description: error.message,
        position: "top-center"
      });
    }
  });

  async function onSubmit(data: BoardInput) {
    signup(data);
  }

  const { errors } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          New Board
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Board</DialogTitle>
          <DialogDescription>
            Organize tasks with a new project board.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup className="space-y-5">
            <Field className="space-y-2">
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="e.g., Marketing Campaign"
                className={
                  errors.title
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </Field>

            <Field className="space-y-2">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="What is the purpose of this board?"
                className={`resize-none ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
