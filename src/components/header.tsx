import { Link } from "react-router";
import { LayoutDashboard } from "lucide-react";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="px-6 lg:px-14 h-16 flex items-center border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-xl tracking-tight"
      >
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <span>Kantoo</span>
      </Link>

      <Navbar />
    </header>
  );
}
