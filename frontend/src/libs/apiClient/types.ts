import z from "zod";


export type ParamsType<T> = {
  endpoint: string;
  queries?: Record<string, string | number | boolean>;
  schema: z.ZodSchema<T>;
};

type requestBody = Record<string, string | number | boolean | null | requestBody[]>;

export type PostParamsType<T> = ParamsType<T> & {
  body: requestBody;
};
