export type Action =
  | { type: "REORDER_CARD"; columnId: string; from: number; to: number }
  | { type: "MOVE_CARD"; fromCol: string; toCol: string; cardId: string }
  | { type: "REORDER_COLUMN"; from: number; to: number };
