import type z from "zod";


type BodyType = Record<string, string | number | boolean | null | Date | BodyType[]>;

export type RequestPropsType<T> = {
  endpoint: string;
  queries?: Record<string, string>;
  auth?: boolean;
  body?: BodyType;
  schema?: z.ZodSchema<T>;
};

export type GetRequestPropsType<T> = Omit<RequestPropsType<T>, "body">;

export type PostRequestPropsType<T> = RequestPropsType<T> & { body: BodyType };
