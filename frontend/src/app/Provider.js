"use client";

import { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { isMobile as im } from "react-device-detect";

export const Context = createContext();

export default function Provider({ children }) {
  const [user, setUser] = useState({});
  const [isMobile, setIsMobile] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bgb, setBgb] = useState(false);
  const [loginModal, setLoginModal] = useState(false)
  const toggleMenu = () => {
    setMenu((menu) => !menu);
  };
  useEffect(() => {
    setIsMobile(im)
  }, [im]);
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Context.Provider
        value={{
          menu,
          toggleMenu,
          isAuth,
          setIsAuth,
          user,
          setUser,
          isMobile,
          bgb,
          setBgb,
          loginModal,
          setLoginModal
        }}
      >
        {children}
      </Context.Provider>
    </ThemeProvider>
  );
}
