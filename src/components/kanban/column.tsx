import React from "react";
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
import AddCard from "./add-card";

interface Props {
  id: string;
  index: number;
  title: string;
  totalTask: number;
  children: React.ReactNode;
  onDelete: (id: string) => void;
  onAddCard: (columnId: string, data: string) => void;
}

export default function KanbanColumn({
  id,
  index,
  title,
  totalTask,
  onDelete,
  onAddCard,
  children
}: Props) {
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
      className="flex w-80 shrink-0 flex-col rounded-xl bg-slate-100 p-4 dark:bg-gray-800 min-h-10"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-700 dark:text-white">
          {title}
        </h3>

        <div className="flex items-center justify-between gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600 dark:bg-gray-700 dark:text-gray-200">
            {totalTask}
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

      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-1">
        {children}
      </div>

      {totalTask === 0 && (
        <div className="flex h-24 mb-3 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-sm text-slate-400 dark:border-gray-600 dark:text-gray-500">
          No tasks yet
        </div>
      )}
      <AddCard onAdd={(data: string) => onAddCard(id, data)} />
    </div>
  );
}
