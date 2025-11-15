import type { ParamsType, PostParamsType } from "./types";
import {
  InfoSchema,
  TokenSchema,
  type CreateInfoSchemaType,
  type InfoSchemaType,
  type TokenSchemaType,
  type UserSchemaType,
  type CreateUserSchemaType,
} from "../../schemas";
import { config } from "../config";
import z from "zod";


export const createApiClient = (baseUrl: string) => {
  // собираем uri для запроса
  const buildUrl = (urn: string) => `${baseUrl}${urn}`;

  // Делает GET запрос
  const get = async <T>(params: ParamsType<T>): Promise<T> => {
    const url = buildUrl(params.endpoint);
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.detail);
    }
    return params.schema.parseAsync(json);
  };

  // Делает POST запрос
  const post = async <T>(params: PostParamsType<T>): Promise<T> => {
    const url = buildUrl(params.endpoint);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.body),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.detail);
    }
    return params.schema.parseAsync(json);
  };

  /**
   * Возвращает массив записей с информацией приложения.
   * Бэкенд автоматическии сортирует записи по убыванию даты создания.
   */
  const getAppUpdates = async (): Promise<InfoSchemaType[]> => {
    return get({ endpoint: "info/", schema: z.array(InfoSchema) });
  };

  // Возвращает последнюю запись информации о приложении.
  const getAppLatestUpdate = async (): Promise<InfoSchemaType> => {
    return get({ endpoint: "info/latest", schema: InfoSchema });
  };

  // Создаем новую запись об обновлении приложения.
  const createAppUpdate = async (newUpdate: CreateInfoSchemaType): Promise<InfoSchemaType> => {
    return post({ endpoint: "info/", schema: InfoSchema, body: newUpdate });
  };

  // Получаем токены пользователя.
  const signIn = async (user: UserSchemaType): Promise<TokenSchemaType> => {
    return post({ endpoint: "api/auth/sign_in", schema: TokenSchema, body: user });
  };

  const signUp = async (user: CreateUserSchemaType): Promise<TokenSchemaType> => {
    return post({ endpoint: "api/auth/sign_up", schema: TokenSchema, body: user });
  };

  return { getAppUpdates, getAppLatestUpdate, createAppUpdate, signIn, signUp };
};

export const apiClient = createApiClient(config.VITE_BACKEND_URL);
