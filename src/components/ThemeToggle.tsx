"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [variant, setVariant] = React.useState("light");

  const toggleVariant = React.useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'light' ? "dark" : "light"));
  }, []);

  const handleToggle = () => {
    toggleVariant();
    setTheme(variant === "light" ? "dark" : "light");
  };

  return (
    <div className="text-my_text mb-4">
      {variant === "light" ? (
        <button className="p-4" onClick={handleToggle}>
          <Sun />
        </button>
      ) : (
        <button className="p-4" onClick={handleToggle}>
          <Moon />
        </button>
      )}
    </div>
  );
}
