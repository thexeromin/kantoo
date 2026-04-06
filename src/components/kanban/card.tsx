import { useSortable } from "@dnd-kit/react/sortable";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "@/store/board";

interface Props {
  id: string;
  index: number;
  columnId: string;
}

function KanbanCard({ id, index, columnId }: Props) {
  const card = useBoardStore((state) => state.cards[id]);
  const handleDeleteCard = useBoardStore((state) => state.deleteCard);

  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: columnId,
    data: {
      columnId: columnId
    }
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="mb-3 cursor-grab rounded-lg bg-card p-4 shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-ring active:cursor-grabbing"
    >
      <div className="flex justify-between gap-2">
        <p className="line-clamp-2 text-sm text-card-foreground">{card.data}</p>
        <Button
          onClick={() => columnId && id && handleDeleteCard(id, columnId)}
          variant="ghost"
          size="icon"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}

export default KanbanCard;
