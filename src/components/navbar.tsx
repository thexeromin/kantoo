import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <h1 className="text-2xl font-bold text-foreground">Kantoo</h1>

      <ModeToggle />
    </header>
  );
}
