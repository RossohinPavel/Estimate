import { EstimateLESchema } from "./estimate";
import z from "zod";


export const EstimateListResponseSchema = z.object({
  next: z.number(),
  total: z.number(),
  estimates: z.array(EstimateLESchema),
});

export type EstimateListResponseSchemaType = z.infer<typeof EstimateListResponseSchema>;
