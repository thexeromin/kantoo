import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "../provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  // Cycle logic: Light -> Dark -> System
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      {/* Sun Icon: Shown when theme is light */}
      <Sun
        className={`h-5 w-5 transition-all ${
          theme === "light"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0 absolute"
        } text-foreground`}
      />

      {/* Moon Icon: Shown when theme is dark */}
      <Moon
        className={`h-5 w-5 transition-all ${
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0 absolute"
        } text-foreground`}
      />

      {/* Laptop Icon: Shown when theme is system */}
      <Laptop
        className={`h-5 w-5 transition-all ${
          theme === "system"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0 absolute"
        } text-foreground`}
      />

      {/* Tooltip hint (optional) */}
      <span className="absolute -bottom-8 scale-0 transition-all group-hover:scale-100 text-[10px] font-medium px-2 py-1 rounded bg-popover text-popover-foreground border border-border shadow-md capitalize">
        {theme}
      </span>
    </button>
  );
}
