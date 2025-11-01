import z from "zod";

// Схема для парсинга json модели Info
export const InfoSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
});

export type InfoSchemaType = z.infer<typeof InfoSchema>;
