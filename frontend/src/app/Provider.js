"use client";

import { createContext, useState } from "react";
import { ThemeProvider } from "next-themes";

export const Context = createContext({});

export default function Provider({ children }) {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((menu) => !menu);
  };
  return (
    <ThemeProvider attribute="class">
      <Context.Provider
        value={{
          menu,
          toggleMenu,
          isAuth,
          setIsAuth,
          user,
          setUser,
        }}
      >
        {children}
      </Context.Provider>
    </ThemeProvider>
  );
}
