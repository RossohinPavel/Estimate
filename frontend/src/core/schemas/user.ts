import z from "zod";


export const UserDataSchema = z.object({
  email: z.email(),
});

export type UserDataSchemaType = z.infer<typeof UserDataSchema>;
