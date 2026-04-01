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
