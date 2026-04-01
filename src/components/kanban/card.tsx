import React from "react";

import { useSortable } from "@dnd-kit/react/sortable";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  index: number;
  column: string;
  data: string;
  onDelete: (columnId: string, cardId: string) => void;
}

function KanbanCard({ id, index, column, data, onDelete }: Props) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
    data: {
      columnId: column
    }
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="mb-3 cursor-grab rounded-lg bg-card p-4 shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-ring active:cursor-grabbing"
    >
      <div className="flex justify-between gap-2">
        <p className="line-clamp-2 text-sm text-card-foreground">{data}</p>
        <Button
          onClick={() => column && id && onDelete(column, id)}
          variant="ghost"
          size="icon"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}

export default React.memo(KanbanCard);
