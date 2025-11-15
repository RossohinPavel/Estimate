import z from "zod";


export const CreateUserSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
  passwordAgain: z.string().nonempty(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export const UserSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

type RawUserSchema = {
  refresh_token: string;
  access_token: string;
};

export const TokenSchema = z.transform((data: RawUserSchema) => ({
  refreshToken: data.refresh_token,
  accessToken: data.access_token,
}));

export type TokenSchemaType = z.infer<typeof TokenSchema>;
