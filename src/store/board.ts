import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { Board, Column } from "@/types/board";

interface State extends Board {
  snapshot: Record<string, Column> | null;
}

interface Action {
  takeSnapshot: () => unknown;
  restoreSnapshot: () => void;
  addColumn: (id: string, title: string) => void;
  deleteColumn: (id: string) => void;
  addCard: (id: string, columnId: string, data: string) => void;
  deleteCard: (cardId: string, columnId: string) => void;
  reorderCard: (from: number, to: number, columnId: string) => void;
  moveCard: (fromCol: string, toCol: string, cardId: string) => void;
  reorderColumn: (from: number, to: number) => void;
}

export const useBoardStore = create<State & Action>()(
  persist(
    immer((set, get) => ({
      columns: {},
      columnOrder: [],
      cards: {},
      snapshot: null, // store previous state

      takeSnapshot: () => set({ snapshot: get().columns }),
      restoreSnapshot: () => {
        const { snapshot } = get();
        if (snapshot) set({ columns: snapshot, snapshot: null });
      },
      addColumn: (id, title) =>
        set((state) => {
          state.columnOrder.push(id);
          state.columns[id] = {
            id,
            title,
            cardIds: []
          };
        }),
      deleteColumn: (id) =>
        set((state) => {
          // delete cards too, since their column is gone
          state.columns[id].cardIds.forEach((cardId) => {
            delete state.cards[cardId];
          });

          delete state.columns[id];

          // remove column from the ordering list
          const colIndex = state.columnOrder.indexOf(id);
          if (colIndex === -1) return;
          state.columnOrder.splice(colIndex, 1);
        }),
      addCard: (id, columnId, data) =>
        set((state) => {
          state.columns[columnId].cardIds.push(id);
          state.cards[id] = {
            id,
            data
          };
        }),
      deleteCard: (cardId, columnId) =>
        set((state) => {
          delete state.cards[cardId];
          state.columns[columnId].cardIds = state.columns[
            columnId
          ].cardIds.filter((i) => i !== cardId);
        }),
      reorderCard: (from, to, columnId) =>
        set((state) => {
          const cards = state.columns[columnId].cardIds;

          const [moved] = cards.splice(from, 1);
          cards.splice(to, 0, moved);
        }),
      moveCard: (fromCol, toCol, cardId) =>
        set((state) => {
          if (state.columns[toCol].cardIds.includes(cardId)) return;

          const from = state.columns[fromCol].cardIds;
          const to = state.columns[toCol].cardIds;

          const index = from.indexOf(cardId);
          if (index !== -1) from.splice(index, 1);
          to.push(cardId);
        }),
      reorderColumn: (from, to) =>
        set((state) => {
          const [moved] = state.columnOrder.splice(from, 1);
          state.columnOrder.splice(to, 0, moved);
        })
    })),
    {
      name: "board-storage"
    }
  )
);
