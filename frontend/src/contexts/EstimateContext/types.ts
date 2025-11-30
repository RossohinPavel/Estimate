import type { EstimateSchemaType } from "../../core/schemas";
import type { ReactNode } from "react";


export interface EstimateProviderProps {
  estimate: EstimateSchemaType;
  children: ReactNode;
}

export interface EstimateContextType {
  estimate: EstimateSchemaType;
}
