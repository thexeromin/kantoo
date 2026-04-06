import React from "react";
import { TrashIcon } from "lucide-react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import { useBoardStore } from "@/store/board";

import { Button } from "@/components/ui/button";
import KanbanCard from "./card";
import AddCard from "./add-card";

interface Props {
  id: string;
  index: number;
}

function KanbanColumn({ id, index }: Props) {
  const column = useBoardStore((state) => state.columns[id]);
  const handleDeleteColumn = useBoardStore((state) => state.deleteColumn);
  const { ref } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"]
  });

  return (
    <div
      ref={ref}
      className="flex w-80 shrink-0 flex-col rounded-xl bg-muted/50 p-4 min-h-10"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{column.title}</h3>

        <div className="flex items-center justify-between gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
            {column.cardIds.length}
          </span>

          <Button
            onClick={() => handleDeleteColumn(id)}
            variant="ghost"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-1">
        {column.cardIds.map((id, index) => (
          <KanbanCard key={id} id={id} index={index} columnId={column.id} />
        ))}
      </div>

      {column.cardIds.length === 0 && (
        <div className="flex h-24 mb-3 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground">
          No tasks yet
        </div>
      )}

      <AddCard columnId={id} />
    </div>
  );
}

export default React.memo(KanbanColumn);
