import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, 'username must be atleast 2 character')
    .max(20, 'username must be no more than 20 character')
    .regex(/^[a-zA-Z0-9]+$/, 'user must not contain special latter')

export const signUp = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email addres" }),
    password: z.string().min(6, { message: "password must be 6 character" })
})    