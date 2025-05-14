import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";

import { useTheme } from "../components/theme-provider";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center">
      <Button
        className=" cursor-pointer"
        variant="link"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun
          className={`h-[1.2rem] w-[1.2rem] transition-all ${
            theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
          }`}
        />
      </Button>
    </div>
  );
}
