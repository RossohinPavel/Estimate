interface IConfig {
  readonly MODE: string;
  readonly BACKEND_URL: string;
}

export const Config: IConfig = {
  MODE: import.meta.env.VITE_MODE,
  BACKEND_URL: import.meta.env.VITE_API_URL,
};
