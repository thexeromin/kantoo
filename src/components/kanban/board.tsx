import { DragDropProvider } from "@dnd-kit/react";

import AddColumn from "./add-column";
import KanbanColumn from "./column";

import { useKanbanBoard } from "@/hooks";

export default function KanbanBoard() {
  const {
    board,
    handleAddCard,
    handleAddColumn,
    handleDeleteCard,
    handleDeleteColumn,
    handleAddPreviousBoard,
    handleDragOver,
    handleDragEnd
  } = useKanbanBoard();

  return (
    <DragDropProvider
      onDragStart={() => handleAddPreviousBoard(board)}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {board.columnOrder.map((columnId, index) => (
        <KanbanColumn
          key={columnId}
          id={columnId}
          index={index}
          column={board.columns[columnId]}
          cardIds={board.columns[columnId].cardIds}
          cards={board.cards}
          onAddCard={handleAddCard}
          onDelete={handleDeleteColumn}
          onDeleteCard={handleDeleteCard}
        />
      ))}

      <AddColumn onAdd={handleAddColumn} />
    </DragDropProvider>
  );
}
