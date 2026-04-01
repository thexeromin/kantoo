import type { Board } from "@/types/kanban";
import type { Action } from "./board-actions";

export function applyAction(draft: Board, action: Action) {
  switch (action.type) {
    case "REORDER_CARD": {
      const cards = draft.columns[action.columnId].cardIds;

      const [moved] = cards.splice(action.from, 1);
      cards.splice(action.to, 0, moved);

      break;
    }

    case "MOVE_CARD": {
      const from = draft.columns[action.fromCol].cardIds;
      const to = draft.columns[action.toCol].cardIds;

      const index = from.indexOf(action.cardId);
      if (index !== -1) from.splice(index, 1);
      to.push(action.cardId);

      break;
    }

    case "REORDER_COLUMN": {
      const [moved] = draft.columnOrder.splice(action.from, 1);
      draft.columnOrder.splice(action.to, 0, moved);

      break;
    }
  }
}
