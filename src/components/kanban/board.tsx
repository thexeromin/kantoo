import { DragDropProvider } from "@dnd-kit/react";
import { useBoardStore } from "@/store/board";
import { useBoardDrag } from "@/hooks";

import AddColumn from "./add-column";
import KanbanColumn from "./column";

export default function KanbanBoard() {
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const takeSnapshot = useBoardStore((state) => state.takeSnapshot);
  const { handleDragOver, handleDragEnd } = useBoardDrag();

  return (
    <DragDropProvider
      onDragStart={takeSnapshot}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {columnOrder.map((columnId, index) => (
        <KanbanColumn key={columnId} id={columnId} index={index} />
      ))}
      <AddColumn />
    </DragDropProvider>
  );
}
