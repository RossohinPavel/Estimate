import z from "zod";


export const CreateEstimateSchema = z.object({
  title: z.string().min(1).max(100).trim(),
});

export type CreateEstimateSchemaType = z.infer<typeof CreateEstimateSchema>;

export const EstimateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  project: z.string(),
  basedOn: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EstimateSchemaType = z.infer<typeof EstimateSchema>;

export const EstimateLESchema = z.object({
  id: z.number(),
  title: z.string(),
  updatedAt: z.coerce.date(),
});

export type EstimateLESchemaType = z.infer<typeof EstimateLESchema>;

export const UpdateEstimateSchema = EstimateSchema.partial();

export type UpdateEstimateSchemaType = z.infer<typeof UpdateEstimateSchema>;
