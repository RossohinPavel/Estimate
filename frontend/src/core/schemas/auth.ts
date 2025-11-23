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

export const AccessTokenSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
  tokenType: z.string(),
});

export type AccessTokenSchemaTyype = z.infer<typeof AccessTokenSchema>;

export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;

export const TokensArraySchema = z.tuple([RefreshTokenSchema, AccessTokenSchema]);

export type TokensArraySchemaType = z.infer<typeof TokensArraySchema>;
