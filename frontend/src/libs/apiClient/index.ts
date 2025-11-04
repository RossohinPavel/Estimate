import { Config } from "../../config";
import { InfoSchema, type InfoSchemaType } from "../../schemas";
import z from "zod";


type ParamsType<T> = {
  urn: string;
  queries?: Record<string, string | number | boolean>;
  schema: z.ZodSchema<T>;
};

export const createApiClient = (baseUrl: string) => {
  // собираем uri для запроса
  const buildUri = (urn: string) => `${baseUrl}${urn}`;

  // Делает GET запрос
  const get = async <T>(params: ParamsType<T>): Promise<T> => {
    const uri = buildUri(params.urn);
    const response = await fetch(uri);
    const json = await response.json();
    return params.schema.parseAsync(json);
  };

  /**
   * Возвращает массив записей с информацией приложения.
   * Бэкенд автоматическии сортирует записи по убыванию даты создания.
   */
  const getAppUpdates = async (): Promise<InfoSchemaType[]> => {
    return get({ urn: "info/", schema: z.array(InfoSchema) });
  };

  // Возвращает последнюю запись информации о приложении.
  const getAppLatestUpdate = async (): Promise<InfoSchemaType> => {
    return get({ urn: "info/latest_update", schema: InfoSchema });
  };

  return { getAppUpdates, getAppLatestUpdate };
};

export const apiClient = createApiClient(Config.BACKEND_URL);
