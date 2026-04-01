import { useImmer } from "use-immer";
import { createId } from "@/utils";

import type { Board } from "@/types/kanban";

import { getAction } from "@/components/kanban/board-action-parser";
import { applyAction } from "@/components/kanban/board-mutations";

export function useKanbanBoard() {
  const [board, setBoard] = useImmer<Board>({
    columns: {},
    columnOrder: [],
    cards: {}
  });

  function handleAddColumn(title: string) {
    const id = createId("col-");

    setBoard((draft) => {
      draft.columnOrder.push(id);
      draft.columns[id] = {
        id,
        title,
        cardIds: []
      };
    });
  }

  function handleDeleteColumn(id: string) {
    setBoard((draft) => {
      // delete cards too, since their column is gone
      draft.columns[id].cardIds.forEach((cardId) => {
        delete draft.cards[cardId];
      });

      delete draft.columns[id];

      // remove column from the ordering list
      const colIndex = draft.columnOrder.indexOf(id);
      if (colIndex === -1) return;
      draft.columnOrder.splice(colIndex, 1);
    });
  }

  function handleAddCard(columnId: string, data: string) {
    const id = createId("card-");

    setBoard((draft) => {
      draft.columns[columnId].cardIds.push(id);
      draft.cards[id] = {
        id,
        data
      };
    });
  }

  function handleDeleteCard(columnId: string, cardId: string) {
    setBoard((draft) => {
      delete draft.cards[cardId];
      draft.columns[columnId].cardIds = draft.columns[columnId].cardIds.filter(
        (i) => i !== cardId
      );
    });
  }

  function handleDragOver(event: any) {
    const action = getAction(event);

    if (action?.type === "MOVE_CARD") {
      setBoard((draft) => {
        // early return if already moved
        if (draft.columns[action.toCol].cardIds.includes(action.cardId)) return;
        applyAction(draft, action);
      });
    }
  }

  function handleDragEnd(event: any) {
    const action = getAction(event);

    if (action && ["REORDER_CARD", "REORDER_COLUMN"].includes(action.type)) {
      setBoard((draft) => {
        applyAction(draft, action);
      });
    }
  }

  return {
    board,
    handleAddCard,
    handleAddColumn,
    handleDeleteCard,
    handleDeleteColumn,
    handleDragOver,
    handleDragEnd
  };
}
