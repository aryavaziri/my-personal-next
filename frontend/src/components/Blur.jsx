"use client";
import { usePathname } from "next/navigation";
import { Context } from "@app/Provider";
import { useState, useContext, useEffect } from "react";

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
        ></div>
      )}
      <div
        className={`-z-10 h-screen w-screen fixed bg-gradient-to-b from-30% dark:from-5% dark:from-[#5390D990] from-[#023e8a77] to-80% dark:to-transparent`}
      />

      {children}
    </div>
  );
};

export default Blur;
