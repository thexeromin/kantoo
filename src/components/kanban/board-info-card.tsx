import { Link } from "react-router";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Clock, MoreVertical, Star } from "lucide-react";

interface Props {
  id: string;
  title: string;
  description: string;
  lastActive?: string;
  theme?: string;
  is_favorite: boolean;
  // members: string[];
  taskCount: number;
}

export default function BoardInfoCard({
  id,
  title,
  description,
  lastActive,
  theme,
  is_favorite,
  // members,
  taskCount
}: Props) {
  return (
    <Link to={`/board/${id}`}>
      <Card
        key={id}
        className="flex flex-col group hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <CardHeader className="pb-3 relative">
          <div className="flex justify-between items-start">
            <Badge
              variant="secondary"
              className={`${theme} border font-normal mb-3`}
            >
              {taskCount} tasks
            </Badge>
            <div className="flex gap-1 -mt-1 -mr-2">
              {is_favorite && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                >
                  <Star className="h-4 w-4 fill-current" />
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem>Manage Members</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Archive Board
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-1.5 h-10">
            {description}
          </CardDescription>
        </CardHeader>
        <div className="flex-1" /> {/* Spacer to push footer down */}
        <CardFooter className="pt-4 border-t border-border/40 flex justify-between items-center text-sm text-muted-foreground bg-muted/10">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">{lastActive}</span>
          </div>

          {/*<div className="flex -space-x-2">
          {members?.map((member, i) => (
            <Avatar key={i} className="h-7 w-7 border-2 border-background">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-medium">
                {member}
              </AvatarFallback>
            </Avatar>
          ))}
          {members?.length > 3 && (
            <Avatar className="h-7 w-7 border-2 border-background">
              <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-medium">
                +{members.length - 3}
              </AvatarFallback>
            </Avatar>
          )}
        </div>*/}
        </CardFooter>
      </Card>
    </Link>
  );
}
