import z from "zod";
import { Config } from "../../config";
import { InfoSchema, type InfoSchemaType } from "../../schemas";

export const apiClient = {
  apiUrl: Config.BACKEND_URL,

  /**
   * Функция для сборки uri для апи запросов.
   */
  _getUri: function (urn: string): string {
    return `${this.apiUrl}${urn}`;
  },

  /**
   * Делает GET запрос к апишке
   * @param urn Эндпоинт, к которому нужно обратиться
   */
  _get: async function (urn: string): Promise<unknown> {
    const uri = this._getUri(urn);
    const response = await fetch(uri);
    return response.json();
  },

  /**
   * Возвращает массив записей с информацией приложения.
   * Бэкенд автоматическии сортирует записи по убыванию даты создания.
   */
  getAppUpdates: async function (): Promise<InfoSchemaType[]> {
    const response = await this._get("info/");
    return z.array(InfoSchema).parseAsync(response);
  },

  /**
   * Возвращает последнюю запись информации о приложении.
   */
  getAppLatestUpdate: async function (): Promise<InfoSchemaType> {
    const response = await this._get("info/latest_update");
    return InfoSchema.parseAsync(response);
  },
};
