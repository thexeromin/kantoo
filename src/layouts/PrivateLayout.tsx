import { Outlet } from "react-router";
import { Sidebar, Header } from "@/components/dashboard";

export function PrivateLayout() {
  return (
    <div className="flex h-screen bg-muted/20 text-foreground font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
