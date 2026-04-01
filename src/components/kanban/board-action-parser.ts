import { isSortable } from "@dnd-kit/react/sortable";
import type {
  DragEndPayload,
  DragOverPayload,
  BoardAction
} from "@/types/board";

export function getAction(
  event: DragEndPayload | DragOverPayload
): BoardAction | null {
  const { source, target, canceled } = event.operation;

  if (canceled || !source || !target) return null;
  if (!isSortable(source) || !isSortable(target)) return null;

  if (source.type === "column") {
    if (source.initialIndex !== source.index) {
      return {
        type: "REORDER_COLUMN",
        from: source.initialIndex,
        to: source.index
      };
    } else {
      return {
        type: "REORDER_COLUMN",
        from: source.initialIndex,
        to: target.index
      };
    }
  }

  if (source.group === target.group) {
    if (source.index !== source.initialIndex) {
      return {
        type: "REORDER_CARD",
        columnId: source.group as string,
        from: source.initialIndex,
        to: source.index
      };
    } else {
      return {
        type: "REORDER_CARD",
        columnId: source.group as string,
        from: source.initialIndex,
        to: target.index
      };
    }
  }

  return {
    type: "MOVE_CARD",
    fromCol: source.data.columnId,
    toCol: target.data.columnId || target.id,
    cardId: source.id as string
  };
}
