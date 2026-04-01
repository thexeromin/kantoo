import KanbanBoard from "./components/kanban/board";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex flex-1 items-start gap-6 overflow-x-auto p-6">
        <KanbanBoard />
      </main>
    </div>
  );
}
