"use client";
import { usePathname } from "next/navigation";
import { Context } from "@app/Provider";
import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const SketchComponent = dynamic(() => import("@components/Sketch8"));

const BG = ({ children }) => {
  const myContext = useContext(Context)
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  // useEffect(() => {
  //   console.log((pathname === "/" || pathname === "/test"))
  // }, [])

  return (
    <div>
      {(pathname !== "/") && (!myContext.bgb) && (
        <div
          className={`bg-white dark:bg-black h-screen w-screen fixed z-[-11]`}
        />
      )}
      {pathname === "/" | myContext.bgb ? (
        <div className={`${myContext.bgb ? 'z-[-20]' : 'z-[-20]'} aryaryarya fixed w-screen h-screen`} >
          {process.env.NODE_ENV === "production" &&
            <SketchComponent theme={resolvedTheme} isMobile={myContext.isMobile || myContext.bgb} />
          }
        </div>
      ) : ''}
      <div
        className={`z-[-10] max-sm:backdrop-blur-sm ${pathname !== "/" && 'sm:backdrop-blur-[3px]'} h-screen w-screen fixed bg-gradient-to-b from-30% dark:from-15% dark:from-gradientDark/40 from-gradientLight/50 to-80% to-transparent`}
      />
      {children}
    </div>
  );
};

export default BG;
