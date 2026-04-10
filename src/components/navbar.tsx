import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
      <a
        className="text-sm font-medium hover:text-primary transition-colors"
        href="#features"
      >
        Features
      </a>
      <a
        className="text-sm font-medium hover:text-primary transition-colors"
        href="#pricing"
      >
        Pricing
      </a>
      <Button variant="ghost" className="hidden sm:inline-flex">
        Log in
      </Button>
      <Button>Get Started</Button>
      <ModeToggle />
    </nav>
  );
}
