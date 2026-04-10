import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  LayoutDashboard,
  FolderKanban,
  Home,
  Settings,
  Users,
  LogOut
} from "lucide-react";
import { authService } from "@/services/auth";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-background border-r border-border/50 z-20 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link to="/dashboard">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span>Kantoo</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-4 mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
          Overview
        </div>
        <nav className="grid gap-1 px-3 text-sm font-medium">
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-primary transition-all"
          >
            <FolderKanban className="h-4 w-4" /> My Boards
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Activity className="h-4 w-4" /> Activity
          </Link>
        </nav>

        <div className="px-4 mt-8 mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
          Workspace
        </div>
        <nav className="grid gap-1 px-3 text-sm font-medium">
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Users className="h-4 w-4" /> Team Members
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Settings className="h-4 w-4" /> Settings
          </Link>
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50 bg-background/50">
        <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg transition-colors group cursor-pointer">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-9 w-9 border border-border/50 shrink-0">
              <AvatarImage src="#" alt="profile_image" />
              <AvatarFallback>#</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-muted-foreground truncate">
                jane@example.com
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all shrink-0"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
