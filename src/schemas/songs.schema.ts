import { z } from "zod"

export const createSongSchema = z.object({
    title: z.string().min(1, "El titulo es requerido").trim(),
    artist: z.string().min(1, "El artista es requerido").trim(),
    lyrics: z.string().min(1, "La letra es requerida").trim(),
    tags: z.array(z.string()).optional(),
    songKey: z.string().optional(),
    bpm: z.coerce.number().positive().optional(),
    duration: z.string().min(1, "Duration requerida"),
    status: z.enum(["draft", "rehearsing", "ready"]),
    genre: z.string().optional(),
})

export type CreateSongInput = z.infer<typeof createSongSchema>

