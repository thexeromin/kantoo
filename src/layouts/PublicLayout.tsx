import { Outlet } from "react-router";

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
