import { hasSortableIndices } from "@/types/guards";
import type { Draggable, Data } from "@dnd-kit/abstract";
import type { Board, Column } from "@/components/kanban/types";
import { arrayMove } from ".";

export function handleSameColumnCardReorder(draft: Board, event: any) {
  const { source, target, canceled } = event.operation;

  if (canceled) return;
  if (source?.type !== "item" || target?.type !== "item") return;
  if (!hasSortableIndices(source)) return;

  const { initialIndex, index } = source;

  if (index === initialIndex) return;
  if (!source.data.columnId) return;

  const cardIds = draft.columns[source.data.columnId].cardIds;

  if (cardIds[index] === source.id) return;

  const [movedCard] = cardIds.splice(initialIndex, 1);
  cardIds.splice(index, 0, movedCard);
}

export function handleCrossColumnCardMove(draft: Board, event: any) {
  const { source, target, canceled } = event.operation;

  if (!source || !target || canceled || source.type === "column") return;

  const sourceCardId = source.id as string;
  const sourceColId = source.data.columnId;
  const targetColId = (target.data.columnId || target.id) as string;

  applyCardMove(draft.columns, sourceCardId, sourceColId, targetColId);
}

function applyCardMove(
  columns: Record<string, Column>,
  sourceCardId: string,
  sourceColId: string,
  targetColId: string
) {
  const sourceCol = columns[sourceColId];
  const targetCol = columns[targetColId];

  if (!sourceCol || !targetCol) return;
  if (targetCol.cardIds.includes(sourceCardId)) return;

  const sourceCardIndex = sourceCol.cardIds.indexOf(sourceCardId);
  if (sourceCardIndex === -1) return;

  sourceCol.cardIds.splice(sourceCardIndex, 1);
  targetCol.cardIds.push(sourceCardId);
}

export function handleColumnReorder(draft: Board, event: any) {
  const { source, target, canceled } = event.operation;
  if (!source || !target || canceled) return;
  if (source.type !== "column") return;

  const sourceIndex = draft.columnOrder.findIndex((col) => col === source.id);
  const targetIndex = draft.columnOrder.findIndex((col) => col === target.id);

  const indicesAreInvalid =
    sourceIndex === -1 || targetIndex === -1 || targetIndex === sourceIndex;

  if (indicesAreInvalid) {
    fallbackSortableReorder(draft.columnOrder, source);
    return;
  }

  arrayMove(draft.columnOrder, sourceIndex, targetIndex);
}

function fallbackSortableReorder(
  columnOrder: string[],
  source: Draggable<Data>
) {
  if (!hasSortableIndices(source)) return;

  const { initialIndex: from, index: to } = source;
  const isValidMove = from !== to && from >= 0 && from < columnOrder.length;

  if (isValidMove) arrayMove(columnOrder, from, to);
}
