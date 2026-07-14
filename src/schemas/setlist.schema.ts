import { z } from "zod"


export const SetListSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "El nombre debe tener menos de 100 caracteres"),
    songs: z.array(z.string()).min(1, "Debe haber al menos una canción"),
    description: z.string().optional(),
    status: z.enum(["draft", "ready", "archived"]),
    date: z.date(),
    venue: z.string(),
    durationMin: z.number(),
})

export type SetList = z.infer<typeof SetListSchema>