import type { DragEndEvent, DragOverEvent } from "@dnd-kit/react";

export type Card = {
  id: string;
  data: string;
};

export type Column = {
  id: string;
  title: string;
  cardIds: string[];
};

export type Board = {
  columns: Record<string, Column>;
  columnOrder: string[];
  cards: Record<string, Card>;
};

export type DragEndPayload = Parameters<DragEndEvent>[0];
export type DragOverPayload = Parameters<DragOverEvent>[0];

export type BoardAction =
  | { type: "REORDER_CARD"; columnId: string; from: number; to: number }
  | { type: "MOVE_CARD"; fromCol: string; toCol: string; cardId: string }
  | { type: "REORDER_COLUMN"; from: number; to: number }
  | { type: "ADD_COLUMN"; title: string }
  | { type: "DELETE_COLUMN"; id: string }
  | { type: "ADD_CARD"; columnId: string; data: string }
  | { type: "DELETE_CARD"; columnId: string; cardId: string }
  | { type: "RESET_BOARD"; board: Board };
