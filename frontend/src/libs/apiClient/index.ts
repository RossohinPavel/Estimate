import { Config } from "../../config";

export const apiClient = {
  apiUrl: Config.BACKEND_URL,

  /**
   * Функция для сборки uri для апи запросов.
   */
  _getUri: function (urn: string) {
    return `${this.apiUrl}${urn}`;
  },

  /**
   * Возвращает массив записей с информацией приложения.
   * Бэкенд автоматическии сортирует записи по убыванию даты создания.
   */
  getAppUpdates: async function () {
    const uri = this._getUri("info/");
    const response = await fetch(uri);
    return response.json();
  },

  /**
   * Возвращает последнюю запись информации о приложении.
   */
  getAppLatestUpdate: async function () {
    const uri = this._getUri("info/latest_update");
    const response = await fetch(uri);
    return response.json();
  },
};
