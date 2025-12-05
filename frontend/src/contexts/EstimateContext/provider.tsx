import { EstimateContext } from "./context";
import type { EstimateContextType, EstimateProviderProps } from "./types";
import { useState } from "react";


export const EstimateContextProvider = ({ data, children }: EstimateProviderProps) => {
  const [estimate, setEstimate] = useState(data);

  return (
    <EstimateContext.Provider
      value={
        {
          estimate,
          setEstimate,
        } as EstimateContextType
      }
    >
      {children}
    </EstimateContext.Provider>
  );
};
