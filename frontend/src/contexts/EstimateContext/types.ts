import type { EstimateSchemaType } from "../../core/schemas";
import type { ReactNode } from "react";


export interface EstimateProviderProps {
  data: EstimateSchemaType;
  children: ReactNode;
}

export interface EstimateContextType {
  estimate: EstimateSchemaType;
  setEstimate: (estimate: EstimateSchemaType) => void;
}
