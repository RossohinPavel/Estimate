// Конфиг приложения, который подтягивается с .env
export const Config = {
  // Режим работы
  MODE: import.meta.env.VITE_MODE as string,
  // Адрес бэкенда
  BACKEND_URL: import.meta.env.VITE_API_URL as string,
} as const;
