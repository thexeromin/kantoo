import React, { useCallback } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import { EllipsisIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import KanbanCard from "./card";
import AddCard from "./add-card";

import type { Card, Column } from "@/types/board";

interface Props {
  id: string;
  index: number;
  column: Column;
  cardIds: string[];
  // TODO: all cards passing
  cards: Record<string, Card>;
  onDelete: (id: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onAddCard: (columnId: string, data: string) => void;
}

function KanbanColumn({
  id,
  index,
  column,
  cardIds,
  cards,
  onDelete,
  onDeleteCard,
  onAddCard
}: Props) {
  const { ref } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"]
  });

  const handleAdd = useCallback(
    (data: string) => onAddCard(id, data),
    [id, onAddCard]
  );

  return (
    <div
      ref={ref}
      className="flex w-80 shrink-0 flex-col rounded-xl bg-muted/50 p-4 min-h-10"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{column.title}</h3>

        <div className="flex items-center justify-between gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
            {cardIds.length}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onDelete(id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Render cards */}
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-1">
        {cardIds.map((id, index) => (
          <KanbanCard
            key={id}
            id={id}
            index={index}
            column={column.id}
            data={cards[id].data}
            onDelete={onDeleteCard}
          />
        ))}
      </div>

      {cardIds.length === 0 && (
        <div className="flex h-24 mb-3 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground">
          No tasks yet
        </div>
      )}
      <AddCard onAdd={handleAdd} />
    </div>
  );
}

export default React.memo(KanbanColumn);
