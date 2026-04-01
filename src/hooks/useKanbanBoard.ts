import { useRef } from "react";
import { useImmerReducer } from "use-immer";

import { boardReducer } from "@/reducers";
import { getAction } from "@/components/kanban/board-action-parser";

import type {
  Board,
  BoardAction,
  DragEndPayload,
  DragOverPayload
} from "@/types/board";

export function useKanbanBoard() {
  const [board, dispatch] = useImmerReducer<Board, BoardAction>(boardReducer, {
    columns: {},
    columnOrder: [],
    cards: {}
  });
  const previousBoard = useRef(board);

  function handleAddPreviousBoard(board: Board) {
    previousBoard.current = structuredClone(board);
  }

  function handleAddColumn(title: string) {
    dispatch({
      type: "ADD_COLUMN",
      title
    });
  }

  function handleDeleteColumn(id: string) {
    dispatch({
      type: "DELETE_COLUMN",
      id
    });
  }

  function handleAddCard(columnId: string, data: string) {
    dispatch({
      type: "ADD_CARD",
      columnId,
      data
    });
  }

  function handleDeleteCard(columnId: string, cardId: string) {
    dispatch({
      type: "DELETE_CARD",
      columnId,
      cardId
    });
  }

  function handleDragOver(event: DragOverPayload) {
    const action = getAction(event);

    if (action?.type === "MOVE_CARD") {
      dispatch({
        ...action
      });
    }
  }

  function handleDragEnd(event: DragEndPayload) {
    if (event.canceled) {
      if (event.operation.source?.type === "item") {
        dispatch({
          type: "RESET_BOARD",
          board: previousBoard.current
        });
      }

      return;
    }

    const action = getAction(event);

    if (action && ["REORDER_CARD", "REORDER_COLUMN"].includes(action.type)) {
      dispatch({
        ...action
      });
    }
  }

  return {
    board,
    handleAddCard,
    handleAddColumn,
    handleDeleteCard,
    handleDeleteColumn,
    handleAddPreviousBoard,
    handleDragOver,
    handleDragEnd
  };
}
