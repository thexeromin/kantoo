import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Kantoo
      </h1>

      <ModeToggle />
    </header>
  );
}
