import { describe, it, expect } from "vitest";
import { produce } from "immer";
import type { Board, BoardAction } from "@/types/board";
import { boardReducer } from "./board-reducer";

describe("boardReducer", () => {
  // Initial state
  const populatedState: Board = {
    cards: {
      "card-1": { id: "card-1", data: "Task 1" },
      "card-2": { id: "card-2", data: "Task 2" },
      "card-3": { id: "card-3", data: "Task 3" }
    },
    columns: {
      "col-1": { id: "col-1", title: "To Do", cardIds: ["card-1", "card-2"] },
      "col-2": { id: "col-2", title: "Done", cardIds: ["card-3"] }
    },
    columnOrder: ["col-1", "col-2"]
  };

  it("should handle RESET_BOARD", () => {
    const newBoard: Board = {
      cards: { "card-99": { id: "card-99", data: "Brand New Task" } },
      columns: {
        "col-99": { id: "col-99", title: "New List", cardIds: ["card-99"] }
      },
      columnOrder: ["col-99"]
    };

    // Implicit return so Immer registers the returned state
    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, {
        type: "RESET_BOARD",
        board: newBoard
      })
    );

    expect(nextState).toEqual(newBoard);
  });

  it("should handle REORDER_CARD within the same column", () => {
    const action: BoardAction = {
      type: "REORDER_CARD",
      columnId: "col-1",
      from: 0,
      to: 1
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    // Cards should swap places in col-1
    expect(nextState.columns["col-1"].cardIds).toEqual(["card-2", "card-1"]);
    // col-2 should remain unaffected
    expect(nextState.columns["col-2"].cardIds).toEqual(["card-3"]);
  });

  it("should handle MOVE_CARD between different columns", () => {
    const action: BoardAction = {
      type: "MOVE_CARD",
      fromCol: "col-1",
      toCol: "col-2",
      cardId: "card-1"
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    // card-1 removed from col-1
    expect(nextState.columns["col-1"].cardIds).toEqual(["card-2"]);
    // card-1 pushed to the end of col-2
    expect(nextState.columns["col-2"].cardIds).toEqual(["card-3", "card-1"]);
  });

  it("should abort MOVE_CARD if the card already exists in the destination column", () => {
    const action: BoardAction = {
      type: "MOVE_CARD",
      fromCol: "col-1", // arbitrary for this test
      toCol: "col-2",
      cardId: "card-3" // card-3 is already in col-2
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    // State should remain the same due to the early return
    expect(nextState).toEqual(populatedState);
  });

  it("should handle REORDER_COLUMN", () => {
    const action: BoardAction = {
      type: "REORDER_COLUMN",
      from: 0,
      to: 1
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    expect(nextState.columnOrder).toEqual(["col-2", "col-1"]);
  });

  it("should handle ADD_COLUMN", () => {
    const action: BoardAction = {
      type: "ADD_COLUMN",
      id: "col-new",
      title: "In Progress"
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    expect(nextState.columnOrder).toContain("col-new");
    expect(nextState.columns["col-new"]).toEqual({
      id: "col-new",
      title: "In Progress",
      cardIds: []
    });
  });

  it("should handle DELETE_COLUMN and clean up orphaned cards", () => {
    const action: BoardAction = {
      type: "DELETE_COLUMN",
      id: "col-1" // col-1 contains card-1 and card-2
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    // Column removed from dictionary
    expect(nextState.columns["col-1"]).toBeUndefined();
    // Column removed from ordering array
    expect(nextState.columnOrder).toEqual(["col-2"]);
    // Associated cards deleted from cards dictionary
    expect(nextState.cards["card-1"]).toBeUndefined();
    expect(nextState.cards["card-2"]).toBeUndefined();
    // Unrelated cards are safe
    expect(nextState.cards["card-3"]).toBeDefined();
  });

  it("should handle ADD_CARD", () => {
    const action: BoardAction = {
      type: "ADD_CARD",
      columnId: "col-1",
      id: "card-new",
      data: "A new task"
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    // Added to cards dictionary
    expect(nextState.cards["card-new"]).toEqual({
      id: "card-new",
      data: "A new task"
    });
    // ID pushed to the specified column's card array
    expect(nextState.columns["col-1"].cardIds).toEqual([
      "card-1",
      "card-2",
      "card-new"
    ]);
  });

  it("should handle DELETE_CARD", () => {
    const action: BoardAction = {
      type: "DELETE_CARD",
      cardId: "card-1",
      columnId: "col-1"
    };

    const nextState = produce(populatedState, (draft) =>
      boardReducer(draft, action)
    );

    // Removed from cards dictionary
    expect(nextState.cards["card-1"]).toBeUndefined();
    // Filtered out of the column's card array
    expect(nextState.columns["col-1"].cardIds).toEqual(["card-2"]);
  });
});
