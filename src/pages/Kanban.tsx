import KanbanBoard from "@/components/kanban/board";

export default function KanbanPage() {
  return (
    <main className="flex flex-1 items-start gap-6 overflow-x-auto p-2">
      <KanbanBoard />
    </main>
  );
}
