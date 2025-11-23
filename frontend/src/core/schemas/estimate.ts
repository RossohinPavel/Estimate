import z from "zod";


export const CreateEstimateSchema = z.object({
  title: z.string().min(1).max(100).trim(),
});

export type CreateEstimateSchemaType = z.infer<typeof CreateEstimateSchema>;

export const EstimateSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.coerce.date(),
});
