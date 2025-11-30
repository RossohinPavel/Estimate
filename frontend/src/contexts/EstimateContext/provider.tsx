import { EstimateContext } from "./context";
import type { EstimateContextType, EstimateProviderProps } from "./types";


export const EstimateContextProvider = ({ estimate, children }: EstimateProviderProps) => {
  return (
    <EstimateContext.Provider
      value={
        {
          estimate,
        } as EstimateContextType
      }
    >
      {children}
    </EstimateContext.Provider>
  );
};
