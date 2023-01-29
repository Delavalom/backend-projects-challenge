import {z} from 'zod'

export const messageSchema = z.object({
    name: z.string().min(1),
    textMessage: z.string().min(1)
})

export type MessageSchema = z.infer<typeof messageSchema>