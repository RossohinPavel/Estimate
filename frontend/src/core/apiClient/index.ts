import type { RequestPropsType, PostRequestPropsType, GetRequestPropsType } from "./types";
import { config } from "../config";
import { EstimateSchema, InfoSchema, TokensArraySchema, UserDataSchema } from "../schemas";
import type {
  CreateEstimateSchemaType,
  CreateInfoSchemaType,
  CreateUserSchemaType,
  EstimateSchemaType,
  InfoSchemaType,
  UpdateEstimateSchemaType,
  UserAuthSchemaType,
  UserDataSchemaType,
} from "../schemas";
import {
  EstimateListResponseSchema,
  type EstimateListResponseSchemaType,
} from "../schemas/responses";
import Cookies from "js-cookie";
import z from "zod";


export const createApiClient = (baseUrl: string) => {
  const defaultHeaders = { "Content-Type": "application/json" };

  // собираем uri для запроса
  const buildUrl = (urn: string) => `${baseUrl}${urn}`;

  const _request = async (url: string, init: RequestInit): Promise<unknown> => {
    const response = await fetch(url, init);
    let json = null;
    if (response.status !== 204) {
      json = await response.json();
    }
    if (!response.ok) {
      throw new Error(json.detail, { cause: response.status });
    }
    return json;
  };

  const isAuthError = (e: unknown): e is Error & { cause: 401 } => {
    return e instanceof Error && e.cause === 401;
  };

  const _authRequest = async (url: string, init: RequestInit): Promise<unknown> => {
    const headers = init.headers as Record<string, string>;
    headers.authorization = `Bearer ${Cookies.get("accessToken")}`;
    try {
      return await _request(url, init);
    } catch (e) {
      if (!isAuthError(e)) {
        throw e;
      }
    }
    Cookies.remove("accessToken");
    const refreshToken = `Bearer ${Cookies.get("refreshToken")}`;
    const refreshHeaders = { ...defaultHeaders, authorization: refreshToken };
    const refreshUrl = buildUrl("api/auth/refresh");
    const tokens = await _request(refreshUrl, { method: "POST", headers: refreshHeaders });
    await setupTokens(tokens);
    headers.authorization = `Bearer ${Cookies.get("accessToken")}`;
    return _request(url, init);
  };

  const setupTokens = async (tokens: unknown): Promise<boolean> => {
    const [refresh, access] = await z.parseAsync(TokensArraySchema, tokens);
    Cookies.set("refreshToken", refresh.refreshToken, { expires: 30 });
    Cookies.set("accessToken", access.accessToken, { expires: 1 });
    return true;
  };

  const request = async <T>(props: RequestPropsType<T>, init: RequestInit): Promise<T> => {
    const url = buildUrl(props.endpoint);
    init.headers = { ...defaultHeaders };
    if (props.body !== undefined) {
      init.body = JSON.stringify(props.body);
    }
    let response;
    if (props.auth === true) {
      response = await _authRequest(url, init);
    } else {
      response = await _request(url, init);
    }
    if (props.schema !== undefined) {
      return z.parseAsync(props.schema, response);
    }
    return response as T;
  };

  const get = async <T>(props: GetRequestPropsType<T>): Promise<T> => {
    return request(props, { method: "GET" });
  };

  const post = async <T>(props: PostRequestPropsType<T>): Promise<T> => {
    return request(props, { method: "POST" });
  };

  const path = async <T>(props: PostRequestPropsType<T>): Promise<T> => {
    return request(props, { method: "PATCH" });
  };

  // Возвращает последнюю запись информации о приложении.
  const getAppLatestUpdate = async (): Promise<InfoSchemaType> => {
    return get({ endpoint: "info/latest", schema: InfoSchema });
  };

  // Возвращает массив записей с информацией приложения.
  const getAppUpdates = async (): Promise<InfoSchemaType[]> => {
    return get({ endpoint: "info/", schema: z.array(InfoSchema) });
  };

  // Создаем новую запись об обновлении приложения.
  const createAppUpdate = async (newUpdate: CreateInfoSchemaType): Promise<InfoSchemaType> => {
    return post({ endpoint: "info/", body: newUpdate, schema: InfoSchema });
  };

  // Авторизация пользователя в сервисе. метод на бэкенде возвращает два токена.
  const signIn = async (user: UserAuthSchemaType): Promise<boolean> => {
    const tokens = await post({ endpoint: "api/auth/sign_in", body: user });
    await setupTokens(tokens);
    return true;
  };

  // Регистрация пользователя в сервисе.
  const signUp = async (user: CreateUserSchemaType): Promise<boolean> => {
    const tokens = await post({ endpoint: "api/auth/sign_up", body: user });
    await setupTokens(tokens);
    return true;
  };

  // Логаут. Пока для нас будет достаточно удалить токены.
  const signOut = async (): Promise<boolean> => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    return true;
  };

  // Получение данных пользователя.
  const getUserData = async (): Promise<UserDataSchemaType> => {
    return get({ endpoint: "api/user", schema: UserDataSchema, auth: true });
  };

  // Получение смет пользователя.
  const getEstimates = async (): Promise<EstimateListResponseSchemaType> => {
    return get({ endpoint: "api/estimate/", schema: EstimateListResponseSchema, auth: true });
  };

  const createEstimate = async (data: CreateEstimateSchemaType): Promise<EstimateSchemaType> => {
    return post({ endpoint: "api/estimate/", body: data, schema: EstimateSchema, auth: true });
  };

  const getEstimate = async (id: string | number): Promise<EstimateSchemaType> => {
    return get({ endpoint: `api/estimate/${id}`, schema: EstimateSchema, auth: true });
  };

  const updateEstimate = async (
    id: string | number,
    data: UpdateEstimateSchemaType
  ): Promise<void> => {
    return path({ endpoint: `api/estimate/${id}`, body: data, auth: true });
  };

  return {
    getAppUpdates,
    getAppLatestUpdate,
    createAppUpdate,
    signIn,
    signUp,
    signOut,
    getUserData,
    getEstimates,
    createEstimate,
    getEstimate,
    updateEstimate,
  };
};

export const apiClient = createApiClient(config.VITE_BACKEND_URL);
