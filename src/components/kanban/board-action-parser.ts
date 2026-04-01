import type { Action } from "./board-actions";
import { hasSortableIndices } from "@/types/guards";

export function getAction(event: any): Action | null {
  const { source, target, canceled } = event.operation;

  if (canceled || !source || !target) return null;

  if (source.type === "column") {
    if (hasSortableIndices(source) && source.initialIndex !== source.index) {
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
        columnId: source.group,
        from: source.initialIndex,
        to: source.index
      };
    } else {
      return {
        type: "REORDER_CARD",
        columnId: source.group,
        from: source.initialIndex,
        to: target.index
      };
    }
  }

  return {
    type: "MOVE_CARD",
    fromCol: source.data.columnId,
    toCol: target.data.columnId || target.id,
    cardId: source.id
  };
}
