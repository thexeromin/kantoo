import { LayoutDashboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-8 px-6 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <LayoutDashboard className="h-5 w-5" />
        <span>Kantoo</span>
      </div>
      <p>© 2026 Kantoo Inc. All rights reserved.</p>
      <div className="flex gap-4">
        <a className="hover:text-foreground transition-colors" href="#">
          Terms
        </a>
        <a className="hover:text-foreground transition-colors" href="#">
          Privacy
        </a>
      </div>
    </footer>
  );
}
