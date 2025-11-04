import z from "zod";

// Схема для парсинга json модели Info
export const InfoSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
});

export type InfoSchemaType = z.infer<typeof InfoSchema>;

// Схема для создания записи о приложении
export const CreateInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type CreateInfoSchemaType = z.infer<typeof CreateInfoSchema>;
