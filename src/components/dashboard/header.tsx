import { useNavigate } from "react-router";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../mode-toggle";
import { authService } from "@/services/auth";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md border-b border-border/50 z-10 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search boards, tasks..."
            className="w-full bg-muted/50 pl-9 border-transparent focus-visible:border-primary shadow-none rounded-full h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground rounded-full h-9 w-9"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden h-9 w-9"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="#" />
                <AvatarFallback>#</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
