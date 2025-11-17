import z from "zod";

// Конфиг приложения, который подтягивается с .env
export const configSchema = z.object({
  // Режим работы
  VITE_MODE: z.string().trim().min(1).readonly(),
  // Адрес бэкенда
  VITE_BACKEND_URL: z.string().min(1).readonly(),
});

export const config = configSchema.parse(import.meta.env);
