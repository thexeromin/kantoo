import { useState } from "react";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

import AddColumn from "./add-column";
import KanbanCard from "./card";
import KanbanColumn from "./column";
import type { Items } from "./types";

const initialData: Items = {
  todo: [
    {
      id: 111,
      title: "Add drag and drop",
      description: "Integrate a library for drag and drop features."
    },
    {
      id: 112,
      title: "Write unit tests",
      description: "Write tests for core components and utilities."
    }
  ],
  "in-progress": [
    {
      id: 114,
      title: "Design database schema",
      description: "Draft the ERD for the new authentication flow."
    },
    {
      id: 116,
      title: "Create Kanban UI",
      description: "Build the base React components using Tailwind."
    }
  ],
  done: [
    {
      id: 117,
      title: "Set up project repository",
      description: "Initialize git repo and project structure."
    }
  ]
};

export default function KanbanBoard() {
  const [items, setItems] = useState(initialData);

  const handleAddColumn = (title: string) => {
    setItems({ ...items, [title]: [] });
  };

  const handleDeleteColumn = (title: string) => {
    console.log({ title });
    setItems((prev) => {
      // eslint-disable-next-line
      const { [title]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleAddCard = (title: string, id: string) => {
    console.log(title, id);
    setItems((prev) => {
      const { [id]: targetKey, ...rest } = prev;
      console.log(targetKey);
      return {
        ...rest,
        targetKey: [
          ...targetKey,
          {
            id: Math.floor(Math.random() * 1000000),
            title: title,
            description: title
          }
        ]
      };
    });
  };

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;
        if (!source) return;
        if (source.type === "column") return;

        setItems((items) => move(items, event));
      }}
    >
      {Object.entries(items).map(([column, items], index) => (
        <KanbanColumn
          key={column}
          id={column}
          index={index}
          totalTask={items.length}
          onDelete={handleDeleteColumn}
          onAddCard={handleAddCard}
        >
          {items.map((task, index) => (
            <KanbanCard
              key={task.id}
              id={task.id}
              index={index}
              column={column}
              task={task}
            />
          ))}
        </KanbanColumn>
      ))}

      <AddColumn onAdd={handleAddColumn} />
    </DragDropProvider>
  );
}
