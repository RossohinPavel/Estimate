import z, { email } from "zod";

export const CreateUserSchema = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty(),
    passwordAgain: z.string().nonempty()
})

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>


export const UserSchema = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty()
});


export type UserSchemaType = z.infer<typeof UserSchema>


const RawTokenSchema = z.object({
    refresh_token: z.string(),
    access_token: z.string()
})

type RawTokenSchemaType = z.infer<typeof RawTokenSchema>

export const TokenSchema = z.transform((data: RawTokenSchemaType) => ({
    refreshToken: data.refresh_token,
    accessToken: data.access_token
}))

export type TokenSchemaType = z.infer<typeof TokenSchema>