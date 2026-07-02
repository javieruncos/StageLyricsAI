import { createSongSchema } from "@/schemas/songs.schema";
import { z } from "zod";
import { api } from "./api";

export const createSongs = async (data: z.infer<typeof createSongSchema>) => {
    try {
        const response = await api.post("/songs", data);
        return response.data
    } catch (error) {
        console.log(error)
    }

}