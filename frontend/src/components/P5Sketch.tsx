"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const SketchComponent = dynamic(() => import("@components/Sketch8"));

const P5Sketch = () => {
  const { resolvedTheme } = useTheme();

  return <SketchComponent theme={resolvedTheme} />;
};

export default P5Sketch;
