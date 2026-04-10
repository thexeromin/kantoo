import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar, Header } from "@/components/dashboard";
import BoardInfoCard from "@/components/kanban/board-info-card";

// Mock Data
const boards = [
  {
    id: "b-1",
    title: "Q4 Product Roadmap",
    description:
      "Tracking epic features, bugs, and technical debt for the upcoming quarter.",
    lastActive: "2 hours ago",
    theme: "bg-blue-500/10 border-blue-500/20 text-blue-700",
    isFavorite: true,
    members: ["AB", "CD", "EF"],
    taskCount: 24
  },
  {
    id: "b-2",
    title: "Marketing Campaign",
    description:
      "Assets, copy, and launch sequence for the new winter product line.",
    lastActive: "5 hours ago",
    theme: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
    isFavorite: false,
    members: ["XY", "Z"],
    taskCount: 12
  },
  {
    id: "b-3",
    title: "Website Redesign",
    description:
      "Overhauling the landing page and pricing tiers using the new brand guidelines.",
    lastActive: "1 day ago",
    theme: "bg-purple-500/10 border-purple-500/20 text-purple-700",
    isFavorite: true,
    members: ["JD", "AB"],
    taskCount: 45
  },
  {
    id: "b-4",
    title: "Hiring Pipeline",
    description:
      "Tracking candidates for the Senior Frontend Engineer and Designer roles.",
    lastActive: "3 days ago",
    theme: "bg-orange-500/10 border-orange-500/20 text-orange-700",
    isFavorite: false,
    members: ["HR"],
    taskCount: 8
  }
];

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-muted/20 text-foreground font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Projects & Boards
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your team's workspaces and active projects.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="shadow-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Board
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {boards.map((board) => (
                <BoardInfoCard {...board} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
