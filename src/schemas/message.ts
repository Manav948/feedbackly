import { z } from 'zod'

export const messageSchema = z.object({
    content: z.string()
        .min(10, { message: "message must be atleast 10 character" })
        .max(250, { message: "message must be no longer then 250 character" })
})