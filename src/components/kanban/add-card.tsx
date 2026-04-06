import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useBoardStore } from "@/store/board";
import { createId } from "@/utils";

interface Props {
  columnId: string;
}

function AddCard({ columnId }: Props) {
  const addCard = useBoardStore((state) => state.addCard);
  const [shouldAdd, setShouldAdd] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-focus on input
  useEffect(() => {
    if (shouldAdd) {
      inputRef.current?.focus();
    }
  }, [shouldAdd]);

  const handleSubmit = (e?: React.SubmitEvent) => {
    e?.preventDefault();
    if (title.trim()) {
      const id = createId("card-");
      addCard(id, columnId, title);
      setTitle("");
    }
  };

  if (!shouldAdd) {
    return (
      <button
        onClick={() => setShouldAdd(true)}
        className="group flex shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-transparent p-3 transition-all hover:border-primary hover:bg-accent"
      >
        <div className="flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-primary">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Card</span>
        </div>
      </button>
    );
  }

  return (
    <div className="shrink-0 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border h-fit">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setShouldAdd(false)}
          placeholder="Task..."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-colors"
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => {
              setShouldAdd(false);
            }}
            className="group flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(AddCard);
