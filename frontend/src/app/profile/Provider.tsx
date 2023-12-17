"use client";
import { createContext, useState } from "react";
import { TProfile } from "@components/shop/Basket";

interface ContextProps {
  profile: TProfile | null;
  setProfile: (profile: TProfile) => void;
}

export const PaymentContext = createContext<ContextProps>({} as ContextProps);

export default function Provider({ children }: React.PropsWithChildren) {
  const [profile, setProfile] = useState<TProfile | null>(null);
  return (
    <PaymentContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
