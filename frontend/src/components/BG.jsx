"use client";
import { usePathname } from "next/navigation";
import { Context } from "@app/Provider";
import { useState, useContext, useEffect } from "react";
// import { isMobile } from "react-device-detect";

// import P5Sketch from "@components/P5Sketch";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const SketchComponent = dynamic(() => import("@components/Sketch8"));

const BG = ({ children }) => {
  const myContext = useContext(Context)
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  return (
    <div>
      {pathname !== "/" && (
        <div
          className={`bg-white dark:bg-black h-screen w-screen fixed z-[-11]`}
        />
      )}

      {pathname === "/" && (
        <div className="fixed w-screen h-screen z-[-20]">
          <SketchComponent theme={resolvedTheme} isMobile={myContext.isMobile} />
        </div>
      )}

      <div
        className={`z-[-10] max-sm:backdrop-blur-sm h-screen w-screen fixed bg-gradient-to-b from-30% dark:from-15% dark:from-gradientDark/40 from-gradientLight/50 to-80% to-transparent`}
      />

      {children}
    </div>
  );
};

export default BG;
