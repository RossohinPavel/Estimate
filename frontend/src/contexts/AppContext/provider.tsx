import { AppContext } from "./context";
import type { AppContextType } from "./types";
import { useState, type ReactNode } from "react";


export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider
      value={
        {
          user,
          setUser,
        } as AppContextType
      }
    >
      {children}
    </AppContext.Provider>
  );
};
