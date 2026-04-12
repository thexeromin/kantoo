import { useQuery } from "@tanstack/react-query";
import BoardInfoCard from "@/components/kanban/board-info-card";
import AddBoard from "@/components/kanban/add-board";
import { boardService } from "@/services/board";
import { Loader2 } from "lucide-react";

// TODO: remove
// const boards = [
//   {
//     id: "b-1",
//     title: "Q4 Product Roadmap",
//     description:
//       "Tracking epic features, bugs, and technical debt for the upcoming quarter.",
//     lastActive: "2 hours ago",
//     theme: "bg-blue-500/10 border-blue-500/20 text-blue-700",
//     isFavorite: true,
//     members: ["AB", "CD", "EF"],
//     taskCount: 24
//   },
//   {
//     id: "b-2",
//     title: "Marketing Campaign",
//     description:
//       "Assets, copy, and launch sequence for the new winter product line.",
//     lastActive: "5 hours ago",
//     theme: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
//     isFavorite: false,
//     members: ["XY", "Z"],
//     taskCount: 12
//   },
//   {
//     id: "b-3",
//     title: "Website Redesign",
//     description:
//       "Overhauling the landing page and pricing tiers using the new brand guidelines.",
//     lastActive: "1 day ago",
//     theme: "bg-purple-500/10 border-purple-500/20 text-purple-700",
//     isFavorite: true,
//     members: ["JD", "AB"],
//     taskCount: 45
//   },
//   {
//     id: "b-4",
//     title: "Hiring Pipeline",
//     description:
//       "Tracking candidates for the Senior Frontend Engineer and Designer roles.",
//     lastActive: "3 days ago",
//     theme: "bg-orange-500/10 border-orange-500/20 text-orange-700",
//     isFavorite: false,
//     members: ["HR"],
//     taskCount: 8
//   }
// ];

export default function DashboardPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards"],
    queryFn: boardService.fetchAll
  });

  return (
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
          <AddBoard />
        </div>
      </div>

      {isPending ? (
        // Loading State
        <div className="flex flex-col items-center justify-center py-32 w-full">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground mt-4 text-sm animate-pulse">
            Loading your workspace...
          </p>
        </div>
      ) : error ? (
        // Error State
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Failed to load boards. Please refresh the page.</p>
        </div>
      ) : data?.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-muted rounded-xl text-center">
          <p className="text-muted-foreground mb-2">
            You don't have any boards yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Click "New Board" to create your first project.
          </p>
        </div>
      ) : (
        // Success State
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((board) => (
            <BoardInfoCard key={board.id} {...board} />
          ))}
        </div>
      )}
    </div>
  );
}
