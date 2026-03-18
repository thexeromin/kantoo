import { useSortable } from "@dnd-kit/react/sortable";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Task } from "./types";

interface Props {
  id: number;
  index: number;
  column: string;
  task: Task;
  onDelete: (taskId: number, columnId: string) => void;
}

export default function KanbanCard({
  id,
  index,
  column,
  task,
  onDelete
}: Props) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="group relative mb-3 flex cursor-grab flex-col gap-2 rounded-lg
                 bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-all
                 hover:shadow-md hover:ring-blue-400 active:cursor-grabbing
                 dark:bg-slate-700 dark:ring-slate-600 dark:hover:ring-blue-500"
    >
      <div className="flex items-start justify-between flex-row">
        <div className="flex items-start justify-between flex-col">
          <h4 className="font-medium text-slate-700 dark:text-white">
            {task.title}
          </h4>

          {task.description && (
            <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-300">
              {task.description}
            </p>
          )}
        </div>
        <Button
          onClick={() => onDelete(task.id, column)}
          variant="ghost"
          size="icon"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}
