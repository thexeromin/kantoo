import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";

interface Props {
  onAdd: (title: string) => void;
}

export default function AddColumn({ onAdd }: Props) {
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
      onAdd(title);
      setTitle("");
    }
  };

  if (!shouldAdd) {
    return (
      <button
        onClick={() => setShouldAdd(true)}
        className="group flex w-80 shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 transition-all hover:border-blue-400 hover:bg-white hover:shadow-md dark:border-gray-700 dark:bg-gray-800/30 dark:hover:border-blue-500 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-2 text-slate-500 transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Column</span>
        </div>
      </button>
    );
  }

  return (
    <div className="w-80 shrink-0 rounded-xl bg-slate-100 p-4 shadow-sm ring-1 ring-slate-200 dark:bg-gray-800 dark:ring-gray-700 h-fit">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setShouldAdd(false)}
          placeholder="Column title..."
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => {
              setShouldAdd(false);
            }}
            className="group flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
