import type { UniqueIdentifier, Draggable } from "@dnd-kit/abstract";

// Check if the source has sortable index properties
export function hasSortableIndices(source: Draggable): source is Draggable & {
  initialIndex: number;
  index: number;
  initialGroup: UniqueIdentifier | undefined;
  group: UniqueIdentifier | undefined;
} {
  return (
    "initialIndex" in source &&
    typeof source.initialIndex === "number" &&
    "index" in source &&
    typeof source.index === "number"
  );
}
