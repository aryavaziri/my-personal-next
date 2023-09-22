"use client";
import { usePathname } from "next/navigation";
import { Context } from "@app/Provider";
import { useState, useContext, useEffect } from "react";
import P5Sketch from "@components/P5Sketch";

const Blur = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, []);

  const myContext = useContext(Context);
  return (
    <div>
      {pathname !== "/" && (
        <div
          className={`bg-white dark:bg-black h-screen w-screen fixed z-[-11]`}
        />
      )}
      <div
        className={`-z-10 h-screen w-screen fixed bg-gradient-to-b from-30% dark:from-5% dark:from-[#5390D990] from-[#023e8a77] to-80% dark:to-transparent`}
      />
      {pathname === "/" && (
        <div className="fixed left-0 top-0 w-screen h-screen -z-20">
          <P5Sketch />
        </div>
      )}

      {children}
    </div>
  );
};

export default Blur;
