import type { AppContextType } from "./types";
import React from "react";


export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("Use App context within provider!");
  }
  return context;
};
