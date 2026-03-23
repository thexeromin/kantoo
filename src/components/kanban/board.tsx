import { useImmer } from "use-immer";
import { DragDropProvider } from "@dnd-kit/react";
import { createId } from "@/utils";
import { reorderColumns, moveCardBetweenColumns } from "@/utils/boardHelpers";

import type { Board } from "./types";

import AddColumn from "./add-column";
import KanbanCard from "./card";
import KanbanColumn from "./column";

export default function KanbanBoard() {
  const [board, setBoard] = useImmer<Board>({
    columns: {},
    columnOrder: [],
    cards: {}
  });

  const handleAddColumn = (title: string) => {
    const id = createId("col-");

    setBoard((draft) => {
      draft.columnOrder.push(id);
      draft.columns[id] = {
        id,
        title,
        cardIds: []
      };
    });
  };

  const handleDeleteColumn = (id: string) => {
    // TODO: remove the cards associated with this column
    setBoard((draft) => {
      delete draft.columns[id];
      draft.columnOrder = draft.columnOrder.filter((x) => x !== id);
    });
  };

  const handleAddCard = (columnId: string, data: string) => {
    const id = createId("card-");

    setBoard((draft) => {
      draft.columns[columnId].cardIds.push(id);
      draft.cards[id] = {
        id,
        data
      };
    });
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setBoard((draft) => {
      delete draft.cards[cardId];
      draft.columns[columnId].cardIds = draft.columns[columnId].cardIds.filter(
        (i) => i !== cardId
      );
    });
  };

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setBoard((draft) => {
          moveCardBetweenColumns(draft.columns, event);
        });
      }}
      onDragEnd={(event) => {
        setBoard((draft) => {
          reorderColumns(draft.columnOrder, event);
        });
      }}
    >
      {board.columnOrder.map((columnId, index) => (
        <KanbanColumn
          key={columnId}
          id={columnId}
          index={index}
          title={board.columns[columnId].title}
          totalTask={board.columns[columnId].cardIds.length}
          onAddCard={handleAddCard}
          onDelete={handleDeleteColumn}
        >
          {board.columns[columnId].cardIds.map((cardId, index) => (
            <KanbanCard
              key={cardId}
              id={cardId}
              index={index}
              column={columnId}
              data={board.cards[cardId].data}
              onDelete={handleDeleteCard}
            />
          ))}
        </KanbanColumn>
      ))}

      <AddColumn onAdd={handleAddColumn} />
    </DragDropProvider>
  );
}
