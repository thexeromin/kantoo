import { getAction } from "@/components/kanban/board-action-parser";
import { useBoardStore } from "@/store/board";

import type { DragEndPayload, DragOverPayload } from "@/types/board";

export function useBoardDrag() {
  const moveCard = useBoardStore((state) => state.moveCard);
  const restoreSnapshot = useBoardStore((state) => state.restoreSnapshot);
  const reorderCard = useBoardStore((state) => state.reorderCard);
  const reorderColumn = useBoardStore((state) => state.reorderColumn);

  function handleDragOver(event: DragOverPayload) {
    const action = getAction(event);

    if (action?.type === "MOVE_CARD") {
      moveCard(action.fromCol, action.toCol, action.cardId);
    }
  }

  function handleDragEnd(event: DragEndPayload) {
    if (event.canceled) {
      if (event.operation.source?.type === "item") {
        restoreSnapshot();
      }

      return;
    }

    const action = getAction(event);

    if (action && ["REORDER_CARD", "REORDER_COLUMN"].includes(action.type)) {
      if (action.type === "REORDER_CARD") {
        reorderCard(action.from, action.to, action.columnId);
      } else if (action.type === "REORDER_COLUMN") {
        reorderColumn(action.from, action.to);
      }
    }
  }

  return {
    handleDragOver,
    handleDragEnd
  };
}
