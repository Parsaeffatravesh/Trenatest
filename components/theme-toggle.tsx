"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 shadow-md backdrop-blur transition hover:shadow-lg hover:-translate-y-0.5"
      aria-label="Toggle theme"
    >
      {mounted && (isDark ? <Sun size={14} /> : <Moon size={14} />)}
      <span className="hidden sm:inline-block">{isDark ? "روشن" : "تاریک"}</span>
    </button>
  );
}
