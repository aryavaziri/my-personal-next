"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ThemeProvider } from "next-themes";
import { isMobile as im } from "react-device-detect";

export type User = {
  _id: string;
  name: string;
  email: string;
  profileImg: string;
  language: string;
  isAdmin: boolean;
  isGoogleAccount: boolean;
  isSignByMail: boolean;
  isVerified: boolean;
};

interface ContextProps {
  menu: boolean;
  toggleMenu: () => void;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User>>; // Change 'any' to the actual type of user data
  isMobile: boolean;
  bgb: boolean;
  setBgb: Dispatch<SetStateAction<boolean>>;
  loginModal: boolean;
  setLoginModal: Dispatch<SetStateAction<boolean>>;
  clientSecret: string;
  setClientSecret: Dispatch<SetStateAction<string>>;
}

export const Context = createContext<ContextProps>({} as ContextProps);

export default function Provider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User>({} as User);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bgb, setBgb] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const toggleMenu = () => {
    setMenu((menu) => !menu);
  };
  useEffect(() => {
    setIsMobile(im);
  }, [im]);
  return (
    <ThemeProvider
      defaultTheme="dark"
      attribute="class"
    >
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
          setLoginModal,
          clientSecret,
          setClientSecret,
        }}
      >
        {children}
      </Context.Provider>
    </ThemeProvider>
  );
}
