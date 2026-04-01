import type { Board } from "@/types/board";
import type { BoardAction } from "@/types/board";
import { createId } from "@/utils";

export function boardReducer(draft: Board, action: BoardAction) {
  switch (action.type) {
    case "RESET_BOARD": {
      return action.board;
    }

    case "REORDER_CARD": {
      const cards = draft.columns[action.columnId].cardIds;

      const [moved] = cards.splice(action.from, 1);
      cards.splice(action.to, 0, moved);

      break;
    }

    case "MOVE_CARD": {
      if (draft.columns[action.toCol].cardIds.includes(action.cardId)) return;

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

    case "ADD_COLUMN": {
      const id = createId("col-");
      const { title } = action;

      draft.columnOrder.push(id);
      draft.columns[id] = {
        id,
        title,
        cardIds: []
      };
      break;
    }

    case "DELETE_COLUMN": {
      const { id } = action;
      // delete cards too, since their column is gone
      draft.columns[id].cardIds.forEach((cardId) => {
        delete draft.cards[cardId];
      });

      delete draft.columns[id];

      // remove column from the ordering list
      const colIndex = draft.columnOrder.indexOf(id);
      if (colIndex === -1) return;
      draft.columnOrder.splice(colIndex, 1);
      break;
    }

    case "ADD_CARD": {
      const id = createId("card-");
      const { data } = action;

      draft.columns[action.columnId].cardIds.push(id);
      draft.cards[id] = {
        id,
        data
      };
      break;
    }

    case "DELETE_CARD": {
      const { cardId, columnId } = action;

      delete draft.cards[cardId];
      draft.columns[columnId].cardIds = draft.columns[columnId].cardIds.filter(
        (i) => i !== cardId
      );
      break;
    }
  }
}
