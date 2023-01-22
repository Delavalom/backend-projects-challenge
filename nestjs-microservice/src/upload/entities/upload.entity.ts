import { z } from "zod"

export const uploadSchema = z.array(
    z.object({
        city: z.string(),
        experience: z.string(),
        salary: z.string(),
        specialisation: z.string(),
        freq: z.string()
    })
)


export type UploadSchema = z.infer<typeof uploadSchema>