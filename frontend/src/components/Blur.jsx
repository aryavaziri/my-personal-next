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
    <div
      className={`relative text-arya3 ${
        pathname == "/" ? "" : "bg-arya1 dark:bg-black"
      } dark:text-light h-auto w-screen`}
    >
      <div className={`${pathname == "/" ? "" : "h-full "}`}>{children}</div>
    </div>
  );
};

export default Blur;
