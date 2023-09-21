"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HiSun } from "react-icons/hi2";
import { HiMoon } from "react-icons/hi";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="text-3xl relative h-full w-7"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <HiSun
        className={`${
          resolvedTheme === "light" ? `opacity-0` : `opacity-100`
        } absolute top-[5px] duration-200`}
      />
      <HiMoon
        className={`${
          resolvedTheme === "dark" ? `opacity-0` : `opacity-100`
        } absolute top-[5px] duration-200`}
      />
    </button>
  );
};

export default ThemeButton;
