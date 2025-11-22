import z from "zod";


export const CreateUserSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
  passwordAgain: z.string().nonempty(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export const UserAuthSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export type UserAuthSchemaType = z.infer<typeof UserAuthSchema>;

type ServerAccessTokenSchema = {
  access_token: string;
  token_type: string;
};

type ServerRefreshTokenSchema = {
  refresh_token: string;
  token_type: string;
};

export const AccessTokenSchema = z.transform((data: ServerAccessTokenSchema) => ({
  accessToken: data.access_token,
  tokenType: data.token_type,
}));

export const RefreshTokenSchema = z.transform((data: ServerRefreshTokenSchema) => ({
  refreshToken: data.refresh_token,
  tokenType: data.token_type,
}));

export type AccessTokenSchemaTyype = z.infer<typeof AccessTokenSchema>;

export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;

export const TokensArraySchema = z.tuple([RefreshTokenSchema, AccessTokenSchema]);

export type TokensArraySchemaType = z.infer<typeof TokensArraySchema>;
