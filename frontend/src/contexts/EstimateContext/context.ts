import type { EstimateContextType } from "./types";
import React from "react";


export const EstimateContext = React.createContext<EstimateContextType | undefined>(undefined);

export const useEstimateContext = () => {
  const context = React.useContext(EstimateContext);
  if (!context) {
    throw new Error("Use App context within provider!");
  }
  return context;
};
