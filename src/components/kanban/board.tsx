import { DragDropProvider } from "@dnd-kit/react";

import AddColumn from "./add-column";
import KanbanCard from "./card";
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
              data={board.cards[cardId]?.data || ""}
              onDelete={handleDeleteCard}
            />
          ))}
        </KanbanColumn>
      ))}

      <AddColumn onAdd={handleAddColumn} />
    </DragDropProvider>
  );
}
